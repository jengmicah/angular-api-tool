import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NavigationComponent } from './navigation/navigation.component';
import { FirstComponent } from './first/first.component';
import { SecondComponent } from './second/second.component';
import { VideoComponent } from './video/video.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { AddComponent } from './add/add.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { NgJsonEditorModule } from 'ang-jsoneditor';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    FirstComponent,
    SecondComponent,
    VideoComponent,
    AddComponent
  ],
  imports: [
    FontAwesomeModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatListModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    NgJsonEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
