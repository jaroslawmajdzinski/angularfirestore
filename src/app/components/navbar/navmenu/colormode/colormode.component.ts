import { Component } from '@angular/core';
import { IOneTailwindTheme, ITailwindTheme } from 'src/app/theme.service/theme.interfaces';
import { TailwindThemeService } from 'src/app/theme.service/theme.service';

@Component({
  selector: 'app-colormode',
  templateUrl: './colormode.component.html',
  styleUrls: ['./colormode.component.scss']
})
export class ColormodeComponent {

  icon = "light_mode"
   constructor(public themeService: TailwindThemeService){}

  ngOnInit(){
    this.icon = this.themeService.getCurrThemeNameAndMode().mode + "_mode"
  }

  changeMode(){
    this.themeService.toogleColorMode()
    this.icon = this.themeService.getCurrThemeNameAndMode().mode + "_mode"
  }

  selectTheme(ev: Event){
    console.log(ev.target as HTMLInputElement)
    this.themeService.selectTheme(parseInt((ev.target as HTMLInputElement).value))
  }

}
