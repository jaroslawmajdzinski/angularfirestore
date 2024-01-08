import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import { MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { MatToolbarModule} from '@angular/material/toolbar'
import { MatSidenavModule} from '@angular/material/sidenav'
import { MatIconModule} from '@angular/material/icon'
import {MatListModule} from '@angular/material/list'
import {MatProgressBarModule} from '@angular/material/progress-bar'
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import {MatRadioModule} from '@angular/material/radio';
import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatProgressBarModule,
    MatGridListModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    MatRadioModule,
    MatExpansionModule
   ],exports:[
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatProgressBarModule,
    MatGridListModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    MatRadioModule,
    MatExpansionModule
    
  ]
})
export class MaterialModule { }
