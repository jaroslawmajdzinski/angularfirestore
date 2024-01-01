import { Component, ElementRef, Input, ViewChild } from '@angular/core';

import {
  EMPTY,
  Subject,
  catchError,
  concatMap,
  forkJoin,
  mergeMap,
  scan,
  take,
  tap,
} from 'rxjs';
import { FileuploadService } from 'src/app/firebase/fileupload.service';
import {  TFileList, TUploadFilesList } from '../management/filesmanagement.types';
import { ManagementService } from '../management/management.service';
import { animate, query, stagger,  style, transition, trigger } from '@angular/animations';

const animations = [
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
  trigger('tools', [
    transition(':enter' , [
     style({opacity: "0", transform: "translateX(400px)"}),
     animate('400ms', style({opacity: "1", transform: "translateX(0px)"}))
   ]),
   transition(':leave' , [
     style({opacity: "1"}),
     animate('400ms', style({opacity: "0", transform: "translateX(400px)"}))
   ])
 ] ),
 trigger('tableHeader', [
  transition(':enter' , [
   style({opacity: "0", width: "0px"}),
   animate('400ms', style({opacity: "1", width: "45px"}))
 ]),
 transition(':leave' , [
   style({opacity: "1"}),
   animate('400ms', style({opacity: "0",  width: "45px"}))
 ])
] )
]

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
  animations: animations
})

export class UploadComponent {
  
  fileList: TUploadFilesList[] = [];
  filesInProgress: TUploadFilesList[] = [];

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('selectAll') selectAll!: ElementRef<HTMLInputElement>;

  selected = 0

  private _currPath!: string

  private _newFileToUpload = new Subject<TUploadFilesList>()

  constructor(
    private _uploadService: FileuploadService,
    private _mangement: ManagementService
  ) {}

    

    ngOnInit(){
      
      this._mangement.getPath().pipe(tap(path=>this._currPath=path)).subscribe()
      
      this._newFileToUpload.pipe(
        tap(item=>{
          const idx = this.fileList.findIndex(item=>item.file.name===item.file.name)
          this.fileList.splice(idx, 1)
          this.filesInProgress.push(item)
        }),
        mergeMap(item=>this.uploadFile(item))
      ).subscribe()    
    }

    top(index: number){
      return `${index * (32 + 2)}px`
    }
  
    heightList(){
      return `${this.fileList.length * 34}px`
    }  

    listInProgressLength(){
      return this.filesInProgress.filter(item=>item.progress!==100).length
    }

    heightListInProgress(){
      return `${this.listInProgressLength() * 34}px`
    } 

  handleFileUpload() {
    const files = this.fileInput.nativeElement.files || [];
    
    let newFiles = [...Array.from(files).map((item) => ({
      file: item,
      progress: 0,
      inprogress: false,
      selected: false,
      pathToUpload: ""
    }))] as TUploadFilesList[]

   newFiles = newFiles.reduce((acc, item)=>{
    const idx = this.fileList.findIndex(it=>it.file.name===item.file.name)
    if(idx===-1){
      acc.push(item)
    }
    return acc
   }, [] as TUploadFilesList[])

    this.fileList = [
      ...newFiles
      ,
      ...this.fileList,
    ];

    this.fileInput.nativeElement.value = ""
  }

  //select files on the list
  removeFilesHandler() {
    this.fileList = [...this.fileList.filter((item) =>!item.selected)];
    this.selectAll.nativeElement.checked = false;
    this.selected = 0  
  }

  selectHandler(event: Event, idx: number) {
    const selected = (event.target as HTMLInputElement).checked;
    this.selectOne(this.fileList[idx], selected)
}

  selectOne(item: TUploadFilesList, selected: boolean){
    this.removeAdd(item.selected, selected)  
    item.selected = selected
    if(selected){
      item.pathToUpload = this._currPath
    } else {
      item.inprogress = false
    }
  }

  selectAllHandler(event: Event) {
    const selected = (event.target as HTMLInputElement).checked;
    this.fileList.filter(item=>!item.inprogress).forEach((item) => {
      this.selectOne(item, selected)
    });
   
  }

   

  listAllFiles() {
    this._uploadService.listAllFiles().subscribe();
  }

  
  uploadFile(item: TUploadFilesList){
    return   this._uploadService
    .uploadFileToStorage(
      item.file,
      item.pathToUpload
    )
    .pipe(
      scan((progress, curr: number | string) => {
        if (typeof curr === 'number') {
          item.progress = curr;
        } 
        return curr;
      }),
      tap(url=>{
        if(typeof url !=='number'){
        this._mangement.newFile({
          name: item.file.name,
          progress: 0,
          selected: false,
          isDirectory: false,
          loaded: false,
          fullPath: url,
          uploadPath: item.pathToUpload
        });
        const idx = this.filesInProgress.findIndex(item=>item.file.name===item.file.name)
        this.filesInProgress.splice(idx, 1)
      }
       }),
      catchError(err=>{
        console.error(err.message)
        return EMPTY
      })
      )
  }

  startUpload(){
   this.fileList.filter(item=>item.selected).forEach(item=>
    this._newFileToUpload.next(item)
   )
   this.selectAll.nativeElement.checked =  false
   this.selected = 0
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
