import { Component, ElementRef, ViewChild } from '@angular/core';
import { FileuploadService } from 'src/app/firebase/fileupload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {

  @ViewChild('fileInput')fileInput!: ElementRef<HTMLInputElement>

  constructor(private _uploadService: FileuploadService){}

  handleFileUpload(event: Event){
    console.log(this.fileInput.nativeElement.files)
    const files = this.fileInput.nativeElement.files || []
    if(files.length){
      this._uploadService.uploadFile(files[0]).subscribe()
    }

  }
}
