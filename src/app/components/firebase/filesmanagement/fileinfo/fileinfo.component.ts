import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IFileMetadata } from 'src/app/firebase/models/metadata.mode';


@Component({
  selector: 'app-fileinfo',
  templateUrl: './fileinfo.component.html',
  styleUrls: ['./fileinfo.component.scss']
})
export class FileinfoComponent {

  @Output()close = new EventEmitter()
  @Input()fileMetadata!: IFileMetadata

}
