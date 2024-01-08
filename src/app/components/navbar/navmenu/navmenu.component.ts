import { Component, Input } from '@angular/core';
import { Subscription, tap } from 'rxjs';
import { AuthService } from 'src/app/firebase/auth.service';

@Component({
  selector: 'app-navmenu',
  templateUrl: './navmenu.component.html',
  styleUrls: ['./navmenu.component.scss']
})
export class NavmenuComponent {
 
  @Input()place: "toolbar" | "side" = "toolbar"

  colorMode = "light"
  
  private _sub!: Subscription
  isLogged = false
  userEmail = ""

  constructor(public auth: AuthService){}

  ngOnInit(){
   this._sub = this.auth.getUserData$().pipe(
      tap(user=>{
       
       if(user){
          this.isLogged = true
          this.userEmail = user.email
        }else{ 
          this.isLogged = false
          this.userEmail = ""
        }
      })
    ).subscribe()
  }

  ngOnDestroy(){
    this._sub.unsubscribe()
  }

onColorModeClick(){
  document.body.classList.remove(this.colorMode)
  this.colorMode = this.colorMode==="dark"? "light" : "dark"
  document.body.classList.add(this.colorMode)
}

}

