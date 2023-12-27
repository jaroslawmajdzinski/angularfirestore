import { inject } from "@angular/core";
import { CanActivateFn } from "@angular/router";
import { AuthService } from "./firebase/auth.service";
import { map } from "rxjs";

export function authGuard(): CanActivateFn{
   return ()=>{
    const authService = inject(AuthService)
    return authService.getUserData$().pipe(
      map(user=>{
        if(user) return true
        return false
      })
    )
    }
}
