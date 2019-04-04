import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder,Validators,ReactiveFormsModule  } from '@angular/forms';
import { MissionService } from '../services/mission.service';
import { mission } from '../models/mission';
import { Motcle } from '../models/Motcle';

@Component({
  selector: 'app-mission',
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.css']
})
export class MissionComponent implements OnInit {
mission: mission ; 
 cod : String ;
codeMission : String ; 
  missionForm:FormGroup;
  date_debut:Date ; 
  currentYea: number;
  strr : String ; 
  motcles : Motcle [];
  d:Date = new Date() ; 
  year : number = this.d.getFullYear() ; 
  y:String = this.year.toString().substr(2,2) ; 
 
  constructor(private fb : FormBuilder , private missionService: MissionService) { 
    this.createForm() ; 
    this.currentYea = (new Date()).getFullYear() ;
   }
   
   loadMotcle()
   {this.missionService.getMotcle().subscribe(
     data => { this.motcles=data;},
     error => {console.log(error); } , 
     () => {console.log('loading motcles was done ')}
   )}



  ngOnInit() {
    this.mission=new mission() ; 
    this.currentYea = (new Date()).getFullYear() ; 
    this.strr=this.currentYea.toString() ;
    this.loadMotcle() ;
    var DeptGenVal = localStorage.getItem('deptGen') ; 
    var data = JSON.parse(DeptGenVal) ; 
    console.log('retrievedObject: ',data.code) ;
    this.cod=data.code ;
    console.log('cod'+this.cod) ;  
    console.log('d'+this.d) ; 
    console.log('year'+this.year) ; 
    console.log('y'+this.y) ; 
    this. reloadCode() ; 
  }
  createForm()
  {
    console.log('creation form') ; 
    this.missionForm = this.fb.group({
      numMission:['',Validators.required],
      code :['',Validators.required]  , 
      objeta: ['',Validators.required],
      objetl: ['',Validators.required],
      datdepP: ['',Validators.required],
      datarrP : ['',Validators.required],
     // motcle :  ['',Validators.required] , 
  });
  }
  add(){
    const m = this.missionForm.value ;
    alert(JSON.stringify(m));
    this.missionService.addMission(m).subscribe(
      res => {
        this.mission=res ; 
          console.log("donne") ;   

          let key = 'num_mission';

          localStorage.setItem(key, JSON.stringify(this.codeMission));
  
         },
         error=>{console.log("erreur");}    
    )
  }
  reloadCode(){
this.missionService.getLatestMissionCode(this.cod).subscribe(
  d=>{
    if((d==null) || (d==undefined) || (d.length ==0 ))
    {
      this.codeMission=this.y+"0001" ; 
      console.log('codeMissioNLOad'+this.codeMission) ; 

    }
    else 
    {
      this.codeMission=(Number(d)+1)+"" ;
      console.log('codeMissioNLOad'+this.codeMission) ; 

    }

  }) ; 
}
}
