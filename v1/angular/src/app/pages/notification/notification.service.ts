import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { singleTradeEventsUrl,apiURL,strategyApiUrl, registerNotificationApiUrl, subscribePlanNotificationApiUrl, articleSubmissionApiUrl, forgotPasswordNotificationApiUrl } from '../../../url.constants';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class NotificationService {

	private dataUrl = singleTradeEventsUrl;

	constructor(private http: Http) { }


  registerNotification(username: string, message: string, accessToken: string) {

    var url = registerNotificationApiUrl+'/usn0215-no-us-en-sd2-lo-api/v1/api/send-notification-0215.php';

    let headers = new Headers();
    // headers.append('Access-Control-Request-Method', '*');
    // headers.append('accept', 'application/json');
    // headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + accessToken);

    let options = new RequestOptions({ headers: headers });

        return this.http.post(url, 
          {
            username: username, 
            message: message, 
            sendSMS: true, 
            sendEmail: true, 
            save: 'user'
          }, options).map(this.extractData).catch(this.handleError);
      
  }

  forgotPasswordNotification(username: string, message: string, accessToken: string) {

    var url = forgotPasswordNotificationApiUrl+'/usn0315-no-us-en-sd2-lo-api/v1/api/send-notification-0315.php';

    let headers = new Headers();
    // headers.append('Access-Control-Request-Method', '*');
    // headers.append('accept', 'application/json');
    // headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + accessToken);

    let options = new RequestOptions({ headers: headers });

        return this.http.post(url, 
          {
            username: username, 
            message: message, 
            sendSMS: true, 
            sendEmail: true, 
            save: 'user'
          }, options).map(this.extractData).catch(this.handleError);
      
  }

  articleSubmissionNotification(username: string, message: string, accessToken: string) {

    var url = articleSubmissionApiUrl+'/usn0412-no-us-en-sd2-lo-api/v1/api/send-notification-0412.php';

    let headers = new Headers();
    // headers.append('Access-Control-Request-Method', '*');
    // headers.append('accept', 'application/json');
    // headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + accessToken);

    let options = new RequestOptions({ headers: headers });

        return this.http.post(url, 
          {
            username: username, 
            message: message, 
            sendSMS: true, 
            sendEmail: true, 
            save: 'user'
          }, options).map(this.extractData).catch(this.handleError);
      
  }

  subscribePlanNotification(username: string, message: string, accessToken: string) {

    var url = subscribePlanNotificationApiUrl+'/usn0509-no-us-en-sd2-lo-api/v1/api/send-notification-0509.php';

    let headers = new Headers();
    // headers.append('Access-Control-Request-Method', '*');
    // headers.append('accept', 'application/json');
    // headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + accessToken);

    let options = new RequestOptions({ headers: headers });

        return this.http.post(url, 
          {
            username: username, 
            message: message, 
            sendSMS: true, 
            sendEmail: true, 
            save: 'user'
          }, options).map(this.extractData).catch(this.handleError);
      
  }

  changePasswordNotification(username: string, message: string, accessToken: string) {

    var url = singleTradeEventsUrl+'/usn0712-no-us-en-sd2-lo-api/v1/api/send-notification-0712.php';
    //var url = 'http://tdog.io/test-usn0215-no-us-en-sd2-lo-api/api/send-notification.php';
    // var url = 'http://localhost:8000/send-notification';

    //var url = singleTradeEventsUrl+'/usn2-no-us-en-sd2-lo-api/api/send-notification.php';
    //var url = 'http://tdog.io/test-usn2-no-us-en-sd2-lo-api/api/send-notification.php';
    // var url = 'http://localhost:8000/send-notification';

    let headers = new Headers();
    // headers.append('Access-Control-Request-Method', '*');
    // headers.append('accept', 'application/json');
    // headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + accessToken);

    let options = new RequestOptions({ headers: headers });

        return this.http.post(url, 
          {
            username: username, 
            message: message, 
            sendSMS: true, 
            sendEmail: true, 
            save: 'user'
          }, options).map(this.extractData).catch(this.handleError);
      
  }

  updateAutoDebitNotification(username: string, message: string, accessToken: string) {

    var url = singleTradeEventsUrl+'/usn0724-no-us-en-sd2-lo-api/v1/api/send-notification-0724.php';
    //var url = 'http://tdog.io/test-usn0215-no-us-en-sd2-lo-api/api/send-notification.php';
    // var url = 'http://localhost:8000/send-notification';

    //var url = singleTradeEventsUrl+'/usn2-no-us-en-sd2-lo-api/api/send-notification.php';
    //var url = 'http://tdog.io/test-usn2-no-us-en-sd2-lo-api/api/send-notification.php';
    // var url = 'http://localhost:8000/send-notification';

    let headers = new Headers();
    // headers.append('Access-Control-Request-Method', '*');
    // headers.append('accept', 'application/json');
    // headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + accessToken);

    let options = new RequestOptions({ headers: headers });

        return this.http.post(url, 
          {
            username: username, 
            message: message, 
            sendSMS: true, 
            sendEmail: true, 
            save: 'user'
          }, options).map(this.extractData).catch(this.handleError);
      
  }



	sendUserNotification(username: string, message: string, accessToken: string) {

		var url = singleTradeEventsUrl+'/usn0215-no-us-en-sd2-lo-api/api/send-notification-0215.php';
    //var url = 'http://tdog.io/test-usn0215-no-us-en-sd2-lo-api/api/send-notification.php';
		// var url = 'http://localhost:8000/send-notification';

    //var url = singleTradeEventsUrl+'/usn2-no-us-en-sd2-lo-api/api/send-notification.php';
    //var url = 'http://tdog.io/test-usn2-no-us-en-sd2-lo-api/api/send-notification.php';
    // var url = 'http://localhost:8000/send-notification';

		let headers = new Headers();
		// headers.append('Access-Control-Request-Method', '*');
		// headers.append('accept', 'application/json');
		// headers.append('Content-Type', 'application/json');
		headers.append('Authorization', 'Bearer ' + accessToken);

		let options = new RequestOptions({ headers: headers });

      	return this.http.post(url, 
      		{
      			username: username, 
	      		message: message, 
	      		sendSMS: true, 
	      		sendEmail: true, 
	      		save: 'user'
	      	}, options).map(this.extractData).catch(this.handleError);
      
	}

    sendUserNotificationPlan(username: string, message: string, accessToken: string) {

    
    var url = singleTradeEventsUrl+'/usn0215-no-us-en-sd2-lo-api/api/send-notification.php';
    //var url = 'http://tdog.io/test-usn0215-no-us-en-sd2-lo-api/api/send-notification.php';
    // var url = 'http://localhost:8000/send-notification';

    //var url = singleTradeEventsUrl+'/usn2-no-us-en-sd2-lo-api/api/send-notification.php';
    //var url = 'http://tdog.io/test-usn2-no-us-en-sd2-lo-api/api/send-notification.php';
    // var url = 'http://localhost:8000/send-notification';

    let headers = new Headers();
    // headers.append('Access-Control-Request-Method', '*');
    // headers.append('accept', 'application/json');
    // headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + accessToken);

    let options = new RequestOptions({ headers: headers });

        return this.http.post(url, 
          {
            username: username, 
            message: message, 
            sendSMS: true, 
            sendEmail: true, 
            save: true
          }, options).map(this.extractData).catch(this.handleError);
      
  }




  	private extractData(res: Response) {
      let body = res.json();
      // var parsedBody = JSON.parse(body.message);
      var parsedBody = body;
      return parsedBody || {};
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