import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
import { IOneTailwindTheme, ITailwindTheme } from './theme.interfaces';
import { updateThemeVariables } from './theme.utils';
import { catchError, tap } from 'rxjs/operators';
import { Observable, EMPTY } from 'rxjs';
@Injectable()
export class TailwindThemeService {
  
  private _themesConfig!: IOneTailwindTheme[];

  private _currThemeName!: string;
  private _colorMode!: string

  constructor(
    private _http: HttpClient,
    @Inject(DOCUMENT) private readonly document: Document
  ) {}
  loadConfig(configUrl = './assets/theme.json'): Observable<any> {
    return this._http.get(`${configUrl}`).pipe(
      tap((themeData) => {
        this._themesConfig = [...themeData as IOneTailwindTheme[]]
        const currThemeColors = this.checkSavedTheme(themeData as IOneTailwindTheme[]); 
        if (currThemeColors) {
          updateThemeVariables(currThemeColors, this.document);
        }
      }),
      catchError(() => {
        console.error('There was an error while loading the Tailwind Theme. ');
        return EMPTY;
      })
    );
  }

  checkSavedTheme(themeData: IOneTailwindTheme[]) {
    const themeName = localStorage.getItem('theme');
    if (themeName) {
      const colorConfig = JSON.parse(themeName);
      this.setColorMode(colorConfig.mode)
      this._currThemeName = colorConfig.name
      return themeData.find(item=>item.name===this._currThemeName)?.colors 
    }
    this.setColorMode('light')
    this._currThemeName = themeData[0].name
    return themeData[0].colors
  }

  setColorMode(mode: string){
    this.document.body.classList.remove(this._colorMode)
    this.document.body.classList.add(mode)
    this._colorMode = mode
  }

  toogleColorMode(){
    this.document.body.classList.remove(this._colorMode)
    this._colorMode =  this._colorMode==='dark'? 'light' : 'dark'
    this.document.body.classList.add(this._colorMode)
    this.saveThemeName()
  }

  selectTheme(idx: number){
    this._currThemeName = this._themesConfig[idx].name
    updateThemeVariables(this._themesConfig[idx].colors, this.document);
    this.saveThemeName()
  }

  saveThemeName() {
    localStorage.setItem('theme', JSON.stringify({ name: this._currThemeName, mode: this._colorMode }));
  }

  getCurrThemeNameAndMode() {
    return {name: this._currThemeName, mode: this._colorMode};
  }

  getThemesList() {
    return this._themesConfig;
  }
}


