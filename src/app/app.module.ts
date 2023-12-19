import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {  Observable } from 'rxjs';
import { TailwindThemeService } from './theme.service/theme.service';
import { ButtonDirective } from './components/elements/style.directives/button.directive';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NavbuttonComponent } from './components/navbar/navbutton/navbutton.component';
import { AngularFireModule} from '@angular/fire/compat'
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import {  AngularFirestoreModule} from '@angular/fire/compat/firestore'
import { environment } from './firebase/firebase';
import { FirebaseOptions } from '@angular/fire/app';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginReactiveComponent } from './components/login-reactive/login-reactive.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageDialogComponent } from './components/message-dialog/message-dialog.component';
import { MaterialModule } from './material/material/material.module';
import { NavmenuComponent } from './components/navbar/navmenu/navmenu.component';
import { UploadComponent } from './components/upload/upload.component';
import {provideStorage, getStorage} from '@angular/fire/storage'

function initializeAppFactory(themeService: TailwindThemeService): () => Observable<any> {
  return () => themeService.loadConfig()
 }


@NgModule({
  declarations: [
    AppComponent,
    ButtonDirective,
    NavbarComponent,
    NavbuttonComponent,
    LoginReactiveComponent,
    MessageDialogComponent,
    NavmenuComponent,
    UploadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase as FirebaseOptions),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    provideStorage(()=>getStorage()),
    BrowserAnimationsModule
  ],
  providers: [TailwindThemeService,{
    provide: APP_INITIALIZER,
    useFactory: initializeAppFactory,
    deps: [TailwindThemeService],
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }


