import { Component, Input, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { ExpandComponent } from 'src/app/components/uielements/expand/expand.component';
import { IOneTailwindTheme, ITailwindTheme } from 'src/app/theme.service/theme.interfaces';
import { TailwindThemeService } from 'src/app/theme.service/theme.service';

@Component({
  selector: 'app-colormode',
  templateUrl: './colormode.component.html',
  styleUrls: ['./colormode.component.scss']
})
export class ColormodeComponent {

  @Input()onSide!: boolean

  @ViewChild('expand')accordion!: ExpandComponent

  icon = "light_mode"
   constructor(public themeService: TailwindThemeService){}

  ngOnInit(){
    this.icon = this.themeService.getCurrThemeNameAndMode().mode + "_mode"
  }

  changeMode(){
    this.themeService.toogleColorMode()
    this.icon = this.themeService.getCurrThemeNameAndMode().mode + "_mode"
   }

  selectTheme(idx: number){
    this.themeService.selectTheme(idx)
    this.accordion.contentVisible = false
  }

}
