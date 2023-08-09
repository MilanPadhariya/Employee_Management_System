import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  constructor(private httpClient:HttpClient) {}
  baseUrl='http://localhost:4000/api/'

  getAllTeams(): Observable<any>{
    return this.httpClient.get(`${this.baseUrl}team`);
  }
}
