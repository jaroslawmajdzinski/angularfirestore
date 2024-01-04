import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { ManagementComponent } from './components/firebase/management/management.component';
import { authGuard } from './auth.guard';
import { LoginReactiveComponent } from './components/login-reactive/login-reactive.component';
import { VerifyaccountComponent } from './components/verifyaccount/verifyaccount.component';


const routes: Routes = [
  {path: "", redirectTo: "/login", pathMatch: "full"},
  {path: "login", component: LoginReactiveComponent},
  {path: "register", component: LoginReactiveComponent},
  {path: "files", component: ManagementComponent, canActivate: [authGuard]},
  {path: "verify", component: VerifyaccountComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
