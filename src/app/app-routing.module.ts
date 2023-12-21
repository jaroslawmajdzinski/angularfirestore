import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginReactiveComponent } from './components/login-reactive/login-reactive.component';
import { UploadComponent } from './components/firebase/upload/upload.component';
import { FilesmanagementComponent } from './components/firebase/filesmanagement/filesmanagement.component';

const routes: Routes = [
  {path: "", redirectTo: "/login", pathMatch: "full"},
  {path: "login", component: LoginReactiveComponent},
  {path: "register", component: LoginReactiveComponent},
  {path: "fileupload", component: UploadComponent},
  {path: "files", component: FilesmanagementComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
