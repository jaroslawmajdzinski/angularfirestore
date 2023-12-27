import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  EMPTY,
  Subscription,
  catchError,
  concatMap,
  delay,
  filter,
  forkJoin,
  take,
  tap,
} from 'rxjs';
import { FileuploadService } from 'src/app/firebase/fileupload.service';
import { MessageDialogComponent } from '../../message-dialog/message-dialog.component';
import { FormDialogComponent } from '../../form-dialog/form-dialog.component';
import { MatDrawer } from '@angular/material/sidenav';
import { IFileMetadata } from 'src/app/firebase/models/metadata.mode';
import {
  HttpClient,
  HttpErrorResponse,
  HttpEventType,
} from '@angular/common/http';
import { IDialogConfig } from '../../message-dialog/message-dialog.types';
import { ManagementService } from '../management/management.service';
import { TFileList } from '../management/filesmanagement.types';

@Component({
  selector: 'app-filesmanagement',
  templateUrl: './filesmanagement.component.html',
  styleUrls: ['./filesmanagement.component.scss'],
})
export class FilesmanagementComponent implements OnInit {
  @ViewChild('fileDownload') anchor!: ElementRef<HTMLAnchorElement>;
  @ViewChild('selectAll')selectAll!: ElementRef<HTMLInputElement>;
  @ViewChild('drawer') drawer!: MatDrawer;

  filesList: TFileList[] = [];
  sub!: Subscription;
  path: string[] = [];
 
  fileMetadata!: IFileMetadata;

  constructor(
    public _storageService: FileuploadService,
    private _dialog: MatDialog,
    private _managementServise: ManagementService,
    private _httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    this.getListHandler().subscribe();
    //this.sub.add(sub)
    
    this._managementServise.getNewFile().pipe(
      tap(newFile=>{
       
        this.filesList.unshift(newFile)
        this.filesList = [...this.filesList]
      
      })
    ).subscribe()
    //this.sub.add(sub)  
  }

  getListHandler() {
    return this._managementServise.getPath().pipe(
      concatMap(path=>this._storageService.listAllFiles(path).pipe(
        tap(
          (items) =>
            (this.filesList = [
              ...items.map((item) => ({
                ...item,
                selected: false,
                progress: 0,
                loaded: false,
              })),
            ])
        ),
       )),
       catchError(this.errorHandler)
       )
    }

  selectAllHandler($event: Event) {
    this.filesList.forEach((item, i) => {
      if (!item.isDirectory) {
        const checked = ($event.target as HTMLInputElement).checked;
        item.selected = checked && item.selected ? false : checked;
        item.progress = item.selected ? 0 : item.progress;
      }
    });
    this.filesList = [...this.filesList];
  }

  selectOneHandler($event: Event, idx: number) {
    this.filesList[idx].selected = ($event.target as HTMLInputElement).checked;
    this.filesList[idx].progress = this.filesList[idx].selected
      ? 0
      : this.filesList[idx].progress;
    this.filesList = [...this.filesList];
  }

  deleteOneHandler(idx: number) {
    this.dialog({
      title: 'Question',
      message: `Do you want to delet ${this.filesList[idx].name} file?`,
      actionAreaConfig: [
        { label: 'Yes', color: 'primary' },
        { label: 'No', color: 'warn', dismiss: true },
      ],
    })
      .pipe(
        filter((res) => res !== 'dismiss' && res !== undefined),
        concatMap(() =>
          this._storageService.deleteFile(this.filesList[idx].fullPath)
        ),
        tap(() =>this._managementServise.emitCurrPath()),
        catchError(this.errorHandler)
      )
      .subscribe();
  }

  deleteHandler() {
    this.dialog({
      title: 'Question',
      message: `Do you want to delet selected files?`,
      actionAreaConfig: [
        { label: 'Yes', color: 'primary' },
        { label: 'No', color: 'warn', dismiss: true },
      ],
    })
      .pipe(
        filter((res) => res !== 'dismiss' && res !== undefined),
        concatMap((_) =>
          forkJoin(
            this.filesList
              .filter((item) => item.selected && !item.isDirectory)
              .map((item) => this._storageService.deleteFile(item.fullPath))
          ).pipe(
            tap(() => this._managementServise.emitCurrPath()),
            catchError(this.errorHandler)
          )
        ),
            tap(()=>this.selectAll.nativeElement.checked = false)
        )
      .subscribe();
  }

  openDirectory(idx: number) {
    if (this.filesList[idx].fullPath === '..') {
      this._managementServise.goUpDir()
    } else {
      this._managementServise.goDirDown(this.filesList[idx].name);
    }
  }

  

  createDirctory() {
    this._dialog
      .open(FormDialogComponent)
      .afterClosed()
      .pipe(
        filter((result) => result),
        concatMap((result) =>this._managementServise.getPath()
              .pipe(
                take(1),
                concatMap(path=>this._storageService.createDirectory(
                path + `/${result}`
              )
            ),)
        ),  
        
    tap(_ => this._managementServise.emitCurrPath()),
        catchError(this.errorHandler)
      )
      .subscribe();
  }

  showFileMetadata(idx: number) {
    this._storageService
      .getFileMetadata(this.filesList[idx].fullPath)
      .pipe(
        tap((res) => {
          this.drawer.open();
          this.fileMetadata = { ...res };
        })
      )
      .subscribe();
  }

  downloadFiles() {
    forkJoin(
      this.filesList
        .filter((item) => item.selected)
        .map((item) =>
          this._storageService.downloadFile(item.fullPath).pipe(
            concatMap((url) => {
              return this._httpClient
                .get(url, {
                  responseType: 'blob',
                  reportProgress: true,
                  observe: 'events',
                })
                .pipe(catchError(this.errorHandler));
            }),
            tap((event) => {
              if (
                event.type === HttpEventType.DownloadProgress &&
                event.total &&
                event.loaded
              ) {
                item.progress = Math.ceil((event.loaded * 100) / event.total);
              }
              if (event.type === HttpEventType.Response) {
                this.saveHandler(event.body as Blob, item.name);
                item.loaded = true;
              }
            })
          )
        )
    )
      .pipe(
        delay(300),
        tap(_ => {
          this.selectAll.nativeElement.checked = false
          this.filesList = [
            ...this.filesList.map((item) => ({ ...item, selected: false })),
          ];
        })
      )
      .subscribe();
  }

  dialog(dialogData: IDialogConfig) {
    return this._dialog
      .open(MessageDialogComponent, {
        data: {
          title: dialogData.title,
          message: dialogData.message,
          actionAreaConfig: [...dialogData.actionAreaConfig],
        },
      })
      .afterClosed();
  }

  errorHandler(err: HttpErrorResponse) {
    console.error(err.message);
    return EMPTY;
  }

  saveHandler(blob: Blob, name: string) {
    const a = document.createElement('a');
    const objectUrl = URL.createObjectURL(blob);
    a.href = objectUrl;
    a.download = name;
    document.body.append(a);
    a.click();
    URL.revokeObjectURL(objectUrl);
    document.body.removeChild(a);
  }
}
