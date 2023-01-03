import {Injectable} from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { registerApiUrl } from '../url.constants';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'core-js/es7/reflect';


@Injectable()
export class RegisterCognitoService {

    
  /*
   * TODO: dataUrl needs to be relative, not absolute!!! 
   */



   private checkPhoneNumberUrl = registerApiUrl+ '/ua0206-no-us-en-sd2-lo-api/v1/api/check-phone-user-pool-03603.php';
   private registerURL = registerApiUrl+ '/ua0206-no-us-en-sd2-lo-api/v1/api/register-user-pool-03603.php';
   private confirmRegisterURL = registerApiUrl+ '/ua0206-no-us-en-sd2-lo-api/v1/api/confirm-register-user-pool-03603.php';

   private checkInvitationCodeURL = registerApiUrl+ '/ui0209-no-us-en-sd2-lo-api/v1/api/check-user-invitation-code-0209.php';
   private setInvitationCodeURL = registerApiUrl+ '/ui0209-no-us-en-sd2-lo-api/v1/api/set-user-invitation-code-0209.php';


   private dataUrl       = registerApiUrl+'/aac0212-no-us-en-sd2-lo-api/v1/apis/register-user-wordpress-02803.php';
   private checkEmailUrl = registerApiUrl+'/aac0212-no-us-en-sd2-lo-api/v1/apis/check-email-user-wordpress-02803.php';
   private checkUserNameUrl = registerApiUrl+ '/aac0212-no-us-en-sd2-lo-api/v1/apis/check-user-wordpress-02803.php';

   private dataCommUrl       = registerApiUrl+'/apis/community-register.php';
   private sendUserEmailUrl = registerApiUrl+ '/apis/send-user-registration.php';
   private updateIDURL = registerApiUrl+ '/user-authentication-api/api/update-unique-id.php';

   
   //private qldbAddUserRegisterURL = tokensUrl + '/add-user';
   //private qldbAssignTokensRegisterURL = tokensUrl + '/assign-tokens';

   //private qldbAddUserURL = tokensUrl + '/add-user';
   //private qldbAssignTokensURL = tokensUrl + '/assign-tokens';

   //private qldbConvertTokensURL = tokensUrl + '/convert-tokens';


  constructor(private http: Http) { }
  
  getRegisterUserWordpress(regisdata): Observable<Array<Object>> {
   
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let url = this.dataUrl;
    return this.http.post(url,{data: regisdata},options)
               .map(this.extractStrategies)
               .catch(this.handleError);
  }

  getRegisterUserCommunity(regisdata): Observable<Array<Object>> {
   
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let url = this.dataCommUrl;
    return this.http.post(url,{data: regisdata},options)
               .map(this.extractStrategies)
               .catch(this.handleError);
  }

  extractStrategies(res: Response) {

    console.log('res from Wordpress', res.json());
    let body = res.json();
    return body;

  }

  checkEmail(email): Observable<Array<Object>> {
   
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let url = this.checkEmailUrl;
    return this.http.post(url,{data: email},options)
               .map(this.extractStrategies)
               .catch(this.handleError);
  }
  
  checkPhoneNumber(phone): Observable<Array<Object>> {
   
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let url = this.checkPhoneNumberUrl;
    return this.http.post(url,{phone_number: phone},options)
               .map(this.extractStrategies)
               .catch(this.handleError);
  }

  checkInvitationCode(code): Observable<Array<Object>> {
   
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let url = this.checkInvitationCodeURL;
    return this.http.post(url, { code: code }, options)
               .map(this.extractStrategies)
               .catch(this.handleError);
  }

  setInvitationCode(obj): Observable<Array<Object>> {
   
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let url = this.setInvitationCodeURL;
    return this.http.post(url, obj, options)
               .map(this.extractStrategies)
               .catch(this.handleError);
  }

