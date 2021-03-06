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
import { AppDateAdapter, APP_DATE_FORMATS } from './app-date-adapter.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ContractComponent } from './volunteer/contract/contract.component';
import { DocumentComponent } from './volunteer/document/document.component';
import { ExpenseComponent } from './volunteer/expense/expense.component';
import { VolunteeringHoursComponent } from './volunteer/volunteering-hours/volunteering-hours.component';
import { VolunteerAddComponent } from './volunteer/volunteer-add/volunteer-add.component';
import { VolunteerInfoComponent } from './volunteer/volunteer-info/volunteer-info.component';
import { VolunteerOverviewComponent } from './volunteer/volunteer-overview/volunteer-overview.component';
import { VolunteerEditComponent } from './volunteer/volunteer-edit/volunteer-edit.component';
import { ContractAddEditComponent } from './volunteer/contract/contract-add-edit/contract-add-edit.component';
import { VolunteeringHoursAddEditComponent } from './volunteer/volunteering-hours/volunteering-hours-add-edit/volunteering-hours-add-edit.component';
import { ExpenseAddEditComponent } from './volunteer/expense/expense-add-edit/expense-add-edit.component';
import { DocumentAddEditComponent } from './volunteer/document/document-add-edit/document-add-edit.component';


@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    VolunteerTable,
    VolunteerAddComponent,
    NotFoundComponent,
    VolunteerInfoComponent,
    VolunteerOverviewComponent,
    VolunteerEditComponent,
    ContractComponent,
    DocumentComponent,
    ExpenseComponent,
    VolunteeringHoursComponent,
    ContractAddEditComponent,
    VolunteeringHoursAddEditComponent,
    ExpenseAddEditComponent,
    DocumentAddEditComponent
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
  bootstrap: [AppComponent],
  entryComponents: [
    ContractAddEditComponent,
    VolunteeringHoursAddEditComponent,
    ExpenseAddEditComponent,
    DocumentAddEditComponent
  ]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);