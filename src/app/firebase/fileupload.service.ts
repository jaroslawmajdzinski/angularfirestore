import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import {
  AngularFireStorage,
  AngularFireStorageReference,
} from '@angular/fire/compat/storage';
import { tap, concat, from, map, last } from 'rxjs';
import { User } from './user.model';
import { uploadString, ref, listAll, deleteObject } from 'firebase/storage';

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

  uploadFileToStorage(file: File) {
    if (this._user) {
      // @ts-ignore
      const filePath = `${this._rootPath}/${this._user['multiFactor']['user'].uid}/${file.name}`;
      const storageRef = this._storage.ref(filePath);
      const uploadTask = this._storage.upload(filePath, file);

      concat(uploadTask.snapshotChanges(), storageRef.getDownloadURL())
        .pipe(tap((url) => console.log(url)))
        .subscribe();

      return uploadTask.percentageChanges();
    }

    return null;
  }

  createDirectory(fullPath: string) {
    // @ts-ignore
    const storageRef = ref(`${fullPath}/.dir`);
    return from(uploadString(storageRef, ''));
  }

  listAllFiles(directory = '') {
    // @ts-ignore
    const path = `${this._rootPath}/${this._user['multiFactor']['user'].uid}` + `${directory ? `/${directory}` : ''}`;
    const listRef = ref(this._storage.storage, path);
    return from(listAll(listRef)).pipe(
      map((res) => {
        //console.log('prefixes', res.prefixes, 'items', res.items)
        const folders = res.prefixes.map((item) => ({
          name: item.name,
          fullPath: item.name,
          isDirectory: true,
        }));

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
    console.log(fullPath)
    return from(deleteObject(fileRef));
  }
}
