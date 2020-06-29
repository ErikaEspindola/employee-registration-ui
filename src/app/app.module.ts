import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './users/login/login.component';
import { MaterialModule } from './material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ListComponent } from './employees/list/list.component';
import { HeaderComponent } from './employees/header/header.component';
import { DetailComponent } from './employees/detail/detail.component';
import { AddComponent } from './employees/add/add.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { HttpClientModule } from '@angular/common/http';
import { NgxMaskModule } from 'ngx-mask'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListComponent,
    HeaderComponent,
    DetailComponent,
    AddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
    HttpClientModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
