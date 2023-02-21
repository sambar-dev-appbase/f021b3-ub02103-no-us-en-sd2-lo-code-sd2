import {Component, OnInit, OnDestroy} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {Location} from '@angular/common';
import { BaImageLoaderService, BaThemePreloader, BaThemeSpinner } from '../../theme/services';

import { NotificationService } from "../notification/notification.service";

import { RegisterService } from "../register/register-update.service";

import 'style-loader!./login.scss';

let myAccessToken;

@Component({
    selector: 'confirmRegistration',
    template: ''
})
export class LogoutComponent {
    

    constructor(public router: Router , private _spinner: BaThemeSpinner) {
        //this.userService.isAuthenticated(this)
    }
    
    public ngAfterViewInit(): void {
        // by defulat collpase sidebar
          setTimeout(() => {
            BaThemePreloader.load().then((values) => {
                this._spinner.hide();
             });
          }, 1000);  
            
      }

    // isLoggedIn(message: string, isLoggedIn: boolean) {
    //     if (isLoggedIn) {
    //         //this.userService.logout();
    //         this.router.navigate(['/user/profile']);
    //     }

    //     this.router.navigate(['/user/profile']);
    // }
}

@Component({
    selector: 'confirmRegistration',
    templateUrl: './confirmRegistration.html',
    providers: [RegisterService]
})
export class RegistrationConfirmationComponent implements OnInit, OnDestroy {
    confirmationCode: string;
    email: string;
    errorMessage: string;
    successMessage: string;
    private sub: any;
    public showLoader:boolean;
    public parameterusername: string;
    alreadyConfirmed: boolean = false;

    constructor(public router: Router, private notificationService: NotificationService,public route: ActivatedRoute,private _location: Location,private _spinner: BaThemeSpinner, public regservice: RegisterService) {
       
    }

    ngOnInit() {

        this.parameterusername = this.route.snapshot.queryParams["type"];

        this.sub = this.route.params.subscribe(params => {
            this.email = params['username'];
            this.successMessage = 'Check your phone for the verification code.';
        });


        this.errorMessage = null;

        //this.authService.getAccessToken(new AuthorInfoCallback(this, 'mrci05302018-19'));     

    }
    
