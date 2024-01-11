import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { OverlayserviceService } from '../overlayservice.service';
import { tap } from 'rxjs';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-imagepreview',
  templateUrl: './imagepreview.component.html',
  styleUrls: ['./imagepreview.component.scss']
})
export class ImagepreviewComponent {
  @ViewChild('imageContainer') imageContainer!: ElementRef;

  @Input() img!: HTMLImageElement;

  constructor(private _dataService: OverlayserviceService) {}

  ngAfterViewInit() {
   this._dataService
      .getImage()
      .pipe(
       tap((src) => {
       if(src!==null){
          this.img = new Image()
          this.img.setAttribute('src', src) ;
          this.img.style.borderRadius = "5px"
          this.imageContainer.nativeElement.appendChild(this.img);
          console.log('image', this.img);
        }
        })
      )
      .subscribe();
  }
}
