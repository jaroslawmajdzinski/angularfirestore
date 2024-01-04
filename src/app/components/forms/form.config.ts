import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';

export enum EElementType {
  'select' = 'select',
  'checkbox' = 'checkbox',
  'input' = 'input',
  'password' = 'password',
  'formGroupValidator' = 'formGroupValidator'
}


export interface IFormConfigSelect {
  elementType: 'select';
  list: [string, string][];
}

export interface IFormConfigCheckbox {
  elementType: 'checkbox';
  values?: { checked: string; unchecked: string };
}

export interface IFormConfigInput {
  elementType: 'input';
}

export interface IFormConfigPassword {
  elementType: 'password';
}

export type TMerg<T> = T & IFormConfigCommon;

export interface IFormConfigCommon {
  controlName: string;
  label: string;
  validators: ValidatorFn[];
  errorsMessages: { [key: string]: string };
}

export interface IFormGroupValidator {
    elementType: 'formGroupValidator';
    validator: ValidatorFn;
}

export type TFormGroupValidator = IFormGroupValidator | never

export type TFormConfig =
  | TMerg<IFormConfigInput>
  | TMerg<IFormConfigSelect>
  | TMerg<IFormConfigCheckbox>
  | TMerg<IFormConfigPassword>
  | TFormGroupValidator
  
type u<T extends {}>= T
 

 export const formValidator = (formGroup: AbstractControl) =>{
    const password = formGroup.get('password');
    const confirmation = formGroup.get('confirmpassword')

    if(!password || !confirmation) return null

    if(password.value!==confirmation.value){
        confirmation.setErrors({notEqual: true})
    }

    return null
}  


export const formConfig: TFormConfig[] = [
  {
    controlName: 'email',
    label: 'Email',
    elementType: 'input',
    validators: [Validators.required, Validators.email],
    errorsMessages: {
      required: 'E-mail is required, please eneter',
      email: 'Entered email is not valid',
    },
  },
  {
    controlName: 'password',
    label: 'Password',
    elementType: 'password',
    validators: [Validators.required, Validators.email],
    errorsMessages: {
      required: 'E-mail is required, please eneter',
      email: 'Entered email is not valid',
    },
  },
  {
    elementType: 'formGroupValidator',
    validator: formValidator
  }
]

