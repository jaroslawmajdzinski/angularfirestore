import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-navbutton',
  templateUrl: './navbutton.component.html',
  styleUrls: ['./navbutton.component.scss']
})
export class NavbuttonComponent {
  open = false
    
  @Output()toggle = new EventEmitter()

  clickHandler(){
     this.open =  !this.open
    this.toggle.emit()   
  }  
}
