import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(public http:HttpClient) { }

  baseUrl='http://localhost:4000/api/';

  getAllEmployees(): Observable<any>{
    return this.http.get(`${this.baseUrl}user`);
  }

  addUser(data:any):Observable<any>{
    const formatedData={
      name:data.name,
      gender:data.gender,
      date_of_birth:`${data.dob.year}-${data.dob.month}-${data.dob.day}`,
      phone_number:data.phonenumber,
      email_id:data.email,
      role:data.role,
      password:data.password,
      team_id:data.team
    }
    return this.http.post(`${this.baseUrl}user`,formatedData);
  }

  addUserSkill(data:string[]):Observable<any>{
    return this.http.post(`${this.baseUrl}user/addskill`,{skills:data});
  }
}
