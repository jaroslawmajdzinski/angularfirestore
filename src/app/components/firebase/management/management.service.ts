import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, map } from 'rxjs';
import { TFileList } from './filesmanagement.types';
import { FileuploadService } from 'src/app/firebase/fileupload.service';

@Injectable({
  providedIn: 'root'
})
export class ManagementService {

  private _path: string[] = []
  private _newFile$ = new Subject<TFileList>()
  private _path$ = new BehaviorSubject<string[]>(this._path)

  constructor(private _uploadService: FileuploadService) { }


  getNewFile(){
    return this._newFile$
   }

  newFile(newFile: TFileList){
    this._newFile$.next(newFile)
  }

  getPath(){
    return this._path$.pipe(map(path=>{
        return   path.join('/')
      }))
  }

  getPathArray(){
    return this._path$.asObservable()
  }

  goDirDown(dirName: string){
    this._path.push(dirName)
    this._path$.next(this._path)
   }

  goToDirByIndex(idx: number){
    //root is -1
    this._path = this._path.slice(0, idx + 1)
    this._path$.next(this._path)
   }


  goUpDir(){
    this._path.pop()
    this._path$.next(this._path)
  }



  emitCurrPath(){
    this._path$.next(this._path)
  }



}
