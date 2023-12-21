import {  Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/compat/storage';
import { tap, concat, from, map } from 'rxjs';
import { User } from './user.model';
import { getStorage, ref, listAll, deleteObject } from "firebase/storage";


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
      // @ts-ignore 
      const listRef = ref(this._storage.storage, `${this._rootPath}/${this._user['multiFactor']['user'].uid}`)
      return from(listAll(listRef)).pipe(
        map(res=>{
           return res.items.map((itemRef)=>({fileName: itemRef.name}))
        })
      )
      
    }    

    deleteFile(fileName: string){
      // @ts-ignore 
      const fileRef = ref(this._storage.storage, `${this._rootPath}/${this._user['multiFactor']['user'].uid}/${fileName}` )
      return from(deleteObject(fileRef))
    }

  }
