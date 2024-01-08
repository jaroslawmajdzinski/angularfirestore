import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, HostBinding, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-smothheight',
  templateUrl: './smothheight.component.html',
  styleUrls: ['./smothheight.component.scss'],
  animations: [
    trigger('grow', [
      transition(':enter', [
        style({height: 0, opacity: 0}),
        animate('300ms', style({opacity: 1, height: "{{startHeight}}px"}))
      ]),
      transition(':leave', [
        style({height: '{{startHeight}}px', opacity: 1}),
        animate('.5s ease', style({height: 0, opacity: 0})),
      ], {params: {startHeight: 0}})
    ])
  ]
})
export class SmothHeightComponent implements OnChanges {

@Input()trigger: any

startHeight!: number

@HostBinding('@grow')grow: any

constructor(private _element: ElementRef){}

ngOnChanges(changes: SimpleChanges): void {
  this.startHeight = this._element.nativeElement.clientHeight

  this.grow = {
    value: this.trigger,
    params: {startHeight: this.startHeight}
  }
}

}
