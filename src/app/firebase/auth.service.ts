import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { MatDialog } from '@angular/material/dialog';
import { Route, Router } from '@angular/router';
import { BehaviorSubject, exhaustMap, tap, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _user$ = new BehaviorSubject<any | null>(null)

  constructor(private _afAuth: AngularFireAuth, public dialog: MatDialog, private _router: Router) {

    this._afAuth.authState.pipe(
      tap(user=>{
        if(user){
          console.log('user', user)
          localStorage.setItem('userData', JSON.stringify(user))
          this._user$.next(user)
          this._router.navigate(['/files'])
        } else {
          localStorage.removeItem('userData')
          this._user$.next(null)
          this._router.navigate(['/login'])
        }
      })
    ).subscribe()

   }


   signIn(email: string, password: string){
    return this._afAuth.signInWithEmailAndPassword(email, password).then()
   }

   signUp(email: string, password: string){
    return this._afAuth.createUserWithEmailAndPassword(email, password).then()
   }

   logout(){
    this._afAuth.signOut().then(()=>{
      
    })
   }

   getUserData$(){
    return this._user$
   }

   isLoggedIn$(){
    return this._user$.pipe(
      exhaustMap(user=>{
        if(user){
          return of(true)
        }else{
          return of(false)
        }
       
      })
    )
   }

}

