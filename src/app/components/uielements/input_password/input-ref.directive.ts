import { Directive, ElementRef  } from '@angular/core';

@Directive({
  selector: '[inputRef]'
})
export class InputRefDirective {

  focus = false

  constructor(public inputRef: ElementRef) { }

  setType(type: string){
    (this.inputRef.nativeElement as HTMLInputElement).setAttribute('type', type)
  }

}
