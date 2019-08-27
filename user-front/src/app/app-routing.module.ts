import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserlistComponent } from './userlist/userlist.component'
import { UserFormComponent } from './user-form/user-form.component';
import { TimesheetComponent } from './timesheet/timesheet.component';

const routes: Routes = [
  { path: 'user-list', component: UserlistComponent },
  { path: 'add-user', component: UserFormComponent },
  { path: 'timesheet', component: TimesheetComponent },
  { path: '',  redirectTo: '/user-list', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
