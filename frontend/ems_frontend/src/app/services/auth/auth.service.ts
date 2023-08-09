import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, catchError, throwError } from 'rxjs';
import {map} from 'rxjs/operators';
import { Router } from '@angular/router';

import { baseUrl } from 'src/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private http:HttpClient, public router:Router) { }
  
  headers=new HttpHeaders().set('Content-Type', 'application/json');
  
  login(data:any):Observable<any>{
    return this.http.post(`${baseUrl}user/login`, data);
  }

  getUserProfile(id:any):Observable<any>{
    return this.http.get(`${baseUrl}user/user-profile/${id}`,{headers:this.headers}).pipe(
      map((res:any)=>{
        localStorage.setItem('username',res.user.name);
        localStorage.setItem('profileImgUrl',res.user.profileImg);
        localStorage.setItem('userId',res.user.emp_id);
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  private _userDetailSource = new Subject<any>();

  userDetail$=this._userDetailSource.asObservable();

  sendUserDetail(userData: any) {
    this._userDetailSource.next(userData);
  }

  profileImageUrl$=new Subject<string>();

  getCurrentUserName():any{
    if(localStorage.getItem('username')){
      return localStorage.getItem('username');
    }
  }

  getCurrentUserProfileImg():any{
    if(localStorage.getItem('profileImgUrl')){
      console.log("Image URL: " + localStorage.getItem('profileImgUrl'));
      return localStorage.getItem('profileImgUrl')
    }
  }

  upload(file:File):Observable<any> {
  
    // Create form data
    const formData = new FormData(); 
      
    // Store form name as "file" with file data
    formData.append("myFile", file, file.name);
      
    // Make http post request over api
    // with formData as req
    return this.http.post(`${baseUrl}user/uploadfile`, formData)
}

  getToken(){
    return localStorage.getItem('access_token');
  }

  isLoggedIn():boolean{
    let authToken=localStorage.getItem('access_token');
    return authToken!==null ? true : false;
  }

  logout(){
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['login']);
    }
  }

  handleError(error:HttpErrorResponse){
    console.log(error);
    let msg={};
    return throwError(msg);
  }
  
}
