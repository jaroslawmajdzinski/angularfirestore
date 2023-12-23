import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss']
})
export class FormDialogComponent {
 
  @ViewChild('dirname')dirname!: ElementRef<HTMLInputElement>

  actionAreaConfig = [
      {label: "Ok", color: "primary"},
      {label: "Cancel", color: "warn", dismiss: true}
  ]

  constructor(public dialogRef: MatDialogRef<FormDialogComponent>){}

  onClick(e: { label: string; dismiss: boolean | undefined; } | undefined){
    if(!e?.dismiss && e!==undefined && this.dirname.nativeElement.value){ 
      this.dialogRef.close(this.dirname.nativeElement.value)
    }else{
      this.dialogRef.close(undefined)
    }
  }

}
