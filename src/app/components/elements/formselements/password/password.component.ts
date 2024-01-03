import { Component, ContentChild, Input, ViewChild } from '@angular/core';
import { InputRefDirective } from './input-ref.directive';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent {

  @ContentChild(InputRefDirective)input!: InputRefDirective

  @Input()icon!: string

  
}
