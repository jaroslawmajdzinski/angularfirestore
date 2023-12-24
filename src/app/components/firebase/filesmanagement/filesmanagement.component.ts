import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EMPTY, Observable, Subscription, catchError, concat, concatMap, delay, exhaustMap, filter, forkJoin, last, map, scan, tap } from 'rxjs';
import { FileuploadService } from 'src/app/firebase/fileupload.service';
import { MessageDialogComponent } from '../../message-dialog/message-dialog.component';
import { FormDialogComponent } from '../../form-dialog/form-dialog.component';
import { MatDrawer } from '@angular/material/sidenav';
import { IFileMetadata } from 'src/app/firebase/models/metadata.mode';
import { HttpClient, HttpEvent, HttpEventType, HttpRequest, HttpResponse } from '@angular/common/http';

interface IDownload {
  content: Blob | null;
  progress: number;
  state: HttpEventType
}

@Component({
  selector: 'app-filesmanagement',
  templateUrl: './filesmanagement.component.html',
  styleUrls: ['./filesmanagement.component.scss'],
  //encapsulation: ViewEncapsulation.None
})
export class FilesmanagementComponent implements OnInit{

@ViewChild('fileDownload')anchor!: ElementRef<HTMLAnchorElement> 
@ViewChild('drawer')drawer!: MatDrawer

filesList: {name: string, fullPath: string, isDirectory: boolean, selected: boolean, progress: number}[] = []  
sub!: Subscription
path: string[] = []
currPath = "/"

fileMetadata!: IFileMetadata

constructor(public _storageService: FileuploadService, private _dialog: MatDialog, private _httpClient: HttpClient){}

 ngOnInit(): void {
   this.sub = this.getListHandler().subscribe()
 }

 getListHandler(directory = ""){
  return this._storageService.listAllFiles(directory).pipe(
    tap(items=>this.filesList = [...items.map(item=>({...item, selected: false, progress: 0}))])
   )
 }

 selectAllHandler($event: Event){
  this.filesList.forEach((item, i)=>{
    if(!this.filesList[i].isDirectory){
    this.filesList[i].selected = ($event.target as HTMLInputElement).checked
    this.filesList[i].progress = 0
  }
  })
  this.filesList = [...this.filesList]
}

 selectOneHandler($event: Event, idx: number){
  this.filesList[idx].selected = ($event.target as HTMLInputElement).checked
  this.filesList = [...this.filesList]  
}

deleteOneHandler(idx: number){
  this._dialog.open(MessageDialogComponent,
     {data: {title: "Question", message: `Do you want to delet ${this.filesList[idx].name} file?`, actionAreaConfig: [
      {label: "Yes", color: "primary"},
      {label: "No", color: "warn", dismiss: true}
     ]}}
     ).afterClosed().pipe(
      filter(res=>(res!=='dismiss' && res!==undefined )),
      concatMap(_=>this._storageService.deleteFile(this.filesList[idx].fullPath)),
      concatMap(()=>this.getListHandler(this.path.join('/'))),
      catchError(err=>{
        console.error(err.message)
        return EMPTY
      })
      ).subscribe()
}

deleteHandler(){
  this._dialog.open(MessageDialogComponent,
    {data: {title: "Question", message: `Do you want to delet selected files?`, actionAreaConfig: [
     {label: "Yes", color: "primary"},
     {label: "No", color: "warn", dismiss: true}
    ]}}
    ).afterClosed().pipe(
      filter(res=>(res!=='dismiss' && res!==undefined )),
      concatMap(_=>forkJoin(this.filesList.filter(item=>item.selected && !item.isDirectory).map(item=>this._storageService.deleteFile(item.fullPath)))
      .pipe(
        concatMap(()=>this.getListHandler(this.path.join('/'))),
        catchError(err=>{
          console.error(err.message)
          return EMPTY
        }))
      ))
 .subscribe()
}



openDirectory(idx: number){
    if(this.filesList[idx].fullPath===".."){
      this.path.pop()
    }else{
      this.path.push(this.filesList[idx].name)
    }
    
    this.getListHandler(this.path.join('/')).subscribe()
}

goToDirectory(idx: number){
 this.path = this.path.slice(0, idx + 1)
  this.getListHandler(this.path.join('/')).subscribe()
}

createDirctory(){
 
  this._dialog.open(FormDialogComponent).afterClosed().pipe(
    filter(result=>result),
    concatMap(result=>this._storageService.createDirectory(this.path.join('/') + `/${result}`)),
    concatMap(_=>this.getListHandler(this.path.join('/'))),
    catchError(err=>{
      console.log(err.message)
      return EMPTY
    })  
  ).subscribe()
}

showFileMetadata(idx: number){
  this._storageService.getFileMetadata(this.filesList[idx].fullPath).pipe(
    tap((res)=>{
      this.drawer.open()
      this.fileMetadata = {...res}
     })
  ).subscribe()
}

downloadFiles(){
  forkJoin(this.filesList.filter(item=>item.selected).map(item=>this._storageService.downloadFile(item.fullPath).pipe(
    concatMap(url=>{
      return this._httpClient.get(url, {responseType: 'blob', reportProgress: true, observe: 'events'}).pipe(
          catchError(err=>{
          console.error(err.message)
          return EMPTY
    })
      )
     }),
    tap(event=>{
      if(event.type===HttpEventType.DownloadProgress && event.total && event.loaded){
        item.progress = Math.ceil((event.loaded * 100) / (event.total))
       }
    if(event.type===HttpEventType.Response){
        this.saveHandler(event.body as Blob, item.name)
      }
    })
    ))
  ).pipe(
    delay(300),
    tap(_=>{
    this.filesList = [...this.filesList.map(item=>({...item, selected: false, progress: 0}))]
  })).subscribe()
}


saveHandler(blob: Blob, name: string){
  const a = document.createElement('a')
      const objectUrl = URL.createObjectURL(blob)
      a.href = objectUrl
      a.download = name
      document.body.append(a)
      a.click()
      URL.revokeObjectURL(objectUrl)
      document.body.removeChild(a)
}

}
