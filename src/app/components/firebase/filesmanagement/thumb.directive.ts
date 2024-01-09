import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnChanges,
} from '@angular/core';
import { url } from 'inspector';
import {
  Subject,
  Subscription,
  delay,
  filter,
  finalize,
  takeUntil,
  tap,
} from 'rxjs';
import { FileuploadService } from 'src/app/firebase/fileupload.service';

@Directive({
  selector: '[appThumb]',
})
export class ThumbDirective implements AfterViewInit {
  @Input() appThumb!: string | undefined;
  private _sub!: Subscription;
  private _thumb!: string;
  private _until$ = new Subject();

  constructor(
    private _elem: ElementRef<HTMLDivElement>,
    private _uploadService: FileuploadService
  ) {}

  ngAfterViewInit() {
    if (this.appThumb && this.appThumb !== this._thumb) {
      this._thumb = this.appThumb;
      console.log(this.appThumb);
      this._sub = this._uploadService
        .getThumbnails(this.appThumb)
        .pipe(
          tap((blob) => {
            const img = new Image();
            const urlFromBlob = URL.createObjectURL(blob);
            img.src = urlFromBlob;
            img.onload = () => {
              img.style.height = '40px';
              this._elem.nativeElement.appendChild(img);
              this._until$.next('');
              this._until$.complete();
            };
          }),
          takeUntil(this._until$)
        )
        .subscribe();
    }
  }

  
}
