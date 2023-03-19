import {Injectable} from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { invitationCodeJoinNowApiUrl } from '../url.constants';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'core-js/es7/reflect';


@Injectable()
export class InvitationCodeJoinNowFormService {

  private invitationCodeJoinNowUrl = invitationCodeJoinNowApiUrl+ '/ui0209-no-us-en-sd2-lo-api/v1/api/sambar-join-now-user-invitation-code-0209.php';

   
  constructor(private http: Http) { }

  invitationCodeJoinNow(userObj): Observable<Array<Object>> {
    
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let url = this.invitationCodeJoinNowUrl;
    return this.http.post(url, userObj, options)
               .map(this.extractData)
               .catch(this.handleError);
  }

   extractData(res: Response) {
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
