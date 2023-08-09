import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap,map, Subject, BehaviorSubject, subscribeOn } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LeaveService{
  constructor(private http: HttpClient){
    this.getInitialValue();
  }

  baseUrl='http://localhost:4000/api/'
  getLeaves():Observable<any>{
    console.log("in get leaves service");
    return this.http.get(`${this.baseUrl}leave`)
    .pipe(
      tap(_=>this.log('fetched leaves')),
      catchError(this.handleError<any>('getLeaves',[]))
    )
  }

  getInitialValue():void{
    this.getLeavedForAppoval().subscribe(res=>{
      this.leaveNotification$.next(res.data.length);

    })
  }

  leaveNotification$=new BehaviorSubject<number>(0);



  addLeaves(data:any):Observable<any>{
    console.log("in add leaves service:",data);
    const stDate=data.stDate;
    const enDate=data.enDate;
    const formatedData={
      "st_date":`${stDate.year}-${stDate.month}-${stDate.day}`,
      "end_date":`${enDate.year}-${enDate.month}-${enDate.day}`
    }
    return this.http.post(`${this.baseUrl}leave`,formatedData)
    .pipe(
      tap(_=>this.log('added a leave')),
      catchError(this.handleError<any>('addLeaves',[]))
    )
  }

  getLeavedForAppoval():Observable<any>{
    console.log("in get leave for approval service::::::::::::");
    return this.http.get(`${this.baseUrl}leave/approve`)
    .pipe(
      tap(_=>this.log('fetched leaves to be approved')),
      catchError(this.handleError<any>('getApprovalLeaves',[]))
    )
  }

  leaveAction(data:any,id:String):Observable<any>{
    console.log("in leave action service");
    return this.http.post(`${this.baseUrl}leave/approve/${id}`,data)
    .pipe(
      tap(_=>this.log('sent leave approval response')),
      catchError(this.handleError<any>('approveLeave',[]))
    )
  }

  /**
  * Handle Http operation that failed.
  * Let the app continue.
  *
  * @param operation - name of the operation that failed
  * @param result - optional value to return as the observable result
  */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
    };
  }

  private log(message: string){
    console.log(message);
  }
}
