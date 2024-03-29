import { Directive, ElementRef, HostBinding, Input, Renderer2 } from '@angular/core';



@Directive({
  selector: '[appButton]'
})
export class ButtonDirective {

  @Input()appButton!: string
  

  @HostBinding('class')classes!: string 

  private _baseClasses = `
  py-2 
  inline-flex justify-center items-center gap-x-2 
  text-sm font-normal 
  rounded-[4px]  
  border 
  border-transparent  
  shadow-md 
  disabled:opacity-50 
  disabled:pointer-events-none 
  dark:focus:outline-none 
  dark:focus:ring-1 
  dark:focus:ring-gray-600
  `
 
  color = {
    "secondary": `bg-secondary-500 text-white hover:bg-secondary-400 `, 
    "primary": `bg-primary-500 text-white hover:bg-primary-600 center-center`,
    "success": `bg-success-500 text-success-contrast-500 hover:bg-success-400 `,
    "danger": `bg-danger-500 text-white hover:bg-danger-400 `,
    "accent": `bg-accent-500 text-white hover:bg-accent-400 `
  }

  constructor(private _render2: Renderer2, private _el: ElementRef<HTMLElement>) { }

  ngAfterViewInit(){

    
    const currVariant = this.appButton || "primary"
    const colorVariant = this.color[currVariant  as keyof typeof this.color]
    
    this.classes = `${this._baseClasses} ${colorVariant} ${this.classes? this.classes :  ""}`
    
  }

  addClasses(elem: any, classes: string){
    classes.split(" ").forEach(
        (cls)=>{
          this._render2.addClass(elem, cls)
        }
      )
  }

}
