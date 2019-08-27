import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http"


@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  baseUrl: string = "http://127.0.0.1:9003";
  constructor(private http: HttpClient) { }

  saveUser(data: any){
    console.log('sas');
    
    return this.http.post<any>(this.baseUrl + "/user/save/", data, {
      headers: new HttpHeaders().set('Authorization', 'Ankush')
    })
    .pipe(map((resp) => {
        return resp;
    }));
  }

  getUserList(){
    return this.http.get<any>(this.baseUrl + "/user/userlist/", {
      headers: new HttpHeaders().set('Authorization', 'Ankush')
    })
    .pipe(map((resp) => {
      return resp;
    }));
  }

  getDaysList(month:any){
    return this.http.get<any>(this.baseUrl + "/user/dayslist/", {
      headers: new HttpHeaders().set('Authorization', 'Ankush'),
      params: new HttpParams().append('month', month)
    })
  }

  saveTimeSheetData(data:any){
    return this.http.post<any>(this.baseUrl + "/user/save/timesheet/", data, {
      headers: new HttpHeaders().set('Authorization', 'Ankush')
    })
  }

  getOverallTimeDiff(month:any){
    return this.http.get<any>(this.baseUrl + "/user/overall/timediff/", {
      headers: new HttpHeaders().set('Authorization', 'Ankush'),
      params: new HttpParams().append('month', month)
    })
  }

}
