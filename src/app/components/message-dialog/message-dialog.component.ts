import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IDialogConfig } from './message-dialog.types';

@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.scss']
})
export class MessageDialogComponent {
  constructor (public dialogRef: MatDialogRef<MessageDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: IDialogConfig){}

  onOkClick(e: {label: string, dismiss: boolean | undefined}){
    this.dialogRef.close(e.dismiss? 'dismiss' : e.label )
  }
}
