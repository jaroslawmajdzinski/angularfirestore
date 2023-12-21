import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { tap } from 'rxjs';
import { FileuploadService } from 'src/app/firebase/fileupload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
  //encapsulation: ViewEncapsulation.None
})
export class UploadComponent {

  fileList: {file: File, progress: number, inprogress: boolean, selected: boolean}[] = []

  @ViewChild('fileInput')fileInput!: ElementRef<HTMLInputElement>
  @ViewChild('selectAll')selectAll!: ElementRef<HTMLInputElement>

  constructor(private _uploadService: FileuploadService){}
 
  handleFileUpload(){
    console.log(this.fileInput.nativeElement.files)
    const files = this.fileInput.nativeElement.files || []
  
    this.fileList = [...Array.from(files).map(item=>({file: item, progress: 0, inprogress: false, selected: false})), ...this.fileList]
    /*
    if(files.length){
      const sub = this._uploadService.uploadFileToStorage(files[0])
      if(sub){
        sub.pipe(tap(progres=>{
          console.log('progres', progres)
        })).subscribe()
      }
    }
    */
  }

  listAllFiles(){
    this._uploadService.listAllFiles().subscribe()
  }

  uploadFile(idx: number){
    if(this.fileList[idx].inprogress===true )return
    this.fileList[idx].inprogress =  true
    this._uploadService.uploadFileToStorage(this.fileList[idx].file)?.pipe(
      tap((progress)=>{this.fileList[idx].progress = progress || 0 })
    ).subscribe()
  }

  cancelUpload(){
    this.fileList = [...this.fileList.filter(item=>!item.selected)]
    this.selectAll.nativeElement.checked = false
  }

  selectHandler(event: Event, idx: number){
    this.fileList[idx].selected = (event.target as HTMLInputElement).checked
    this.fileList = [...this.fileList]
  }

  selectAllHandler(event: Event){
    this.fileList.forEach(item=>{
      item.selected = (event.target as HTMLInputElement).checked 
    })
    this.fileList = [...this.fileList]
  }
}
