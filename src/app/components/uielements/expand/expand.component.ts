import { animate, style, transition, trigger } from '@angular/animations';
import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-expand',
  templateUrl: './expand.component.html',
  styleUrls: ['./expand.component.scss'],
  })

export class ExpandComponent {



@Input()contentVisible: boolean = false



}
