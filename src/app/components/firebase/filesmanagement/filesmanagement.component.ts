import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { FileuploadService } from 'src/app/firebase/fileupload.service';

@Component({
  selector: 'app-filesmanagement',
  templateUrl: './filesmanagement.component.html',
  styleUrls: ['./filesmanagement.component.scss']
})
export class FilesmanagementComponent implements OnInit{

  constructor(public filesManagement: FileuploadService){}

 ngOnInit(): void {
   
 }

}