  updateUniqueid(username,uniqueid): Observable<Array<Object>> {
   
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let url = this.updateIDURL;

    return this.http.post(url,{username: username,uniqueid: uniqueid},options)
               .map(this.extractStrategies)
               .catch(this.handleError);
  }

  sendRegisterEmailWordpress(username,usergroup): Observable<Array<Object>> {
   
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let url = this.sendUserEmailUrl;
    return this.http.post(url,{data: username,group: usergroup},options)
               .map(this.extractStrategies)
               .catch(this.handleError);
  }

  checkUserName(user): Observable<Array<Object>> {
    
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let url = this.checkUserNameUrl;
    return this.http.post(url,{data: user},options)
               .map(this.extractStrategies)
               .catch(this.handleError);
  }

  register(userObj): Observable<Array<Object>> {
    
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let url = this.registerURL;
    return this.http.post(url, userObj, options)
               .map(this.extractStrategies)
               .catch(this.handleError);
  }


  // addUserToQldbRegister(userObj, accesstoken): Observable<Array<Object>> {
    
  //   let headers = new Headers({ 'Content-Type': 'application/json' });
  //   headers.append('Authorization', 'Bearer ' + accesstoken);
  //   let options = new RequestOptions({ headers: headers });

  //   let url = this.qldbAddUserURL;
  //   return this.http.post(url, userObj, options)
  //              .map(this.extractStrategies)
  //              .catch(this.handleError);
  // }

  // assignTokensQldbRegister(userObj, accesstoken): Observable<Array<Object>> {
    
  //   let headers = new Headers({ 'Content-Type': 'application/json' });
  //   headers.append('Authorization', 'Bearer ' + accesstoken);
  //   let options = new RequestOptions({ headers: headers });

  //   let url = this.qldbAssignTokensURL;
  //   return this.http.post(url, userObj, options)
  //              .map(this.extractStrategies)
  //              .catch(this.handleError);
  // }

  // addUserToQldb(userObj, accesstoken): Observable<Array<Object>> {
    
  //   let headers = new Headers({ 'Content-Type': 'application/json' });
  //   headers.append('Authorization', 'Bearer ' + accesstoken);
  //   let options = new RequestOptions({ headers: headers });

  //   let url = this.qldbAddUserURL;
  //   return this.http.post(url, userObj, options)
  //              .map(this.extractStrategies)
  //              .catch(this.handleError);
  // }

  // assignTokensQldb(userObj, accesstoken): Observable<Array<Object>> {
    
  //   let headers = new Headers({ 'Content-Type': 'application/json' });
  //   headers.append('Authorization', 'Bearer ' + accesstoken);
  //   let options = new RequestOptions({ headers: headers });

  //   let url = this.qldbAssignTokensURL;
  //   return this.http.post(url, userObj, options)
  //              .map(this.extractStrategies)
  //              .catch(this.handleError);
  // }

  // convertTokensQldb(userObj, accesstoken): Observable<Array<Object>> {
    
  //   let headers = new Headers({ 'Content-Type': 'application/json' });
  //   headers.append('Authorization', 'Bearer ' + accesstoken);
  //   let options = new RequestOptions({ headers: headers });

  //   let url = this.qldbConvertTokensURL;
  //   return this.http.post(url, userObj, options)
  //              .map(this.extractStrategies)
  //              .catch(this.handleError);
  // }

  confirmRegister(userObj): Observable<Array<Object>> {
    
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let url = this.confirmRegisterURL;
    return this.http.post(url, userObj, options)
               .map(this.extractStrategies)
               .catch(this.handleError);
  }

  // enableMFA(userObj): Observable<Array<Object>> {
    
  //   let headers = new Headers({ 'Content-Type': 'application/json' });
  //   let options = new RequestOptions({ headers: headers });

  //   let url = this.enableMFAURL;
  //   return this.http.post(url, userObj, options)
  //              .map(this.extractStrategies)
  //              .catch(this.handleError);
  // }

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
