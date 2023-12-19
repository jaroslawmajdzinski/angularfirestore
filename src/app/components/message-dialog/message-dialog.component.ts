import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.scss']
})
export class MessageDialogComponent {
  constructor (public dialogRef: MatDialogRef<HTMLElement>, @Inject(MAT_DIALOG_DATA) public data: {message: string}){}

  onOkClick(){
    this.dialogRef.close()
  }
}
