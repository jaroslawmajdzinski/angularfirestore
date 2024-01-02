import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import {
  AngularFireStorage,
 
} from '@angular/fire/compat/storage';
import { tap, concat, from, map,  Observable,  take,  filter, exhaustMap, EMPTY, of } from 'rxjs';
import { User } from './models/user.model';
import { uploadString, ref, listAll, deleteObject, getMetadata, getDownloadURL } from 'firebase/storage';



@Injectable({
  providedIn: 'root',
})
export class FileuploadService {
  private _rootPath = '/uploads';
  private _user: User | null = null;

  constructor(
    private _auth: AuthService,
    private _storage: AngularFireStorage
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
      const filePath = `${this._rootPath}/${this._user.uid}${path===""? "" : "/" + path}/${file.name}`;
      const storageRef = this._storage.ref(filePath);
      const uploadTask = this._storage.upload(filePath, file);
     
      const fileUrl$ = storageRef.getDownloadURL()
      
      return concat(uploadTask.snapshotChanges(), fileUrl$ )
      
     }

    return of(null);
  }

  createDirectory(fullPath: string) {
    if(!this._user) return of(null)
    const storageRef = ref(this._storage.storage, `${this._rootPath}/${this._user.uid}${fullPath===""? "" : "/" + fullPath}/.dir`);
    return from(uploadString(storageRef, ''));
  }

  listAllFiles(directory = '') {
    
  return this._auth.getUserData$().pipe(
    filter(user=>user!==null),
    take(1),
    exhaustMap(usr=>{
      // @ts-ignore
        const path = `${this._rootPath}/${usr.uid}/${directory}`;
        const listRef = ref(this._storage.storage, path);
        return  from(listAll(listRef)).pipe(
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
      })
    )
  }

  hasFiles(directory = ""){
    return this._auth.getUserData$().pipe(
      filter(user=>user!==null),
      take(1),
      exhaustMap(usr=>{
          const path = `${this._rootPath}/${usr.uid}/${directory}`;
          const listRef = ref(this._storage.storage, path);
          return from(listAll(listRef)).pipe(
            map(result=>{
              console.log(result.prefixes, result.items)
              const filesCount = [...result.prefixes, ...result.items.filter((item) => item.name !== '.dir')].map(item=>item.fullPath)
              return  [...filesCount, ...result.items.filter(item=>item.name===".dir").map(item=>item.fullPath)]            })
          )
        })
      )
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

