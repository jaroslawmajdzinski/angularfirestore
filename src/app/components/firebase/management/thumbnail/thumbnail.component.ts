import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { Subject, takeUntil, tap } from 'rxjs';
import { FileuploadService } from 'src/app/firebase/fileupload.service';
import { ImagepreviewComponent } from '../imagepreview/imagepreview.component';

@Component({
  selector: 'app-thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.scss']
})
export class ThumbnailComponent implements OnChanges {

  @ViewChild('imgContainer')container!: ElementRef<HTMLDivElement>

  @Input()thumbPathAndName!: string | undefined

  private _thumb!: string 
  private _until$ = new Subject()
  private _img!: HTMLImageElement;

  constructor(private _uploadService: FileuploadService,  private _overlay: Overlay ){}

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes', changes)
    
    if(this.thumbPathAndName && this.thumbPathAndName!==this._thumb){
      this._thumb = this.thumbPathAndName
      console.log(this.thumbPathAndName)
      
      this._uploadService.getThumbnails(this.thumbPathAndName).pipe(
        tap(blob=>{
          this._img = new Image()
          const urlFromBlob = URL.createObjectURL(blob);
          this._img.src = urlFromBlob
          this._img.onload = ()=>{
            this._img.style.height = "40px"
            this.container.nativeElement.appendChild(this._img)
            this._until$.next("")
            this._until$.complete()
          }
       }),
       takeUntil(this._until$)
      ).subscribe()
    }
  
  }

  displayOverlay() {
    console.log('overlay')
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
    overlayRef.backdropClick().subscribe(() => overlayRef.detach());
  }

}
