import { Component, ElementRef, ViewChild } from '@angular/core';

import {
  EMPTY,
  catchError,
  concatMap,
  finalize,
  forkJoin,
  last,
  map,
  scan,
  take,
  tap,
} from 'rxjs';
import { FileuploadService } from 'src/app/firebase/fileupload.service';
import { TUploadFilesList } from '../management/filesmanagement.types';
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
  state: string = "showUp";
  fileList: TUploadFilesList[] = [];
  filesInProgress: TUploadFilesList[] = [];

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('selectAll') selectAll!: ElementRef<HTMLInputElement>;

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

  listAllFiles() {
    this._uploadService.listAllFiles().subscribe();
  }

  

  uploadSelectedFiles() {
    if (this.filesInProgress.length) {
      this.fileList
        .filter((item) => item.selected)
        .forEach((item) => {
          item.inprogress = true;
        });
      return;
    }

    this.selectAll.nativeElement.checked = false;
    
    this.filesInProgress = [
      ...this.fileList.filter((item) => item.inprogress || item.selected),
    ];
    this.fileList = [
      ...this.fileList.filter((item) => !(item.inprogress || item.selected)),
    ];

    forkJoin<any>(
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
                    scan((progress, curr: number | string) => {
                      if (typeof curr === 'number') {
                        this.filesInProgress[item.idx].progress = curr;
                      } else {
                        this._mangement.newFile({
                          name: this.filesInProgress[item.idx].file.name,
                          progress: 0,
                          selected: false,
                          isDirectory: false,
                          loaded: false,
                          fullPath: curr,
                        });
                      }
                      return curr;
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

  removeFilesHandler() {
    this.fileList = [...this.fileList.filter((item) => !item.selected)];
    this.selectAll.nativeElement.checked = false;
  }

  selectHandler(event: Event, idx: number) {
    this.fileList[idx].selected = (event.target as HTMLInputElement).checked;
    this.fileList = [...this.fileList];
  }

  selectAllHandler(event: Event) {
    this.fileList.forEach((item) => {
      item.selected =
        (event.target as HTMLInputElement).checked && !(item.progress === 100);
    });
    this.fileList = [...this.fileList];
  }
}
