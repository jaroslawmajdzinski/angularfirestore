import { Injectable } from '@angular/core';
import { EElementType, TFormConfig } from './form.config';
import { FormControl, FormGroup, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormshelperService {

  constructor() { }

  formGenerator(config: TFormConfig[]){
    
    let formGroupValidator: ValidatorFn |  null = null
    
    const formGroup = config.reduce((acc,curr)=>{
      if(curr.elementType!==EElementType.formGroupValidator){
        acc[curr.controlName] = new FormControl('', curr.validators)
      } else if (curr.elementType===EElementType.formGroupValidator){
        formGroupValidator = curr.validator
      }
      return acc
    },{} as {[key: string]: FormControl})
  
    return new FormGroup(formGroup, formGroupValidator)
  }

  
  
}
