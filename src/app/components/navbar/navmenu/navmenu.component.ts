import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/firebase/auth.service';

@Component({
  selector: 'app-navmenu',
  templateUrl: './navmenu.component.html',
  styleUrls: ['./navmenu.component.scss']
})
export class NavmenuComponent {
 
  @Input()place: "toolbar" | "side" = "toolbar"

  constructor(public auth: AuthService){}
}
