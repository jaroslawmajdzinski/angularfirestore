import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "./firebase/auth.service";
import { concatMap, map, of } from "rxjs";

export function authGuard(): CanActivateFn{
   return ()=>{
    const authService = inject(AuthService)
    const router = inject(Router)
    console.log('guard')
    return authService.getUserData$().pipe(
      concatMap(user=>{
        console.log('guard', user)
        if(user!==null) return of(true)
        router.navigate(["/login"])
        return of(false)
      })
    )
    }
}
