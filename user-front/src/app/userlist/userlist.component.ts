import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../__services/user-service.service'

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {
  userList: any;

  constructor(private us: UserServiceService) { }

  ngOnInit() {
    this.getUserListData();

  }

  getUserListData(){
    this.us.getUserList().subscribe(resp => {
      if(resp.status = 'success')
      {
        this.userList = resp.data;
      }      
    },
    error => {

    });
  }

}
