import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { AppComponent } from './app.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatNativeDateModule, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { MyCustomMaterialModuleModule } from './my-custom-material-module/my-custom-material-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { VolunteerTable } from './volunteer/volunteer-table';
import { AppRoutingModule } from './/app-routing.module';
import { VolunteerAddComponent } from './volunteer-add/volunteer-add.component';
import { AppDateAdapter, APP_DATE_FORMATS } from './app-date-adapter.component';
import { NotFoundComponent } from './not-found/not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    VolunteerTable,
    VolunteerAddComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    MyCustomMaterialModuleModule,
    CommonModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: DateAdapter, useClass: AppDateAdapter
    },
    {
      provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);