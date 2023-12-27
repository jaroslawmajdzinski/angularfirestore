import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import {
  AngularFireStorage,
  AngularFireStorageReference,
} from '@angular/fire/compat/storage';
import { tap, concat, from, map, last, catchError, EMPTY, Observable, Subject, concatMap } from 'rxjs';
import { User } from './models/user.model';
import { uploadString, ref, listAll, deleteObject, getMetadata, getDownloadURL } from 'firebase/storage';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class FileuploadService {
  private _rootPath = '/uploads';
  private _user: User | null = null;

  constructor(
    private _auth: AuthService,
    private _storage: AngularFireStorage,
    private _httpClient: HttpClient
    ) {
    this._auth
      .getUserData$()
      .pipe(
        tap((user) => {
          this._user = user;
        })
      )
      .subscribe();
  }

  uploadFileToStorage(file: File, path: string) {
    if (this._user) {
      console.log('path upload', path)
      // @ts-ignore
      const filePath = `${this._rootPath}/${this._user['multiFactor']['user'].uid}${path===""? "" : "/" + path}/${file.name}`;
      const storageRef = this._storage.ref(filePath);
      const uploadTask = this._storage.upload(filePath, file);
     
      return concat(uploadTask.percentageChanges(), storageRef.getDownloadURL())
    }

    return null;
  }

  createDirectory(fullPath: string) {
    // @ts-ignore
    const storageRef = ref(this._storage.storage, `${this._rootPath}/${this._user['multiFactor']['user'].uid}${fullPath===""? "" : "/" + fullPath}/.dir`);
    return from(uploadString(storageRef, ''));
  }

  listAllFiles(directory = '') {
    // @ts-ignore
    const path = `${this._rootPath}/${this._user['multiFactor']['user'].uid}/${directory}`;
    const listRef = ref(this._storage.storage, path);
    return from(listAll(listRef)).pipe(
      map((res) => {
        //console.log('prefixes', res.prefixes, 'items', res.items)
        const folders = res.prefixes.map((item) => ({
          name: item.name,
          fullPath: item.name,
          isDirectory: true,
        }));
        //prepare path if has parent
        let lastDir = [];
        if (directory) {
          let tmp = directory.split('/');
          tmp.pop();
          lastDir.push({
            name: tmp.join('/').substring(0),
            fullPath: '..',
            isDirectory: true,
          });
        }

        const files = res.items
          .filter((item) => item.name !== '.dir')
          .map((itemRef) => ({
            name: itemRef.name,
            fullPath: itemRef.fullPath,
            isDirectory: false,
          }));
        return [...lastDir, ...folders, ...files];
      })
    );
  }

  deleteFile(fullPath: string) {
    const fileRef = ref(this._storage.storage,fullPath);
    return from(deleteObject(fileRef));
  }

  getFileMetadata(fullPath: string){
    //fullPath contains filename
    const fileRef = ref(this._storage.storage, fullPath)
    return from(getMetadata(fileRef))
  }

  downloadFile(fullPathWithName: string){
    console.log(fullPathWithName)
    // @ts-ignore
   const filesURLS$ = new Observable<string>((subscriber)=>{
      const fileRef = ref(this._storage.storage, fullPathWithName)
      getDownloadURL(fileRef).then(url=>{
        subscriber.next(url)
        subscriber.complete()
      })
    })
    
    return  filesURLS$
  }

  

}

