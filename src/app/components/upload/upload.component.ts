import { Component, ElementRef, ViewChild } from '@angular/core';
import { tap } from 'rxjs';
import { FileuploadService } from 'src/app/firebase/fileupload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {

  @ViewChild('fileInput')fileInput!: ElementRef<HTMLInputElement>
 
  constructor(private _uploadService: FileuploadService){}
 
  handleFileUpload(){
    console.log(this.fileInput.nativeElement.files)
    const files = this.fileInput.nativeElement.files || []
    if(files.length){
      const sub = this._uploadService.uploadFileToStorage(files[0])
      if(sub){
        sub.pipe(tap(progres=>{
          console.log('progres', progres)
        })).subscribe()
      }
    }

  }
}
