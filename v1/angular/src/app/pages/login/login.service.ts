import {Injectable} from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { phpApiUrl, singleTradeEventsUrl,loginApiUrl,apiURL, userLoginApiUrl, forgotPasswordNotificationApiUrl } from '../url.constants';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';


@Injectable()
export class LoginService {

	private getDisclaimerUrl = userLoginApiUrl + '/ua0306-no-us-en-sd2-lo-api/v1/api/get-disclaimer-status-user-session-02403.php';
	private updateDataUrl = loginApiUrl + '/ua0306-no-us-en-sd2-lo-api/v1/api/update-disclaimer-status-user-session-02403.php';
  private getSubExpireUrl = loginApiUrl + '/sub0303-no-us-en-sd2-lo-api/v1/api/get-subscription-expire-user-subscription-02806.php';
  private updateUsernameUrl = loginApiUrl + '/aac0309-no-us-en-sd2-lo-api/v1/apis/send-email-forgot-username-0309.php';
  private checkEmailUserPhoneUrl = loginApiUrl + '/apis/check-email-user-phone.php';

  private loginURL = loginApiUrl+ '/ua0303-no-us-en-sd2-lo-api/v1/api/signin-user-pool-03603.php';
  //private RefreshTokenURL = loginApiUrl+ '/user-authentication-api/api/refresh-token.php';
  private RefreshTokenURL = loginApiUrl+ '/ua0509-no-us-en-sd2-lo-api/v1/api/user-refresh-token-user-pool-03603.php';
  private confirmLoginURL = loginApiUrl+ '/ua0303-no-us-en-sd2-lo-api/v1/api/confirm-code-user-pool-03603.php';
  private resetMailURL = forgotPasswordNotificationApiUrl+ '/ua0312-no-us-en-sd2-lo-api/v1/api/send-reset-password-code-user-pool-03603.php';
  private forgotPasswordURL = forgotPasswordNotificationApiUrl+ '/ua0312-no-us-en-sd2-lo-api/v1/api/reset-password-user-pool-03603.php';
  private logoutURL = loginApiUrl+ '/ua0318-no-us-en-sd2-lo-api/v1/api/logout-user-pool-03603.php';
  //private isAuthenticatedUrl = forgotPasswordNotificationApiUrl+ '/ua0312-no-us-en-sd2-lo-api/v1/api/user-authentication-user-pool-03603.php';
  //private isAuthenticatedUrl = loginApiUrl+ '/ua0206-no-us-en-sd2-lo-api/v1/api/user-authentication-user-pool-03603.php';
  private resendConfirmUrl = loginApiUrl+ '/ua0303-no-us-en-sd2-lo-api/v1/api/resend-code-user-pool-03603.php';
  private joinUserUrl = loginApiUrl+ '/ui0209-no-us-en-sd2-lo-api/v1/api/sambar-join-now-user-invitation-code-0209.php';

	constructor(private http: Http) { }

  checkUserType(userName, user_type): Observable<Object> {
  
    return this.http.get(loginApiUrl + '/ua0306-no-us-en-sd2-lo-api/v1/api/check-user-type-user-session-02403.php?username=' + userName + "&user-type=" + user_type)
               .map(this.extractData)
               .catch(this.handleError);
  }

  getDisclaimerStatusForUser(username, user_type,accessToken): Observable<Object> {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', 'Bearer ' + accessToken);
    let options = new RequestOptions({ headers: headers });
  
    let url = this.getDisclaimerUrl+'?username='+username+"&user_type="+user_type;
    return this.http.get(url, options)
               .map(this.extractData)
               .catch(this.handleError);
  }

  refreshToken(username, token): Observable<Object> {
  
    let url = this.RefreshTokenURL;
    return this.http.post(url, {username: username, token: token})
               .map(this.extractData)
               .catch(this.handleError);
  }

  checkEmailPhoneUser(email: string, phone_no: string, username: string): Observable<Object> {
    
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let url = this.checkEmailUserPhoneUrl;
    
    return this.http.post(url, 
                            { email: email,
                              phone: phone_no,
                              username: username
                            },
                            options)
               .map(this.extractData)
               .catch(this.handleError);
  }

  checkUserSubExpire(username: string): Observable<Object> {
    
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let url = this.getSubExpireUrl;
    
    return this.http.post(url, 
                            { 
                              username: username
                            },
                            options)
               .map(this.extractData)
               .catch(this.handleError);
  }

  updateDisclaimerStatusForUser(username: string, showDisclaimer: boolean,usergroup: string): Observable<Object> {
  	
  	let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let url = this.updateDataUrl;
    
    return this.http.post(url, 
                            { username: username,
                              showDisclaimer: showDisclaimer,
                              usergroup: usergroup
                            },
                            options)
               .map(this.extractData)
               .catch(this.handleError);
  }
  sendemailusername(email: string, phone_no: string): Observable<Object> {
    
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let url = this.updateUsernameUrl;
    
    return this.http.post(url, 
                            { email: email,
                              phone: phone_no
                            },
                            options)
               .map(this.extractData)
               .catch(this.handleError);
  }

  login(userObj): Observable<Array<Object>> {
    
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let url = this.loginURL;
    return this.http.post(url, userObj, options)
               .map(this.extractData)
               .catch(this.handleError);
  }

  confirmLogin(userObj): Observable<Array<Object>> {
    
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let url = this.confirmLoginURL;
    return this.http.post(url, userObj, options)
               .map(this.extractData)
               .catch(this.handleError);
  }

  resendConfirm(userObj): Observable<Array<Object>> {
    
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let url = this.resendConfirmUrl;
    return this.http.post(url, userObj, options)
               .map(this.extractData)
               .catch(this.handleError);
  }


  joinUser(userObj): Observable<Array<Object>> {
    
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let url = this.joinUserUrl;
    return this.http.post(url, userObj, options)
               .map(this.extractData)
               .catch(this.handleError);
  }

  isAuthenticated(userObj): Observable<Array<Object>> {
    
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let url = this.isAuthenticatedUrl;
    return this.http.post(url, userObj, options)
               .map(this.extractData)
               .catch(this.handleError);
  }

  logout(): Observable<Array<Object>> {
    
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let url = this.logoutURL;
    return this.http.get(url)
               .map(this.extractData)
               .catch(this.handleError);
  }


  resestPaswordMailURL(userObj): Observable<Array<Object>> {
    
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let url = this.resetMailURL;
    return this.http.post(url, userObj, options)
               .map(this.extractData)
               .catch(this.handleError);
  }

  forgotPassword(userObj): Observable<Array<Object>> {
    
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let url = this.forgotPasswordURL;
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