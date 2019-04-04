import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Store } from '@ngrx/store';
import { PrincipalState } from './shared/principal.state';
import { SAVE_PRINCIPAL } from './shared/save.principal.action';
import { Url } from './shared/url';


@Injectable()
export class AppService {
  response ; 
  authenticated: boolean = false;

  constructor(private http: HttpClient,
      private cookieService: CookieService, 
      private store :Store<PrincipalState> ) { }
url :Url ; 

  authenticate(credentials, callback) {
    console.log('erreur maybe') ; 
    if(credentials){
      let user = credentials.username ; 
      const token = btoa(credentials.username + ':' + credentials.password);
      this.cookieService.set('token',token);
      this.http.get(this.url.rootUrl+'api/user').subscribe(response => {
         if (response && response['name']) {
           console.log("erreur lena fi west serice") ; 
            console.log(response);
            //this.response=response; 
            this.authenticated = true;
            //on met le principal dans le store 
            this.store.dispatch({
              type : SAVE_PRINCIPAL , 
              payload : response
            }) ; 
            let key = 'username';
             localStorage.setItem(key, user); 
          } else {
              this.authenticated = false;
          }
          return callback && callback();
      });
    }
    else {
      this.authenticated = false;
    }
  }

  logout(callback){
    this.authenticated = false;
    return callback && callback();
  }

}
