import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router, Event, NavigationEnd} from '@angular/router';
import { AuthService } from './firebase/auth.service';
import { MatSidenav } from '@angular/material/sidenav';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [ trigger('newElement', [
    
    transition("*<=>*", [
    query(":enter",
      [
       style({ position: "absolute", top: "88px", left:"0px", width: "100%",  opacity: "0", transform: "translateX(-100vw)"}),
       stagger('60ms', animate('200ms', style({opacity: "1", transform: "translateX(0)"})))
     ], {optional: true}
    ),
    query(":leave",
      [
       animate('200ms', style({opacity: "0", transform: "translateX(100vw)"}))
     ], {optional: true}
    )
   ])
   ]),]

})
export class AppComponent {
  constructor(private _router: Router, private _authService: AuthService) {}
 
  @ViewChild('sideNav')sidenav!: MatSidenav;

  title = 'aatailwind';

  getRouteAnimation(){
    return document.location.href
  }
  
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
