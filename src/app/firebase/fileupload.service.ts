import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Storage, ref, uploadBytes, uploadBytesResumable } from '@angular/fire/storage';
import { exhaustMap, take, tap } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class FileuploadService {

  private _rootPath = "uploads"

  constructor(private _auth: AuthService, private _storage: Storage) { }

  uploadFile(file: File){
   return this._auth.getUserData$().pipe(
    tap((user: User)=>{
     if(user){ 
      const storageRef = ref(this._storage, `${this._rootPath}/${user.uid}/${file.name}`)
       uploadBytesResumable(storageRef, file)
        
      }
  })) 
    
  
  }

}
