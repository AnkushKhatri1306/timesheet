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
  sheetDate:any;

  ngOnInit() {       
    this.sheetDate = new Date().toISOString().substring(0, 7);
    this.getDaysList(this.sheetDate);
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
    
  }

  getDaysList(month:number){    
      this.us.getDaysList(month).subscribe(resp => {
          if(resp.status = 'success'){
            this.dayslist = resp.data;
            this.getTimeDifference(this.sheetDate);
          }
      },
      error => {

      });
  }

  editTimeSheetPopup(data:any){
    this.currentTimeData = {...data};
    this.openPopup = true;

  }

  clearTimeSheetData(dayData:any){
    dayData.entry_time = null
    dayData.exit_time = null
    this.us.saveTimeSheetData(dayData).subscribe(resp => {
      if(resp.status == "success"){
          console.log('Cleared successfully');
          this.getDaysList(this.sheetDate);

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
        this.getDaysList(this.sheetDate);
      }
    },
    error => {

    });
  }

  getDataForMonth(){
    this.getDaysList(this.sheetDate);
  }

  updateExitTime(){
    if(this.currentTimeData.entry_time){
      let d = new Date();
      let entry_hr = this.currentTimeData.entry_time.substring(0,2);
      let entry_min = this.currentTimeData.entry_time.substring(3, 5);                                    
      d.setHours(entry_hr, entry_min);
      d.setHours(d.getHours()+14, d.getMinutes()+45);                  
      this.currentTimeData.exit_time = d.toISOString().substring(11,16);;                
    }
  }

}
