
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../firebase/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';
import { PasswordConfirmation } from './passwordconfirmacion';
import { EMPTY, catchError, concatMap, filter, tap } from 'rxjs';
import { FormshelperService } from '../forms/formshelper.service';
import { formConfig } from '../forms/form.config';

interface errorMessagesT {
  [key: string]: { [key: string]: string };
}

interface IFormField {
  [key: string]: [string, any[]];
}

interface IForm {
  [key: string]: IFormField;
}

@Component({
  selector: 'app-login-reactive-new',
  templateUrl: './login-reactive.component.html',
  styleUrls: ['./login-reactive.component.scss'],
  providers: [PasswordConfirmation],
})
export class LoginReactiveComponent implements OnInit {
  isLogin = true;
 
  formTitle = 'Login into your account';

  registrationForm!: FormGroup
  
  errorMessages: errorMessagesT = {
    email: {
      required: 'E-mail is required, please eneter',
      email: 'Entered email is not valid',
    },
    password: {
      required: 'Please enter the password',
      minlength: 'The password should containd 8 characters at least',
    },
    confirmpassword: {
      required: 'Please confirm the password',
      minlength: 'The password should containd 8 characters at least',
      notEqual: 'Password confirmation is not equal with password',
    },
  };

  formErrors: { [key: string]: string } = {};

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _passwordConfirmation: PasswordConfirmation,
    public dialog: MatDialog,
    private _formGenerator: FormshelperService
  ) {}

  ngOnInit() {
    if (this._router.url === '/register') {
      this.formTitle = 'Register an account';
      this.isLogin = false;
    }

    this.registrationForm = this.registrationOrLoginForm()
   
  }

  sendHandler(){
    if(this.isLogin){
      this.signIn()
    }else{
      this.signUp()
    }
  }

  signIn() {
    this._authService.signIn(
      this.registrationForm.value.email || '',
      this.registrationForm.value.password || ''
    ).pipe(
      concatMap(_=>{
            this.registrationForm.reset();
            const message = `You have logged in successfully!`;
    
            return  this.dialog.open(MessageDialogComponent, {
            data: {
              title: 'Info',
              message: message,
              actionAreaConfig: [
                { label: 'Ok', color: 'primary', dismiss: true },
              ],
            },
          }).afterClosed()
        }  
     
    ),
     catchError(error=>this.handleErrorerror(error))
     ).subscribe()
    }
  
signUp(){
    this._authService.signUp(
      this.registrationForm.value.email || '',
      this.registrationForm.value.password || ''
    ).pipe(
      tap(_=>{
          this._router.navigate(['/verify'])
        }
   ),
   catchError(error=>this.handleErrorerror(error))
   ).subscribe()
  }  

  handleErrorerror = (error: {message: string, redirectoToUrl?: string})=>{
    console.log(error)
    return this.dialog.open(MessageDialogComponent, {
      data: {
        title: 'Error',
        message: error.message,
        actionAreaConfig: [
          { label: 'Ok', color: 'primary', dismiss: true },
        ],
      },
    }).afterClosed().pipe(
      filter(_=>error.redirectoToUrl!==undefined),
      tap(()=>this._router.navigate([error.redirectoToUrl]))
    ) 
  }

  registrationOrLoginForm() {
    
    const currForm = this.isLogin ? 'login' : 'registration';

    const formTemplate: IForm = {
      registration: {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmpassword: ['', [Validators.required, Validators.minLength(8)]],
      },
      login: {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
      },
    };

    const form = new FormGroup({})

    Object.keys(formTemplate[currForm]).forEach((key) => {
      const field = formTemplate[currForm][key];
      form.addControl(key, new FormControl(field[0], field[1] as Validators));
    });
    
    if(!this.isLogin){
      form.addValidators(this._passwordConfirmation.passwordConfirmationValidation())
    }

    return form

  }
}
