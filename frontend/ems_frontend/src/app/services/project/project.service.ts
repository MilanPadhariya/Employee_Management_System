import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';


@Injectable({
  providedIn:'root'
})

export class ProjectService {
  constructor(private http:HttpClient){}

  baseUrl='http://localhost:4000/api/';
  getMyProjects():Observable<any>{
    console.log("in getMyProject service");
    return this.http.get(`${this.baseUrl}user/myProjects`)
    .pipe(
      tap(_=>this.log('fetched MyProjects')),
      catchError(this.handleError<any>('getMyProjects',[]))
    )
  }

  getAllProjects():Observable<any>{
    console.log("in getMyProject service");
    return this.http.get(`${this.baseUrl}project`)
    .pipe(
      tap(_=>this.log('fetched all Projects')),
      catchError(this.handleError<any>('getAllProjects',[]))
    )
  }

  getProject(id:string|null):Observable<any>{
    return this.http.get(`${this.baseUrl}project/details/${id}`)
  }

  addProject(data:any):Observable<any>{
    console.log("in addProject service");
    return this.http.post(`${this.baseUrl}project`,data)
    .pipe(
      tap(_=>this.log('added Project')),
      catchError(this.handleError<any>('AddProject',[]))
    )
  }

  addEmployee(data:any):Observable<any>{
    console.log("in addEmployee service",data.employee);
    return this.http.post(`${this.baseUrl}project/module/assign/${data.module}`,{"employeeID":data.employee});
  }

  addModule(projectId:string,moduleName:string):Observable<any>{
    let modulesarray=[];
    modulesarray.push(moduleName);
    return this.http.post(`${this.baseUrl}project/add-module/${projectId}`,{modules:modulesarray});
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
