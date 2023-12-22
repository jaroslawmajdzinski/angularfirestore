import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-actionarea',
  templateUrl: './actionarea.component.html',
  styleUrls: ['./actionarea.component.scss']
})
export class ActionareaComponent {

@Output()clickedButton = new EventEmitter<{label: string, dismiss: boolean | undefined}>()

@Input()actionConfig = [
  {label: "Ok", color: "primary"},
  {label: "Cancel", color: "warn", dismiss: true}
]

}
