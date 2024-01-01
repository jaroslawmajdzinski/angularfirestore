import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  EMPTY,
  Subscription,
  catchError,
  combineLatestWith,
  concatMap,
  delay,
  exhaustMap,
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
import { animate, query, stagger, state, style, transition, trigger } from '@angular/animations';

const animations = [
 trigger('newElement', [
    
    transition("*<=>*", [
    query(":enter",
      [
       style({opacity: "0", transform: "scale(0.1)"}),
       stagger('60ms', animate('200ms', style({opacity: "1", transform: "scale(1)"})))
     ], {optional: true}
    ),
    query(":leave",
      [
       animate('200ms', style({opacity: "0", transform: "scale(0.1)"}))
     ], {optional: true}
    )
   ])
   ]),
   trigger('tools', [
     transition(':enter' , [
      style({opacity: "0", transform: "translateX(400px)"}),
      animate('400ms', style({opacity: "1", transform: "translateX(0px)"}))
    ]),
    transition(':leave' , [
      style({opacity: "1"}),
      animate('400ms', style({opacity: "0", transform: "translateX(400px)"}))
    ])
  ] ),
  trigger('progress', [
    transition(':enter' , [
      style({opacity: "0"}),
      animate('400ms', style({opacity: "1"}))
    ]),
    transition(':leave' , [
      style({opacity: "1"}),
      animate('400ms', style({opacity: "0"}))
    ])
  ])
]

@Component({
  selector: 'app-filesmanagement',
  templateUrl: './filesmanagement.component.html',
  styleUrls: ['./filesmanagement.component.scss'],
  animations: animations
})
export class FilesmanagementComponent implements OnInit {
  @ViewChild('fileDownload') anchor!: ElementRef<HTMLAnchorElement>;
  @ViewChild('selectAll') selectAll!: ElementRef<HTMLInputElement>;
  @ViewChild('drawer') drawer!: MatDrawer;

  filesList: TFileList[] = [];
  private _sub = new Subscription();
  path: string[] = [];

  fileMetadata!: IFileMetadata;
  

  constructor(
    public _storageService: FileuploadService,
    private _dialog: MatDialog,
    private _managementServise: ManagementService,
    private _httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    let sub =  this.getListHandler().subscribe();
    this._sub.add(sub);

    sub =  this._managementServise
      .getNewFile()
      .pipe(
        combineLatestWith(this._managementServise.getPath()),
        tap(([newFile, path]) => {
          console.log(newFile.uploadPath, path)
          if (newFile.uploadPath === path) {
            this.filesList.unshift(newFile);
            this.filesList = [...this.filesList];
          }
        })
      )
      .subscribe();
    this._sub.add(sub);
  }

  top(index: number){
    return `${index * (40 + 2)}px`
  }

  height(){
    return `${this.filesList.length * 42}px`
  }

  ngOnDestroy() {
    this._sub.unsubscribe();
  }

  getListHandler() {
    return this._managementServise.getPath().pipe(
      concatMap((path) =>
        this._storageService.listAllFiles(path).pipe(
          tap(
            (items) =>
              (this.filesList = [
                ...items.map((item) => ({
                  ...item,
                  selected: false,
                  progress: 0,
                  loaded: false,
                  uploadPath: '',
                })),
              ])
          )
        )
      ),
      catchError(this.errorHandler)
    );
  }

  selectAllHandler($event: Event) {
    this.filesList.forEach((item, i) => {
      if (!item.isDirectory) {
        const checked = ($event.target as HTMLInputElement).checked;
        item.selected = checked && item.selected ? false : checked;
        //item.progress = item.selected ? 0 : item.progress;
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

  deleteDirectory(idx: number) {
    
  const question = (path: string) =>
      this.dialog({
        title: 'Question',
        message: `Would you like to delet this directory?`,
        actionAreaConfig: [
          { label: 'Yes', color: 'primary' },
          { label: 'No', color: 'warn', dismiss: true },
        ],
      }).pipe(
        filter((res) => res !== 'dismiss' && res !== undefined),
        concatMap((_) => this._storageService.deleteFile(path).pipe(
          tap(_=>{
            this.filesList.splice(idx,1)
            this.filesList = [...this.filesList]
          })
        ))
      );

    this._managementServise
      .getPath()
      .pipe(
        take(1),
        exhaustMap((path) => {
          return this._storageService
            .hasFiles(path + '/' + this.filesList[idx].name)
            .pipe(
              concatMap((isEmpty) => {
                console.log('isEmpty', isEmpty.length);
                if(isEmpty.length>1){
                  return this._dialog
                  .open(MessageDialogComponent, {
                    data: {
                      title: 'Info',
                      message: `Choosen directory is not empty!`,
                      actionAreaConfig: [{ label: 'Ok', color: 'primary', dismiss: true }],
                    },
                  }).afterClosed()
                } else if (isEmpty[0]){
                  return question(isEmpty[0])
                }
                return EMPTY
              })
            );
        })
      )
      .subscribe();
  }

  deleteOneHandler(idx: number) {
    if (this.filesList[idx].isDirectory) {
      this.deleteDirectory(idx);
      return;
    }
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
        tap(() => this._managementServise.emitCurrPath()),
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
        tap(() => (this.selectAll.nativeElement.checked = false))
      )
      .subscribe();
  }

  openDirectory(idx: number) {
    if (this.filesList[idx].fullPath === '..') {
      this._managementServise.goUpDir();
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
        concatMap((result) =>
          this._managementServise.getPath().pipe(
            take(1),
            concatMap((path) =>
              this._storageService.createDirectory(path + `/${result}`)
            )
          )
        ),

        tap((_) => this._managementServise.emitCurrPath()),
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
        tap((_) => {
          this.selectAll.nativeElement.checked = false;
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

  trackByFn(index: number, item: TFileList){
    return  item.name
  }

}
