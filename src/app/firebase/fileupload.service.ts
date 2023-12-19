import {  Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { EMPTY, Observable, exhaustMap, finalize, tap } from 'rxjs';
import { User } from './user.model';

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
      console.log('user', this._user)
       // @ts-ignore 
      const filePath = `${this._rootPath}/${this._user['multiFactor']['user'].uid}/${file.name}`
      const storageRef = this._storage.ref(filePath)  
      const uploadTask = this._storage.upload(filePath, file);  

      uploadTask.snapshotChanges().pipe(
        finalize(()=>{
          storageRef.getDownloadURL().subscribe(downloadUrl =>{
            console.log('Finalize', downloadUrl)
          })
        })
      ).subscribe()

     return uploadTask.percentageChanges()   

    }  
    
    return null

    }

  }
