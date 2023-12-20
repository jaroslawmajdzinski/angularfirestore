import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { AuthService } from './firebase/auth.service';
import { MatSidenav } from '@angular/material/sidenav';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private _router: Router, private _authService: AuthService) {}
 
  @ViewChild('sideNav')sidenav!: MatSidenav;

  title = 'aatailwind';

  ngOnInit(){

   
  
    this._router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        //this.sidenav.close()
        setTimeout(() => {
          // @ts-ignore 
          HSStaticMethods.autoInit();
        }, 100);
      }
    });
  }

  onRegister(){
    this._router.navigate(["/register"])
  }

  onLogin(){
    this._router.navigate(["/login"])
  }

}
