import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VolunteerTable } from './volunteer/volunteer-table';
import { VolunteerAddComponent } from './volunteer-add/volunteer-add.component';
import { NotFoundComponent } from './not-found/not-found.component';


const routes: Routes = [
  { path: 'volunteers', component: VolunteerTable },
  { path: 'addVolunteer', component: VolunteerAddComponent },
  { path: 'notFound', component: NotFoundComponent},
  { path: '', redirectTo: '/volunteers', pathMatch: 'full' },
  { path: '**', redirectTo: '/notFound'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
