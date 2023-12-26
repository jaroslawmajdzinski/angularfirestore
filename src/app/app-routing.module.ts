import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginReactiveComponent } from './components/login-reactive/login-reactive.component';
import { UploadComponent } from './components/firebase/upload/upload.component';
import { FilesmanagementComponent } from './components/firebase/filesmanagement/filesmanagement.component';
import { ManagementComponent } from './components/firebase/management/management.component';

const routes: Routes = [
  {path: "", redirectTo: "/login", pathMatch: "full"},
  {path: "login", component: LoginReactiveComponent},
  {path: "register", component: LoginReactiveComponent},
  {path: "fileupload", component: UploadComponent},
  {path: "files", component: ManagementComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
