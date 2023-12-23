import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EMPTY, Subscription, catchError, concatMap, exhaustMap, filter, forkJoin, map, tap } from 'rxjs';
import { FileuploadService } from 'src/app/firebase/fileupload.service';
import { MessageDialogComponent } from '../../message-dialog/message-dialog.component';
import { FormDialogComponent } from '../../form-dialog/form-dialog.component';

@Component({
  selector: 'app-filesmanagement',
  templateUrl: './filesmanagement.component.html',
  styleUrls: ['./filesmanagement.component.scss']
})
export class FilesmanagementComponent implements OnInit{

filesList: {name: string, fullPath: string, isDirectory: boolean, selected: boolean}[] = []  
sub!: Subscription
path: string[] = []
currPath = "/"

constructor(public _storageService: FileuploadService, private _dialog: MatDialog){}

 ngOnInit(): void {
   this.sub = this.getListHandler().subscribe()
 }

 getListHandler(directory = ""){
  return this._storageService.listAllFiles(directory).pipe(
    tap(items=>this.filesList = [...items.map(item=>({...item, selected: false}))])
   )
 }

 selectAllHandler($event: Event){
  this.filesList.forEach(item=>item.selected =($event.target as HTMLInputElement).checked)
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
      tap(e=>console.log(e)),
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
 forkJoin(this.filesList.filter(item=>item.selected && !item.isDirectory).map(item=>this._storageService.deleteFile(item.fullPath)))
  .pipe(
    concatMap(()=>this.getListHandler(this.path.join('/'))),
    catchError(err=>{
      console.error(err.message)
      return EMPTY
    })
  )
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
  
  console.log(idx, this.path.slice(0,idx + 1))
  this.path = this.path.slice(0, idx + 1)
  this.getListHandler(this.path.join('/')).subscribe()
}

createDirctory(){
 
  this._dialog.open(FormDialogComponent).afterClosed().pipe(
    filter(result=>result),
    tap((r)=>console.log(r)),
    concatMap(result=>this._storageService.createDirectory(this.path.join('/') + `/${result}`)),
    concatMap(_=>this.getListHandler(this.path.join('/'))),
    catchError(err=>{
      console.log(err.message)
      return EMPTY
    })  
  ).subscribe()
}

}
