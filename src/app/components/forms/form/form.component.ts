import { Component, Input } from '@angular/core';
import { FormshelperService } from '../formshelper.service';
import { EElementType, TFormConfig } from '../form.config';
import { formConfig } from '../form.config';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {

  elements = EElementType

  @Input()formConfig: TFormConfig[] = formConfig

  formGroup: FormGroup = this._formGenerator.formGenerator(this.formConfig)
  

  constructor(private _formGenerator: FormshelperService){}

  ngOnInit() {
   
  }

}
