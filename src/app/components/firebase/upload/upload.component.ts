import { Component, ElementRef, Input, ViewChild } from '@angular/core';

import {
  EMPTY,
  catchError,
  concatMap,
  forkJoin,
  scan,
  take,
  tap,
} from 'rxjs';
import { FileuploadService } from 'src/app/firebase/fileupload.service';
import {  TUploadFilesList } from '../management/filesmanagement.types';
import { ManagementService } from '../management/management.service';
import { animate, query, stagger, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
  animations: [
    trigger('newElement', [
      
     transition("*<=>*", [
     query(":enter",
       [
        style({opacity: "0", transform: "scale(0.1)"}),
        stagger('60ms', animate('200ms', style({opacity: 1, transform: "scale(1)"})))
      ], {optional: true}
     ),
     query(":leave",
       [
        animate('200ms', style({opacity: 0, transform: "scale(0.1)"}))
      ], {optional: true}
     )
    ])
    ]),
  ],
})

export class UploadComponent {
  
  fileList: TUploadFilesList[] = [];
  filesInProgress: TUploadFilesList[] = [];

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('selectAll') selectAll!: ElementRef<HTMLInputElement>;

  selected = 0

  constructor(
    private _uploadService: FileuploadService,
    private _mangement: ManagementService
  ) {}

  handleFileUpload() {
    const files = this.fileInput.nativeElement.files || [];

    this.fileList = [
      ...Array.from(files).map((item) => ({
        file: item,
        progress: 0,
        inprogress: false,
        selected: false,
      })),
      ...this.fileList,
    ];
  }

  //select files on the list
  removeFilesHandler() {
    this.fileList = [...this.fileList.filter((item) =>!item.selected)];
    this.selectAll.nativeElement.checked = false;
    this.selected = 0  
  }

  selectHandler(event: Event, idx: number) {
    const selected = (event.target as HTMLInputElement).checked;
    this.removeAdd(this.fileList[idx].selected, selected)
    this.fileList[idx].selected = selected
    
  }

  selectAllHandler(event: Event) {
    const selected = (event.target as HTMLInputElement).checked;
    this.fileList.filter(item=>!item.inprogress).forEach((item) => {
      this.removeAdd(item.selected, selected)  
      item.selected = selected
  });
   
  }

  //move selected files and in queue to upload
  moveToUpload(){
    this.selectAll.nativeElement.checked = false;
    
    this.filesInProgress = [...this.fileList.filter((item) =>item.inprogress || item.selected)];
    this.fileList = [
      ...this.fileList.filter((item) => !(item.inprogress || item.selected)),
    ];
    this.selected = 0
  }

  //move to queue if work is in progress
  moveInQueue(){
    if (this.filesInProgress.length) {
      this.fileList
        .filter((item) => item.selected)
        .forEach((item) => {
          item.inprogress = true;
        });
        this.selected = 0
        return true;
    }
    return false
  }

  listAllFiles() {
    this._uploadService.listAllFiles().subscribe();
  }

  

  uploadSelectedFiles() {
    
    if(this.moveInQueue()) return  

    this.moveToUpload()

    const inprogressList = this.filesInProgress
            .map((item, idx) => ({ ...item, idx: idx }))
            .filter((item) => item.selected && !(item.progress === 100))
            .map(item=>this.filesInProgress[item.idx].inprogress = true)
    
    forkJoin(
      this.filesInProgress
        .map((item, idx) => ({ ...item, idx: idx }))
        .filter((item) => item.selected && !(item.progress === 100))
        .map((item) => {
          this.filesInProgress[item.idx].inprogress = true;
          return this._mangement.getPath().pipe(
            take(1),
            concatMap(
              (path) =>
                this._uploadService
                  .uploadFileToStorage(
                    this.filesInProgress[item.idx].file,
                    path
                  )
                  ?.pipe(
                    scan((progress, curr: number | {uploadPath: string, url: string} | undefined) => {
                      if (typeof curr === 'number') {
                        this.filesInProgress[item.idx].progress = curr;
                      } 
                      return curr;
                    }),
                    tap(url=>{
                      if(typeof url !=='number')
                      this._mangement.newFile({
                        name: this.filesInProgress[item.idx].file.name,
                        progress: 0,
                        selected: false,
                        isDirectory: false,
                        loaded: false,
                        fullPath: url?.url || "",
                        uploadPath: url?.uploadPath || ""
                      });
                    }),
                    catchError(err=>{
                      console.error(err.message)
                      return EMPTY
                    })
                    ) || EMPTY
            )
          );
        })
    )
      .pipe(
        tap((_) => {
         
          this.filesInProgress = [
            ...this.filesInProgress.filter((item) => item.progress !== 100),
          ];
          this.uploadSelectedFiles();
        })
      )
      .subscribe();
  }

  
  removeAdd(item: boolean, checkbox: boolean){
    if(item===checkbox) return 
    if(item<checkbox) {
      this.selected++
      return 
    }
    this.selected--
  } 

  trackByFn(index: number, item: TUploadFilesList){
    return item.file.name
  }

}
