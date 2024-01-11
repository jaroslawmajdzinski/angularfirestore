import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import {
  tap,
  concat,
  from,
  map,
  Observable,
  take,
  filter,
  exhaustMap,
  EMPTY,
  of,
  concatMap,
  catchError,
  delay,
  switchMap,
  retry,
  timer,
  merge,
  scan,
} from 'rxjs';
import { User } from './models/user.model';
import {
  uploadString,
  ref,
  listAll,
  deleteObject,
  getMetadata,
  getDownloadURL,
} from 'firebase/storage';
import { TFileList, TUploadFilesList } from '../components/firebase/management/filesmanagement.types';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { IFileData } from './models/file.model';
import { UploadTaskSnapshot } from '@angular/fire/compat/storage/interfaces';

@Injectable({
  providedIn: 'root',
})
export class FileuploadService {
  private _rootPath = '/uploads';
  private _user: User | null = null;

  constructor(
    private _auth: AuthService,
    private _storage: AngularFireStorage,
    private _httpClient: HttpClient,
    private _firebase: AngularFirestore
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

  uploadFileToStorage(item: TUploadFilesList) {
    return this._auth.getUserData$().pipe(
      filter((user) => user !== null),
      take(1),
      concatMap(usr=>{
        const path = `${this._rootPath}/${usr.uid}${
          item.pathToUpload === '' ? '' : '/' + item.pathToUpload
        }/`
        return this.saveFileInfoToDatabase(
        {
          name: item.file.name,
          searchName: item.file.name.toLocaleLowerCase(),
          pathInUserStorage: path,
          type: item.file.type,
          size: item.file.size,
          uplodDate: new Date().toDateString()
        }, usr.uid
      ).pipe(
        concatMap((id) => {
          const pathWithName = `${path}${id}___${item.file.name}` 
          const storageRef = this._storage.ref(pathWithName);
          const uploadTask = this._storage.upload(pathWithName, item.file);
          const fileUrl$ = storageRef.getDownloadURL();
          return uploadTask.snapshotChanges()
            .pipe(
              scan((progress, curr: UploadTaskSnapshot | undefined) => {
                if (curr!==undefined && curr.state!=="success") {
                    item.progress = Math.ceil((curr.bytesTransferred * 100) / curr.totalBytes)
                }
                return curr;
              }),
              filter(curr=>curr?.state==="success"),
              concatMap(_=>fileUrl$),
              map(url=>(
                {
                 url: url, 
                 fileName: `${id}___${item.file.name}`
                })
              ))
            
        })
        )}),
      
    
      );
  }

  getUploadPath(pathToUpload: string) {
    if (this._user) {
      return `${this._rootPath}/${this._user.uid}${
        pathToUpload === '' ? '' : '/' + pathToUpload
      }`;
    }
    return '';
  }

  createDirectory(fullPath: string) {
    if (!this._user) return of(null);
    const storageRef = ref(
      this._storage.storage,
      `${this._rootPath}/${this._user.uid}${
        fullPath === '' ? '' : '/' + fullPath
      }/.dir`
    );
    return from(uploadString(storageRef, ''));
  }

  listAllFiles(directory = '') {
    return this._auth.getUserData$().pipe(
      filter((user) => user !== null),
      take(1),
      exhaustMap((usr) => {
        const path = `${this._rootPath}/${usr.uid}/${directory}`;
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

            const thumbnails = res.items
              .filter((item) => item.name.startsWith('thumb_'))
              .reduce((acc, curr) => {
                const name = curr.name.split('_')[1];
                return {
                  ...acc,
                  [name]: { name: curr.name, path: curr.fullPath },
                };
              }, {} as { [name: string]: { name: string; path: string } });

            console.log(thumbnails);

            const files = res.items
              .filter(
                (item) =>
                  item.name !== '.dir' && !item.name.startsWith('thumb_')
              )
              .map((itemRef) => {
                const thumb =
                  thumbnails[itemRef.name as keyof typeof thumbnails];
                return {
                  name: itemRef.name.split('___')[1],
                  fullPath: itemRef.fullPath,
                  isDirectory: false,
                  thumbFullPath: thumb ? thumb.path : '',
                };
              });
            return [...lastDir, ...folders, ...files];
          })
        );
      })
    );
  }

  hasFiles(directory = '') {
    return this._auth.getUserData$().pipe(
      filter((user) => user !== null),
      take(1),
      exhaustMap((usr) => {
        const path = `${this._rootPath}/${usr.uid}/${directory}`;
        const listRef = ref(this._storage.storage, path);
        return from(listAll(listRef)).pipe(
          map((result) => {
            console.log(result.prefixes, result.items);
            const filesCount = [
              ...result.prefixes,
              ...result.items.filter((item) => item.name !== '.dir'),
            ].map((item) => item.fullPath);
            return [
              ...filesCount,
              ...result.items
                .filter((item) => item.name === '.dir')
                .map((item) => item.fullPath),
            ];
          })
        );
      })
    );
  }

  deleteFile(item: TFileList) {
   const pathAndName =  item.fullPath
   const uid = this._user?.uid || ""
         console.log('path', pathAndName, 'thumb', item.thumbFullPath)
          
          const thumbPath = item.thumbFullPath || ""
          const fileRef = ref(this._storage.storage, `${pathAndName}`);
          if(thumbPath.length>0){
            const  thumbRef = ref(this._storage.storage, `${item.thumbFullPath}`)
            return merge(
              from(deleteObject(fileRef)),
              from(deleteObject(thumbRef))
            ).pipe(
              concatMap(_=>this.deleteFileInfoFromFirebase(item.name.split("__")[0], uid)
              ))
          }
          return from(deleteObject(fileRef)).pipe(
            concatMap(_=>this.deleteFileInfoFromFirebase(item.name.split("__")[0], uid)
            )) 
    }

  getFileMetadata(fullPath: string) {
    //fullPath contains filename
    const fileRef = ref(this._storage.storage, fullPath);
    return from(getMetadata(fileRef));
  }

  getThumbnails(fullPath: string) {
    const getThumbnail$ = of('').pipe(
      delay(2000),
      switchMap((_) =>
        this.downloadFile(fullPath).pipe(
          switchMap((url) => {
            console.log(url);
            return this._httpClient.get(url, {
              responseType: 'blob',
            });
          })
        )
      )
    );

    return getThumbnail$.pipe(
      retry(),
      catchError((err) => {
        console.log(err.message);
        return EMPTY;
      })
    );
  }

  downloadFile(fullPathWithName: string) {
    const filesURLS$ = new Observable<string>((subscriber) => {
      const fileRef = ref(this._storage.storage, fullPathWithName);
      getDownloadURL(fileRef).then((url) => {
        subscriber.next(url);
        subscriber.complete();
      });
    });

    return filesURLS$;
  }

  saveFileInfoToDatabase(fileData: IFileData, uid: string) {
    const filesCollection = this._firebase.collection(
      `/users/${uid}/files`
    );
    const id = filesCollection.doc().ref.id
    return from(filesCollection.doc(id).set(fileData)).pipe(map(r=>id));
  }

  deleteFileInfoFromFirebase(fileName: string, uid: string){
    const  filesCollection = this._firebase.collection(
      `/users/${uid}/files`
    );
    const id = fileName.split("__")[0]
    console.log('id', id)
    return from(filesCollection.ref.doc(id).delete())
  }

  searchInFiles(text: string){
    const collectionPath = `/users/${this._user?.uid}/files`
    return this._firebase.collection<{searchName: string}>(`/users/${this._user?.uid}/files`, 
      ref=>ref.orderBy('searchName').startAt(text.toLocaleLowerCase()).endAt(text.toLocaleLowerCase() + "\uf8ff")
      ).valueChanges();
  }
}