import { Component } from '@angular/core';

@Component({
  selector: 'app-navbutton',
  templateUrl: './navbutton.component.html',
  styleUrls: ['./navbutton.component.scss']
})
export class NavbuttonComponent {
  open = false
    
  clickHandler(){
     this.open =  !this.open
  }  
}
