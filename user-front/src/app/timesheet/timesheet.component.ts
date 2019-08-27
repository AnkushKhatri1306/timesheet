import { Component, OnInit } from '@angular/core';
import { UserServiceService } from "../__services/user-service.service";

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css']
})
export class TimesheetComponent implements OnInit {

  constructor(private us:UserServiceService) { }
  dayslist:any;
  currentTimeData:any;
  openPopup: boolean = false; 
  unableClear: boolean = false; 
  accessAllowed: boolean = false; 
  hourList: Array<number> = [];
  minuteList: Array<number> = [];
  overallDiff:any;

  ngOnInit() {   
    this.getDaysList(null);
    this.makeHourDayList();
  }

  checkPassword(pass:any){
    if(pass == 'terror'){
      this.accessAllowed = true;
    }
  }

  makeHourDayList(){
    for(var i=0; i<60; i++){
      this.minuteList.push(i);
      if(i<24){
        this.hourList.push(i);
      }
    }
    console.log('min', this.minuteList);
    console.log('hour', this.hourList);
    
  }

  getDaysList(month:number){    
      this.us.getDaysList(month).subscribe(resp => {
          if(resp.status = 'success'){
            console.log('dayslist', resp.data);
            this.dayslist = resp.data;
            this.getTimeDifference(null);
          }
      },
      error => {

      });
  }

  editTimeSheetPopup(data:any){
    console.log('data', data);
    this.currentTimeData = {...data};
    this.openPopup = true;

  }

  clearTimeSheetData(dayData:any){
    console.log('clea', dayData);
    dayData.entry_time = null
    dayData.exit_time = null
    this.us.saveTimeSheetData(dayData).subscribe(resp => {
      if(resp.status == "success"){
          console.log('Cleared successfully');
          this.getDaysList(null);

      }
    },
    error => {

    });
  }

  getTimeDifference(month:any){
    this.us.getOverallTimeDiff(month).subscribe(resp => {
      if(resp.status == "success"){
        this.overallDiff = resp.data.total_diff;
      }
    },
    error => {

    });
  }

  saveTimeSheet(){
    this.us.saveTimeSheetData(this.currentTimeData).subscribe(resp => {
      if(resp.status == 'success'){
        console.log("Time Sheet save successfully .");
        this.openPopup = false;
        this.getDaysList(null);
      }
    },
    error => {

    });
  }

}
