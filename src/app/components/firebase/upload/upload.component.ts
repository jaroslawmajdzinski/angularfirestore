import {
  Component,
  ElementRef,
  ViewChild,
  
} from '@angular/core';

import {  forkJoin, tap } from 'rxjs';
import { FileuploadService } from 'src/app/firebase/fileupload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent {
  fileList: {
    file: File;
    progress: number;
    inprogress: boolean;
    selected: boolean;
  }[] = [];

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('selectAll') selectAll!: ElementRef<HTMLInputElement>;

  constructor(private _uploadService: FileuploadService) {}

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

  uploadFile(idx: number) {
    if (this.fileList[idx].inprogress === true) return;
    this.fileList[idx].inprogress = true;
    this._uploadService
      .uploadFileToStorage(this.fileList[idx].file)
      ?.pipe(
        tap((progress) => {
          this.fileList[idx].progress = progress || 0;
        })
      )
      .subscribe();
  }

  uploadSelectedFiles() {
    forkJoin<any>(
      this.fileList
        .map((item, idx) => ({ ...item, idx: idx }))
        .filter((item) => item.selected && !(item.progress === 100))
        .map((item) =>{
          this.fileList[item.idx].inprogress = true 
          return this._uploadService
            .uploadFileToStorage(this.fileList[item.idx].file)
            ?.pipe(
              tap((progress) => {
                this.fileList[item.idx].progress = progress || 0;
              })
            )
          }
        )
    ).subscribe();
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
      item.selected = (event.target as HTMLInputElement).checked && !(item.progress===100);
    });
    this.fileList = [...this.fileList];
  }
}
