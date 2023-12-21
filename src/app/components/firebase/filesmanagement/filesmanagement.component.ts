import { Component, OnInit } from '@angular/core';
import { EMPTY, Subscription, catchError, concatMap, exhaustMap, forkJoin, map, tap } from 'rxjs';
import { FileuploadService } from 'src/app/firebase/fileupload.service';

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

constructor(public _storageService: FileuploadService){}

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
  this._storageService.deleteFile(this.filesList[idx].fullPath).pipe(
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

}
