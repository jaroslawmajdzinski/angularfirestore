import { Component, ContentChild, Input, ViewChild } from '@angular/core';
import { InputRefDirective } from './input-ref.directive';

@Component({
  selector: 'app-input-password',
  templateUrl: './input_password.component.html',
  styleUrls: ['./input_password.component.scss']
})
export class InputPasswordComponent {

  @ContentChild(InputRefDirective)input!: InputRefDirective

  @Input()icon!: string

  
}
