import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatDialog } from '@angular/material/dialog';
import {  Router } from '@angular/router';
import { BehaviorSubject, tap, of, from, concatMap, map} from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _user$ = new BehaviorSubject<any | null>(null)

  constructor(private _afAuth: AngularFireAuth, public dialog: MatDialog, private _router: Router) {

    this._afAuth.authState.pipe(
      tap(user=>{
          
        if(user){
          localStorage.setItem('userData', JSON.stringify(user))
        if(user.emailVerified){  
           this._user$.next(user)
           this._router.navigate(['/files'])
        }
        } else {
          localStorage.removeItem('userData')
          this._user$.next(null)
          this._router.navigate(['/login'])
        }
      })
    ).subscribe()

   }

   

   signIn(email: string, password: string){
    return from(this._afAuth.signInWithEmailAndPassword(email, password)).pipe(
      map(result=>result.user)
    )
   }

   sendVeryficationMail(){
     return from(this._afAuth.currentUser
        .then(u=>u?.sendEmailVerification())
        .then(_=>{

        }))
      }

   forgotPassword(email: string){
    return this._afAuth.sendPasswordResetEmail(email).then(_=>{

    }).catch(err=>{
      console.error(err.message)
    })
   }    

   signUp(email: string, password: string){
    return from(this._afAuth.createUserWithEmailAndPassword(email, password)).pipe(
      concatMap(res=>{
        if(res.user) return this.sendVeryficationMail().pipe(map(_=>res.user))
        return of(null)
      })
    )
      
    }
    
   logout(){
    this._afAuth.signOut().then(()=>{
      
    })
   }

   getUserData$(){
    return this._user$
   }
}

