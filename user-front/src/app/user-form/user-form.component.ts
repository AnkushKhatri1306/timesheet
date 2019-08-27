import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../__services/user-service.service';


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  user: object = {}
  constructor(private us: UserServiceService) { }

  ngOnInit() {
  }

  saveUser(){
    console.log(this.user);
    this.us.saveUser(this.user).subscribe(resp => {
        console.log('success', resp);
    },
    error => {

    });
  }
}
