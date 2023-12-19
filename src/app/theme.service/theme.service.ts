import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
import {ITailwindTheme} from './theme.interfaces'
import {  updateThemeVariables } from './theme.utils';
import { catchError, tap } from 'rxjs/operators';
import { Observable,EMPTY } from 'rxjs';
@Injectable()
export class TailwindThemeService {
  constructor(
    private _http: HttpClient,
    @Inject(DOCUMENT) private readonly document: Document,
   
  ) {}
loadConfig(configUrl = './assets/theme.config.json'): Observable<any> {
    
    return this._http
      .get(`${configUrl}`)
      .pipe(
          tap((themeData)=>{
            updateThemeVariables(themeData as ITailwindTheme, this.document);
          }),
          catchError(() =>{
            console.error('There was an error while loading the Tailwind Theme. ')
            return EMPTY
          })
        )
       
      
  }
}