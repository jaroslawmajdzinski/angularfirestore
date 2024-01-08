import { Component, Input, Output, OnChanges } from '@angular/core';
import { EventEmitter } from 'stream';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent  {

  @Input()selected!: boolean

  @Input()value: any

  

}
