import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
 
 
  constructor(private http: HttpClient) {
  }

  getDept(cin:String):Observable<any> 
  {console.log("belek 8alta lena ") ;
    return this.http.get('http://localhost:8080/api/DeptOfUsername?username='+cin) ; 
  }



}
