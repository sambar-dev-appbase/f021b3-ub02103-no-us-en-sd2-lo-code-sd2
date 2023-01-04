import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { strategyApiUrl,userLoginApiUrl } from './pages/url.constants';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


export type InternalStateType = {
  [key: string]: any
};

@Injectable()
export class AppState {
  _state: InternalStateType = {};
  //private dataLogUrl = '/apis/logout.php';
  //private dataLogUrl          = strategyApiUrl + '/ua6-no-us-en-sd2-lo-api/api/get-user-logged-out.php';
  private dataLogUrl          = strategyApiUrl + '/upel0318-no-us-en-sd2-lo-api/v1/api/user-logout-user-event-log-02409.php';
  private analystdataLogUrl          = strategyApiUrl + '/analyst-profile-event-log-api/api/get-user-logged-out.php';
  constructor(private http: Http) { }

  // already return a clone of the current state
  get state() {
    return this._state = this._clone(this._state);
  }

  // never allow mutation
  set state(value) {
    throw new Error('do not mutate the `.state` directly');
  }


  get(prop?: any) {
    // use our state getter for the clone
    const state = this.state;
    return state.hasOwnProperty(prop) ? state[prop] : state;
  }

  set(prop: string, value: any) {
    // internally mutate our state
    return this._state[prop] = value;
  }


  private _clone(object: InternalStateType) {
    // simple object clone
    return JSON.parse(JSON.stringify(object));
  }

  checkUserIdleTime(user,usergroup, idleCounter,accessToken): Observable<Array<Object>> {
      
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', 'Bearer ' + accessToken);
    let options = new RequestOptions({ headers: headers });

    var url = userLoginApiUrl + '/ua0306-no-us-en-sd2-lo-api/v1/api/get-user-idle-user-session-02403.php';
    //var url = phpApiUrl+ '/get-user-idle.php';
    
    return this.http.post(url,{ username: user,usergroup: usergroup, idle: idleCounter }, options)
             .map(this.extractStrategies)
             .catch(this.handleError);
    
  }


  getUserLogoutWordpress(user,group,accessToken): Observable<Array<Object>> {
      
      let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', 'Bearer ' + accessToken);
    let options = new RequestOptions({ headers: headers });

      //if(group == 'author'){
      //  var url = this.analystdataLogUrl;
      //}else{
        var url = this.dataLogUrl;
     // }
      
      //console.log('URL: ' + url);
      
      var result = this.http.post(url,{username: user,group: group},options)
               .map(this.extractStrategies)
               .catch(this.handleError);
      
      return result;
   }


  extractStrategies(res: Response) {

    let body = res.json();
    return body;

  }

  private handleError (error: Response | any) {
      // In a real world app, you might use a remote logging infrastructure
      let errMsg: string;
      if (error instanceof Response) {
        const body = error.json() || '';
        const err = body.error || JSON.stringify(body);
        errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
      } else {
        errMsg = error.message ? error.message : error.toString();
      }
      console.error(errMsg);
      return Observable.throw(errMsg);
    }

}
