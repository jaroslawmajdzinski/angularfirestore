import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EMPTY, catchError, concatMap, from } from 'rxjs';
import { AuthService } from 'src/app/firebase/auth.service';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';

@Component({
  selector: 'app-verifyaccount',
  templateUrl: './verifyaccount.component.html',
  styleUrls: ['./verifyaccount.component.scss']
})
export class VerifyaccountComponent {

  title = 'Verify your account'

  constructor(private _auth: AuthService, private _dialog: MatDialog){}

  resendEmail(){
    this._auth.sendVeryficationMail().pipe(
      concatMap(_=>{
        return this._dialog.open(MessageDialogComponent, {
          data: {
            title: 'Info',
            message: 'Email with activation link has been resent!',
            actionAreaConfig: [
              { label: 'Ok', color: 'primary', dismiss: true },
            ],
          },
        }).afterClosed()
      }),
      catchError(error=>this.handleErrorerror(error)
      )).subscribe()
  }

  handleErrorerror = (error: {message: string})=>{
    const message = 'Email or password problem\n' + error.message;
    this._dialog.open(MessageDialogComponent, {
      data: {
        title: 'Error',
        message: message,
        actionAreaConfig: [
          { label: 'Ok', color: 'primary', dismiss: true },
        ],
      },
    })
    return EMPTY
  }

}
