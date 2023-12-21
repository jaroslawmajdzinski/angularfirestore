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

constructor(public _storageService: FileuploadService){}

 ngOnInit(): void {
   this.sub = this.getListHandler().subscribe()
 }

 getListHandler(){
  return this._storageService.listAllFiles().pipe(
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
  this._storageService.deleteFile(this.filesList[idx].name).pipe(
    concatMap(()=>this.getListHandler()),
    catchError(err=>{
      console.error(err.message)
      return EMPTY
    })
  ).subscribe()
}

deleteHandler(){
 forkJoin(this.filesList.filter(item=>item.selected && !item.isDirectory).map(item=>this._storageService.deleteFile(item.name)))
  .pipe(
    concatMap(()=>this.getListHandler()),
    catchError(err=>{
      console.error(err.message)
      return EMPTY
    })
  )
 .subscribe()
}

}
