import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { ManagementComponent } from './components/firebase/management/management.component';
import { authGuard } from './auth.guard';
import { LoginReactiveNewComponent } from './components/login-reactive-new/login-reactive.component';


const routes: Routes = [
  {path: "", redirectTo: "/login", pathMatch: "full"},
  {path: "login", component: LoginReactiveNewComponent},
  {path: "register", component: LoginReactiveNewComponent},
  {path: "files", component: ManagementComponent, canActivate: [authGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
