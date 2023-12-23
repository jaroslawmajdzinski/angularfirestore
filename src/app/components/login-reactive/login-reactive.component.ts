import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { AuthService } from '../../firebase/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';

interface errorMessagesT {
  [key: string]: { [key: string]: string };
}

@Component({
  selector: 'app-login-reactive',
  templateUrl: './login-reactive.component.html',
  styleUrls: ['./login-reactive.component.scss'],
})
export class LoginReactiveComponent implements OnInit {
  isLogin = true;
  formTitle = 'Login';

  registrationForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  errorMessages: errorMessagesT = {
    email: {
      required: 'E-mail is required, please eneter',
      email: 'Entered email is not valid',
    },
    password: {
      required: 'Please enter the password',
      minlength: 'The password should containd 8 characters at least',
    },
  };

  formErrors: { [key: string]: string } = {};

  constructor(
    private _authService: AuthService,
    private _router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    if (this._router.url === '/register') {
      this.formTitle = 'Registration';
      this.isLogin = false;
    }

    this.registrationForm.valueChanges
      .pipe(
        tap((form) => {
          Object.keys(this.registrationForm.controls).forEach((key) => {
            const controlErrors = this.registrationForm.get(key)?.errors;

            if (controlErrors && this.registrationForm.get(key)?.dirty) {
              this.formErrors[key] = Object.keys(controlErrors)
                .map((errKey) => this.errorMessages[key][errKey])
                .join(',');
            } else {
              this.formErrors[key] = '';
            }
          });
        })
      )
      .subscribe();
  }

  sendHandler() {
    if (this.registrationForm.invalid) return;

    const whereToSend = this.isLogin ? 'signIn' : 'signUp';

    this._authService[whereToSend](
      this.registrationForm.value.email || '',
      this.registrationForm.value.password || ''
    )
      .then((res) => {
        this.registrationForm.reset()
        const message = `You have ${
          this.isLogin ? 'logged in' : 'registered'
        } successfully!`;
        const dialogRef = this.dialog.open(MessageDialogComponent, {
          data: { 
            title: "Info",
            message: message, 
            actionAreaConfig: [{label: "Ok", color: "primary", dismiss: true }]
          },
        });
        console.log(res);
      })
      .catch((error) => {
        //console.log(error.message);
        const message = 'Email or password problem\n' + error.message ;
        const dialogRef = this.dialog.open(MessageDialogComponent, {
          data: { title: "Error", message: message, actionAreaConfig: [{label: "Ok", color: "primary", dismiss: true }] },
        });
      });
  }
}
