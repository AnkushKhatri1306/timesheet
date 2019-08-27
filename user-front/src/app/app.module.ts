import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserServiceService } from './__services/user-service.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TimesheetComponent } from './timesheet/timesheet.component';
import { UserlistComponent } from './userlist/userlist.component'

@NgModule({
  declarations: [
    AppComponent,
    UserFormComponent,
    TimesheetComponent,
    UserlistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [UserServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
