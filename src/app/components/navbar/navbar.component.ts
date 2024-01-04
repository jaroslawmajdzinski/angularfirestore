import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/firebase/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  @Output() public sideNavToggle = new EventEmitter() 

  userEmail!: string  

  ngOnInit(){
    
  }

}
