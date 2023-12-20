import {  Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { tap, concat, from } from 'rxjs';
import { User } from './user.model';
import { getStorage, ref, listAll } from "firebase/storage";


@Injectable({
  providedIn: 'root'
})
export class FileuploadService {

  private _rootPath = "/uploads"
  private _user: User | null = null

  constructor(private _auth: AuthService, private _storage: AngularFireStorage ) { 

    this._auth.getUserData$().pipe(
      tap((user)=>{
          this._user = user
      })
    ).subscribe()

  }
  
  uploadFileToStorage(file: File){
  
    if(this._user){
     
       // @ts-ignore 
      const filePath = `${this._rootPath}/${this._user['multiFactor']['user'].uid}/${file.name}`
      const storageRef = this._storage.ref(filePath)  
      const uploadTask = this._storage.upload(filePath, file);  
     
      concat (uploadTask.snapshotChanges(), storageRef.getDownloadURL()).pipe(
            tap(url=>console.log(url))
           ).subscribe()

     return uploadTask.percentageChanges()   

    }  
    
    return null

    }

    listAllFiles(){
      const storage = getStorage();
      // @ts-ignore 
      const listRef = ref(storage, `${this._rootPath}/${this._user['multiFactor']['user'].uid}`)
      return from(listAll(listRef)).pipe(
        tap(res=>{
          console.log(res)
        })
      )
    }    

  }
