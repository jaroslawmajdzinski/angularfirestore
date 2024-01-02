import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'formerrors'
})
export class FormerrorsPipe implements PipeTransform {

  transform(validErrors: ValidationErrors | null, controlErrors: {[key: string]: string}, touched: boolean ): string{
    
    let errors = ""
    
    if(validErrors && touched){
      errors = Object.keys(validErrors).map(err=>(controlErrors[err])).join(', ')
    }
    
  return errors;
  }


}
