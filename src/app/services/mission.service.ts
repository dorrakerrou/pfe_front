import { Injectable } from '@angular/core';
import { mission } from '../models/mission';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ordMiss } from '../models/Ord_Miss';

@Injectable({
  providedIn: 'root'
})
export class MissionService {
  readonly Url='http://localhost:8080/mission_cni-1.0.1-SNAPSHOT/api/mission/add' ;
  readonly url = 'http://localhost:8080/mission_cni-1.0.1-SNAPSHOT/api/mission/getall' ; 
missions : mission[];
  constructor(private http : HttpClient) {

   }
  addOrdMiss(o : ordMiss)    : Observable<any> {
    
    return this.http.post('http://localhost:8080/mission_cni-1.0.1-SNAPSHOT/api/addordMiss',o  ) ; 
  }
  
  addMission( mission : mission) : Observable<any>{
    console.log('el service') ; 
    return this.http.post(this.Url ,mission  ) ; 
  }
  getMotcle():Observable<any> 
  {
    return this.http.get('http://localhost:8080/mission_cni-1.0.1-SNAPSHOT/api/allMotcle') ; 
  }

  getLatestMissionCode(code : String) :Observable<any>{
    return this.http.get('http://localhost:8080/mission_cni-1.0.1-SNAPSHOT/api/mission/latestMissionCode?codeDept='+code) ; 
  }
}
