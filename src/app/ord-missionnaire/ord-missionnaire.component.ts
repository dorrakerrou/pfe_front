import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormArray, FormBuilder,Validators,ReactiveFormsModule  } from '@angular/forms';
import { MissionnaireService } from '../services/missionnaire.service';
import { missionnaire } from '../models/missionnaire';
import { mission } from '../models/mission';
import { ordMiss } from '../models/Ord_Miss';
import { MissionService } from '../services/mission.service';

@Component({
  selector: 'app-ord-missionnaire',
  templateUrl: './ord-missionnaire.component.html',
  styleUrls: ['./ord-missionnaire.component.css']
})
export class OrdMissionnaireComponent implements OnInit {
  cin: string = '';
  existe : Boolean ; 
  OrdMissForm :FormGroup ; 
  missionnare : missionnaire ; 
  nom: String ='' ; 
  prenom : String ='' ; 
  Date_depart :Date ; 
  Date_arrivee:Date ; 
  ordmiss : ordMiss ; 
  num_ordMiss:number ; 
  num_miss :String ; 
  cod : String ;
  @Input()
  date_debut ; 
  constructor(private fb : FormBuilder , private missionService : MissionService) { 

    this.OrdMissForm = this.fb.group({
      cin: ['',Validators.required],
      datarrP: ['',Validators.required],
      datdepP: ['',Validators.required],
      code : ['',Validators.required],
      num_mission:['',Validators.required] , 
      num_ordMiss : ['',Validators.required]


    }) ; 
  }
  add(){
    const m = this.OrdMissForm.value ;
    alert(JSON.stringify(m));
    this.missionService.addOrdMiss(m).subscribe(
      res => {
        this.ordmiss=res ; 
          console.log("donne") ;   
         },
         error=>{console.log("erreur");}    
    )
  }

  Search(cin)
  {this.existe=true ; 
   /* return this.missService.getOneMiss(cin).subscribe(
      data => { 
        if (data && data['cin']) {
        this.missionnare=data ; 
        this.nom = this.missionnare.nom ; 
        this.prenom  = this.missionnare.prenom ; 
       // this.Date_arrivee=this.date_debut ; 
        console.log(this.Date_arrivee) ;
       // this.Date_depart=this.mission.date_fin ; 
        console.log(this.nom , this.prenom ,missionnaire) ; 
        console.log('lkitou el cin') ; 
        this.existe=true ; 
      }
     else 
     this.existe=false ; },
      error => {console.log(error); 
     } , 
      () => {console.log('loading classes was done ')}
    )*/
  }
    go(){
      this.cin='' ; 
    }
    
  ngOnInit() {
    this.num_miss = localStorage.getItem('num_mission') ; 
    this.num_ordMiss=1;

    var DeptGenVal = localStorage.getItem('deptGen') ; 
    var data = JSON.parse(DeptGenVal) ; 
    console.log('retrievedObject: ',data.code) ;
    this.cod=data.code ;

  }

}
