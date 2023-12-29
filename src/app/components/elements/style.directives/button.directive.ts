import { Directive, ElementRef, HostBinding, Input, Renderer2 } from '@angular/core';



@Directive({
  selector: '[appButton]'
})
export class ButtonDirective {

  @Input()appButton!: string
  @Input()class!: string

  private _baseClasses = `
  py-2 
  flex  items-center gap-x-2 
  text-sm font-semibold 
  rounded-md  
  border 
  border-transparent  
  shadow-sm 
  disabled:opacity-50 
  disabled:pointer-events-none 
  dark:focus:outline-none 
  dark:focus:ring-1 
  dark:focus:ring-gray-600
  `
 
  color = {
    "secondary": `bg-secondary-500 text-white hover:bg-secondary-400 `, 
    "primary": `bg-primary-500 text-white hover:bg-primary-400 center-center`,
    "success": `bg-success-500 text-success-contrast-500 hover:bg-success-400 `,
    "danger": `bg-danger-500 text-white hover:bg-danger-400 `,
    "accent": `bg-accent-500 text-white hover:bg-accent-400 `
  }

  constructor(private _render2: Renderer2, private _el: ElementRef<HTMLElement>) { }

  ngAfterViewInit(){
    const currVariant = this.appButton || "primary"
    const colorVariant = this.color[currVariant  as keyof typeof this.color]
    const classes = this._el.nativeElement.classList
    const content = this._el.nativeElement.textContent || this._el.nativeElement.innerText
    this._el.nativeElement.innerText = ""

    const newElem = document.createElement("div")
    newElem.innerText = content
    newElem.setAttribute('class', "w-full flex justify-center letter-spacing")
   
    this._el.nativeElement.setAttribute('class', `${this._baseClasses} ${colorVariant} ${classes}`)
    this._el.nativeElement.appendChild(newElem)
  }

}
