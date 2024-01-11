import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  EMPTY,
  Subject,
  filter,
  finalize,
  fromEvent,
  interval,
  map,
  mapTo,
  merge,
  mergeMap,
  scan,
  startWith,
  switchMap,
  takeUntil,
  takeWhile,
  tap,
} from 'rxjs';
import { FileuploadService } from 'src/app/firebase/fileupload.service';
import { ImagepreviewComponent } from '../imagepreview/imagepreview.component';
import { OverlayserviceService } from '../overlayservice.service';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.scss'],
  animations: [
    trigger('showPreview', [
      transition(':enter', [
        style({ opacity: '0', transform: 'scale(0.1)' }),
        animate('200ms', style({ opacity: '1', transform: 'scale(1)' })),
      ]),
      transition(':leave', [
        animate('200ms', style({ opacity: '0', transform: 'scale(0.1)' })),
      ]),
    ]),
  ],
})
export class ThumbnailComponent implements OnChanges {
  @ViewChild('thumbContainer') container!: ElementRef<HTMLDivElement>;

  @Input() thumbPathAndName!: string | undefined;

  private _thumb!: string;
  private _until$ = new Subject();
  imgSrc!: string;
  previewOpen = false;

  constructor(
    private _uploadService: FileuploadService,
    private _overlay: Overlay,
    private _dataService: OverlayserviceService
  ) {}

  ngAfterViewInit() {
    
    const endTrigger$ = fromEvent(this.container.nativeElement, 'mouseleave').pipe(map(_=>false)).pipe(tap(_=>this.previewOpen=false))
    const startTrigger$ = fromEvent(this.container.nativeElement,'mouseenter').pipe(map(_=>true))
    const interval$ = interval(1000).pipe(tap(i=>console.log(i)))

    const openPreview$ = merge(startTrigger$, endTrigger$).pipe(
      switchMap(val=>val? interval$ : EMPTY ),
      filter(v=>v===3),
      tap(()=>this.previewOpen=true)
    ).subscribe()
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes', changes);

    if (this.thumbPathAndName && this.thumbPathAndName !== this._thumb) {
      this._thumb = this.thumbPathAndName;
      console.log(this.thumbPathAndName);

      this._uploadService
        .getThumbnails(this.thumbPathAndName)
        .pipe(
          tap((blob) => {
            const img = new Image();
            const urlFromBlob = URL.createObjectURL(blob);
            this.imgSrc = urlFromBlob;
            img.src = urlFromBlob;
            img.onload = () => {
              img.style.height = '40px';
              this.container.nativeElement.appendChild(img);
              this._until$.next('');
              this._until$.complete();
            };
          }),
          takeUntil(this._until$)
        )
        .subscribe();
    }
  }

  displayOverlay() {
    console.log('overlay');
    const target = this.container.nativeElement;
    const overlayRef = this._overlay.create({
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      panelClass: 'mat-elevation-z8',
      positionStrategy: this._overlay
        .position()
        .flexibleConnectedTo(target)
        .withPositions([
          {
            originX: 'start',
            originY: 'bottom',
            overlayX: 'start',
            overlayY: 'top',
          },
        ]),
    });
    const component = new ComponentPortal(ImagepreviewComponent);
    const componentRef = overlayRef.attach(component);
    this._dataService.sendImage(this.imgSrc);
    overlayRef.backdropClick().subscribe(() => overlayRef.detach());
  }
}
