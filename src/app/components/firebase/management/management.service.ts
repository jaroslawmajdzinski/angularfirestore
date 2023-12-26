import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManagementService {

  private _path: string[] = []

  path$ = new BehaviorSubject<string[]>(this._path)

  constructor() { }


  getPath(){
    return this.path$
  }

  goDirDown(dirName: string){
    this._path.push(dirName)
    this.path$.next(this._path)
  }

  goToDirByIndex(idx: number){
    //root is -1
    this._path = this._path.slice(0, idx + 1)
    this.path$.next(this._path)
  }

  goUpDir(){
    this._path.pop()
    this.path$.next(this._path)
  }



  emitCurrPath(){
    this.path$.next(this._path)
  }

}