    public ngAfterViewInit(): void {
        // by defulat collpase sidebar
          setTimeout(() => {
            BaThemePreloader.load().then((values) => {
                this._spinner.hide();
             });
          }, 1000);                     
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    // enableMFA(username) {
    //   this.regservice.enableMFA({username: username})
    //             .subscribe((message: any) => {  
    //               console.log('message ', message);
    //             }, error =>  {
    //               console.log('error ', error);
    //             });
    // }


    // addUserToQldb(user, plan, accessToken) {

    //   this.regservice.addUserToQldbRegister(user, accessToken)
    //         .subscribe((message: any) => {  

    //           if(plan == 'yearly') {
    //             this.regservice.assignTokensQldbRegister({ tokens: 100, name: user.name}, accessToken)
    //               .subscribe((message: any) => {                      
    //                 console.log('assignTokensQldb message ', message);
    //               }, error =>  {
    //                 console.log('error ', error);
    //               });
    //           }

    //           console.log('addUserToQldb message ', message);

    //           this.regservice.updateUniqueid(user.name, message.uid).subscribe((message: any) => {                      
    //                 console.log('assignTokensQldb message ', message);
    //               }, error =>  {
    //                 console.log('error ', error);
    //               });

    //         }, error =>  {
    //           console.log('error ', error);
    //         });
    // }

     onConfirmRegistration() {
        this.errorMessage = null;
        let self = this;
        this.confirmationCode = this.confirmationCode.replace(/\s/g,'');
        this.log_service.confirmUser({username: this.email, confirmation: this.confirmationCode})
          .subscribe((message: any) => {  
            if(message.status) {      
              this.successMessage = 'Verification successful. You will be redirected to Login screen.';

              // login user after register
              // var cpassword = localStorage.getItem('confirm_pass');

              // this.log_service.login({username: this.email, password: cpassword})
              //   .subscribe((message: any) => {  
              //     if(message.status) { 
                     
                    let messageSMS = "Welcome To SAMBAR.";                    
                    let reg_plan = localStorage.getItem('reg_plan');
                    
                    //add user to qldb
                    // this.addUserToQldb({
                    //   name : this.email,
                    //   address: null,
                    //   city: null,
                    //   state: null,
                    //   postal_code: null,
                    //   country : null,
                    //   avaliable_tokens : 0
                    // }, reg_plan, message.token);

                    // enable MFA in cognito
                    //this.enableMFA(this.email);
                    
                    this.sendUserNotification(this.email, messageSMS , message.token);
                    // localStorage.setItem('a_token' , message.token);
                    // sessionStorage.setItem('username', this.email);         
                    // localStorage.removeItem('confirm_pass');

                    // localStorage.setItem('a_token', message.IdToken);
                    // sessionStorage.setItem('access_token', message.AccessToken);
                    // sessionStorage.setItem('refresh_token', message.RefreshToken);                   
                    // sessionStorage.setItem('user', JSON.stringify(message.user));
                    // sessionStorage.setItem('td_login', 'true');

                    setTimeout(() => {
                      this.router.navigate(['/login']);
                    }, 1500)

              //     } else {
              //       this.errorMessage = message.message;
              //     }
              //   }, error =>  {
              //     this.errorMessage = 'Please try again.';
              //     console.log('error ', error);
              //   }); 


            } else {
              this.errorMessage = message.message;
            }
          }, error =>  {
            this.errorMessage = 'Please try again.';
            console.log('error ', error);
          }); 
        // this.regService.confirmRegistration(this.email, this.confirmationCode, this);
    }

    cognitoCallback(message: string, result: any) {
        BaThemePreloader.load().then((values) => {
          this._spinner.show();
        });
        if (message != null) { //error
            if(message.indexOf("Missing required key 'ConfirmationCode' in params") >= 0){
                 this.errorMessage = 'Enter verification code.';
                 this.successMessage = null;
                 BaThemePreloader.load().then((values) => {
                  this._spinner.hide();
                });
            }else if(message.indexOf("Member must have length greater than or equal to 1") >= 0){
                 this.errorMessage = 'Enter verification code.';
                 this.successMessage = null;
                 BaThemePreloader.load().then((values) => {
                  this._spinner.hide();
                });
            }else if(message.indexOf("Username/client id combination not found") >= 0){
                 this.errorMessage = 'Username already verified.';
                 this.successMessage = null;
                 BaThemePreloader.load().then((values) => {
                  this._spinner.hide();
                });
            }else if(message.indexOf("Invalid verification code provided, please try again") >= 0){
                 this.errorMessage = 'Verification code invalid. Try again.';
                 this.successMessage = null;
                 BaThemePreloader.load().then((values) => {
                  this._spinner.hide();
                });
            }else{    
                 this.errorMessage = message;
                 this.successMessage = null;
                 BaThemePreloader.load().then((values) => {
                  this._spinner.hide();
                });
            }

        } else { //success
            BaThemePreloader.load().then((values) => {
                  this._spinner.hide();
                });
            //move to the next step
            this.alreadyConfirmed = true;

            if(this.parameterusername == 'Author' ){

                this.successMessage = 'Verification successful. You can only log in after you are approved as an analyst. You will be notified electronically.';
                setTimeout(()=>{

                   BaThemePreloader.load().then((values) => {
                      this._spinner.show();
                   });
                   
                    window.location.href = '/';
                }, 15000);

            }else{

                this.successMessage = 'Verification successful.';
                var cpassword = localStorage.getItem('confirm_pass');

               // this.logservice.confimauthenticate(this.email, cpassword, this);

                 setTimeout(()=>{

                   localStorage.setItem('login_val_df', 'notlogged');
                     
                   //this.authService.getAccessToken(new AuthorInfoCallback(this, 'mrci05302018-19'));
                
                   let messageSMS = "Welcome To SAMBAR.";

                   this.sendUserNotification(this.email, messageSMS , myAccessToken);
                   //this.userService.enableMfa(this.email ,this);

                   BaThemePreloader.load().then((values) => {
                      this._spinner.show();
                   });

                   localStorage.removeItem('confirm_pass');

                   this.router.navigate(['/user/strategies-list']);
                   

                }, 5000);
                
            }

        }
    }


    /**
    * Send SMS Notificaiton
    **/
    sendUserNotification(username, message, accessToken) {

        this.notificationService.registerNotification(username, message, accessToken)
        .subscribe( (message: Object) => { 
          console.log('notification sent');
        }, error => {
          console.log('notification error' + JSON.stringify(error));
        });
    }


     cognitoCallbackmfa(message: string, result: any) {
        if (message != null) { //error
            this.errorMessage = message;
            console.log("result: Mfa: " + this.errorMessage);
        } else { //success
            //move to the next step
            if(result == 'SUCCESS'){

              setTimeout(() =>{
                localStorage.setItem('mfaenabled', 'true');
              },500);

            }
        }
    }

    backClicked() {
        if(document.referrer == ''){
            window.location.href = '/';
        }else{
            this._location.back();
        }
    }
}

/**
* To Access The User Token
**/
// export class AuthorInfoCallback implements Callback {
//     constructor(public tradesList: RegistrationConfirmationComponent, public strategyCode: string) {

//     }

//     callback() {

//     }

//     callbackWithParam(accessToken) {
//        myAccessToken = accessToken;
//     }
// }





