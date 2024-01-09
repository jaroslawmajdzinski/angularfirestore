import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-imagepreview',
  templateUrl: './imagepreview.component.html',
  styleUrls: ['./imagepreview.component.scss']
})
export class ImagepreviewComponent {

@ViewChild('imageContainer')imageContainer!: ElementRef 

@Input()img!: HTMLImageElement

ngAvfterViewInit(){
  this.img.style.width ="100%"
  this.imageContainer.nativeElement.appendChild(this.img)
  console.log(this.img)
}

}
