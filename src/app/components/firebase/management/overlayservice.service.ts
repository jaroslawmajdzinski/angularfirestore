import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OverlayserviceService {

  private _data = new BehaviorSubject<string | null>(null)

  constructor() { }

  getImage(){
    return this._data
  }

  sendImage(img: string){
    this._data.next(img)
  }

}
