import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VolunteerTable } from './volunteer/volunteer-table';
import { NotFoundComponent } from './not-found/not-found.component';
import { DocumentComponent } from './volunteer/document/document.component';
import { ContractComponent } from './volunteer/contract/contract.component';
import { VolunteeringHoursComponent } from './volunteer/volunteering-hours/volunteering-hours.component';
import { ExpenseComponent } from './volunteer/expense/expense.component';
import { VolunteerAddComponent } from './volunteer/volunteer-add/volunteer-add.component';
import { VolunteerInfoComponent } from './volunteer/volunteer-info/volunteer-info.component';
import { VolunteerEditComponent } from './volunteer/volunteer-edit/volunteer-edit.component';


const routes: Routes = [
  { path: 'volunteers', component: VolunteerTable },
  { path: 'addVolunteer', component: VolunteerAddComponent },
  {
    path: 'volunteerInfo/:id', component: VolunteerInfoComponent,
    children: [
      { path: '', redirectTo: 'edit', pathMatch: 'full' },
      { path: 'edit', component: VolunteerEditComponent },
      { path: 'documents', component: DocumentComponent },
      { path: 'contracts', component: ContractComponent },
      { path: 'volunteering-hours', component: VolunteeringHoursComponent },
      { path: 'expenses', component: ExpenseComponent }
      // { path: '**', redirectTo: 'notFound'}
    ]
  },
  { path: 'notFound', component: NotFoundComponent },
  { path: '', redirectTo: '/volunteers', pathMatch: 'full' },
  { path: '**', redirectTo: '/notFound' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
