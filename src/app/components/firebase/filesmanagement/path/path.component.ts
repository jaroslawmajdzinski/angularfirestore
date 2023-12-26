import { Component, Input } from '@angular/core';
import { ManagementService } from '../../management/management.service';

@Component({
  selector: 'app-path',
  templateUrl: './path.component.html',
  styleUrls: ['./path.component.scss']
})
export class PathComponent {


 constructor(public managment: ManagementService){}  


}
