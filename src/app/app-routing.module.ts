import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginReactiveComponent } from './components/login-reactive/login-reactive.component';

import { ManagementComponent } from './components/firebase/management/management.component';


const routes: Routes = [
  {path: "", redirectTo: "/login", pathMatch: "full"},
  {path: "login", component: LoginReactiveComponent},
  {path: "register", component: LoginReactiveComponent},
  {path: "files", component: ManagementComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
