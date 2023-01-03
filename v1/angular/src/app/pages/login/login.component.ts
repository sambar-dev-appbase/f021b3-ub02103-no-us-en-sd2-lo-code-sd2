import { Component,ViewChild } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
import { BaImageLoaderService, BaThemePreloader, BaThemeSpinner } from '../../theme/services';
import { ModalDirective } from 'ng2-bootstrap';
import {ProfileService} from "../profile/profile-update.service";
import {SubscriptionService} from "../subscription/subscription-update.service";
import {LoginService} from "./login.service";
import * as moment from 'moment';

import 'assets/js/sweetalert.min.js';
declare let swal: any;

@Component({
  selector: 'login',
  styleUrls: ['./login.scss'],
  templateUrl: './login.html',
})
export class Login {

  @ViewChild('childModal') childModal: ModalDirective;
  @ViewChild('childModal2') childModal2: ModalDirective;

  public email:string;
  public password:string;
  public showLoader:boolean;
  public disclaimerChoice:boolean;
  public submitted:boolean = false;
  public captcharesponse: string;
  public errorMessage: string;
  public errorMessageUser: string;
  public emailid: string;
  public phoneno: string;
  public successMessage: string;
  public successPlanMessage: string;
  public successMessageUser: string;
  public username: string;
  private sub: any;
  public user_type:string = 'User';
  public login_title: string = 'User Log In';
  public updateplanattr: boolean = false;
  public showexpiredplan: boolean = false;
  public plansData: any;
  public expireattrplan: boolean = false;
  public errorAnalyst: boolean = false;
  public errorLogin: boolean = false;
  public currenttime: any;
  public invalidcode: boolean = false;
  public login_button: string = 'Log In';
  public expireplan: boolean = false;
  public expireplanN: boolean = false;
  public nocall: boolean = true;
  public registeredon: any;
  public countermessage:number = 10;

  constructor(public router: Router,public route: ActivatedRoute,
    public profservice: ProfileService, 
    public loginService: LoginService,  
    private _spinner: BaThemeSpinner,
    private _location: Location,private subscriptionservice: SubscriptionService) {
      // BaThemePreloader.load().then((values) => {
      //     this._spinner.show();
      // });
  }
  public ngAfterViewInit(): void {
        // by defulat collpase sidebar
      setTimeout(() => {
        BaThemePreloader.load().then((values) => {
            this._spinner.hide();
         });
      }, 500);  
       
      setTimeout(() => {
        this.username = '';
        this.password = '';
        setTimeout(() => {
          this.username = '';
          this.password = '';
        },1000);
      },2000);
      localStorage.removeItem('tdUser');
      // hide spinner once all loaders are completed 
  }
  resolved(captchaResponse: string) {
        this.captcharesponse = captchaResponse;
        return false;
  }

  ngOnInit() {
        this.errorMessage = null;
        this.errorMessageUser = null;
        this.captcharesponse = null;
        this.successPlanMessage = null;
        localStorage.setItem('mfaenabled', 'false');
        localStorage.setItem('showOrdersPopup', 'true');

        localStorage.setItem('td_login', 'false');
        localStorage.setItem('login_val_df', 'logged');
        localStorage.setItem('logoutCheck', 'true');
        localStorage.setItem("checkCreditsChanged", "true");
        localStorage.setItem('td_username', '');
        localStorage.setItem('td_password', '');
        localStorage.setItem("user_group", '' ); 
        localStorage.setItem("user_email", '');
        localStorage.removeItem("access_token");
        localStorage.removeItem("username");
        localStorage.removeItem("a_token");
        localStorage.removeItem('planExpire');
        localStorage.setItem('tdlogin', 'false');
        localStorage.removeItem("accessToken");
        localStorage.removeItem("username");
        localStorage.removeItem("IdToken");
                

        // this.userService.isAuthenticated(this);
        this.errorMessage = "* Required";
        this.sub = this.route.params.subscribe(params => {
            this.user_type = params['usertype'];
            if(this.user_type == 'analyst'){
              this.login_title = 'Analyst Log In';
            }
            this.router.navigate(['/login']);
        });
  }

  onLogin() {
        this.login_button = 'Please Wait...';
        this.errorMessage = null;
        if (this.username == null || this.password == null) {
          this.login_button = 'Log In';
            this.errorMessage = "* Required";
            BaThemePreloader.load().then((values) => {
              this._spinner.hide();
            });
            //return;
        }
        if(this.username != null && this.password != null && this.captcharesponse == null){
            this.errorMessage = "Check the recaptcha box.";
            this.login_button = 'Log In';
            BaThemePreloader.load().then((values) => {
              this._spinner.hide();
            });
            return;
        }

        if(typeof(this.password) == "undefined" || this.password == ''){
             this.errorMessage = "* Required";
             this.login_button = 'Log In';
             BaThemePreloader.load().then((values) => {
                this._spinner.hide();
             });
             return false;
        }

        this.errorAnalyst = false;

        this.username = this.username.toLowerCase();
        
        this.loginService.checkUserType(this.username, this.user_type).subscribe(
        (message: any) => {
          if(message && message.success) {
            if(message.data && message.data !== '' && message.data.toLowerCase() === 'author') {
              
              this.errorLogin = false;
              this.errorMessage = 'Invalid username or password.';
              this.login_button = 'Log In';
              /*if(this.login_title == 'Analyst Log In') {
                if(message.login_value != undefined && !message.login_value){
                  this.errorMessage = 'You can only log in after you are approved as Analyst. You will be notified electronically.';
                  return false;
                }else{
                  this.doLogin();
                }
              } else {
                this.errorAnalyst = true;
              }*/
            } else {
              if(this.login_title === 'User Log In') {
                if(message.login_value != undefined && !message.login_value){
                  this.errorMessage = 'You can only login after you details are verified, you will be electronically notified.';
                  return false;
                }else{
                  this.doLogin();
                }
                // this.doLogin();
              } else  {
                this.errorLogin = true;
                this.login_button = 'Log In';
              }
            }
          } else {
            if(this.login_title === 'User Log In') {
                this.doLogin();
              } else  {
                this.errorLogin = false;
                this.login_button = 'Log In';
                this.errorMessage = 'Invalid username or password.';
              }            
          }
        }, error => { 
          this.errorAnalyst = false;
          this.login_button = 'Log In';
          console.log('Error: ' + error); 
        });
          
  }

  checkUserType() {
    
  }

  closeinvalidcode(){
    this.invalidcode = false;
  }

  planexpired(){
    localStorage.setItem('td_login', 'false');
    localStorage.setItem('login_val_df', 'logged');
    localStorage.setItem("checkCreditsChanged", "true");
    localStorage.setItem('td_username', '');
    localStorage.setItem('td_password', '');
    localStorage.setItem("user_group", '' ); 
    localStorage.setItem("user_email", '');
    localStorage.removeItem("access_token");
    localStorage.removeItem("username");
    localStorage.removeItem("a_token");
    localStorage.removeItem('planExpire');

    this.username = '';
    this.password = '';

    this.errorMessage = null;
    this.errorMessageUser = null;
    this.captcharesponse = null;
    this.successPlanMessage = null;

    this.successMessage = null;

    this.expireplan  = false;
    this.expireplanN  = false;

  }

  doLogin() {

    // BaThemePreloader.load().then((values) => {
    //   this._spinner.show();
    //  });
      // remove trade it session if exists
      let sessionToken = localStorage.getItem("tradeITSessionToken");
      if ( sessionToken ) {
          localStorage.removeItem('brokerAccountInformation');
          localStorage.removeItem("tradeITSessionToken");
          localStorage.removeItem('tradeITBroker');
      }

      
      this.loginService.login({username: this.username, password: this.password})
        .subscribe((loginResp: any) => {  

          if(loginResp.status) {

            this.login_button = 'Log In';
            
            if(loginResp.session) {
                swal("Enter verification code", {
                   content: "input",
                   buttons: ["Cancel", "Submit"],
                })
                .then((value) => {

                  if (value) {

                    this.loginService.confirmLogin({username: this.username, code: value, session: loginResp.session})
                      .subscribe((confirmLoginResp: any) => { 
                        if(confirmLoginResp.status) {

                           this.loginService.checkUserSubExpire(this.username).subscribe(
                              (message: Object) => {
                              var showstatus = message['status'] ;
                              var showexpired = message['expire_value'] ;
                              
                              this.currenttime = new Date();
                              this.currenttime = this.currenttime.toUTCString();


                              localStorage.setItem('a_token', confirmLoginResp.IdToken);
                              localStorage.setItem('access_token', confirmLoginResp.AccessToken);
                              localStorage.setItem('refresh_token', confirmLoginResp.RefreshToken);
                              localStorage.setItem('username', this.username);
                              localStorage.setItem("ukey", btoa(this.password));

                              localStorage.setItem('user', JSON.stringify(confirmLoginResp.user));
                             
                              localStorage.setItem('td_login', 'true');
                              localStorage.setItem('login_val_df', 'notlogged');
                              localStorage.setItem('td_username', this.username);
                              localStorage.setItem('td_password', this.user_type);
                              localStorage.setItem("user_group", this.user_type); 
                              localStorage.setItem("checkCreditsChanged", "true");
                              localStorage.setItem('last-login', this.currenttime);

                              this.successMessage = 'Log in successful.';

                              localStorage.removeItem('checkedMarket');
                              localStorage.removeItem('checkedSector');
                              localStorage.removeItem('checkedPlan');
                              localStorage.removeItem('checkedAuthor');
                              localStorage.removeItem('checkedPublication1');
                              localStorage.removeItem('checkedPublication2');
                              localStorage.removeItem('checkedTradeType');
                              localStorage.removeItem('checkedActiveTrade');
                              localStorage.removeItem('filtered');
                              localStorage.removeItem("logoutCheck");
                              localStorage.setItem("checkedActiveTrade", 'active' );

                              if(message['message'] == 'Not able to get subscription expire value'){

                                localStorage.setItem('planExpire' , 'true');
                                
                                this.loginService.getDisclaimerStatusForUser(this.username, this.user_type ,localStorage.getItem('a_token')).subscribe(
                                  (message: Object) => {
                                     var showDisclaimer = message['show-disclaimer'] ;
                                     var showstatus = message['status'] ;

                                     this.registeredon = moment(Date.parse(message['registeredon'])).format('MMMM Do YYYY, HH:mm:ss');
                                    if(this.registeredon == 'Invalid date'){
                                      this.registeredon = '';
                                    }
                                    localStorage.setItem('regsitered_date', this.registeredon);

                                    }, 
                                error => { console.log('Error: ' + error); });

                                //this.expireplan = true;

                                this.profservice.getLoginDataWordpress(this.username, localStorage.getItem('a_token')).subscribe(
                                (message: Object) => {

                                }, 
                                error => { console.log('Error: ' + error); });

                                this.router.navigate(['user/profile']);
    

                              }else if(showstatus == 'expired' || showexpired == 'true') {
                                
                                localStorage.setItem('planExpire' , 'true');
                                
                                this.loginService.getDisclaimerStatusForUser(this.username, this.user_type ,localStorage.getItem('a_token')).subscribe(
                                  (message: Object) => {
                                     var showDisclaimer = message['show-disclaimer'] ;
                                     var showstatus = message['status'] ;

                                     this.registeredon = moment(Date.parse(message['registeredon'])).format('MMMM Do YYYY, HH:mm:ss');
                                    if(this.registeredon == 'Invalid date'){
                                      this.registeredon = '';
                                    }
                                    localStorage.setItem('regsitered_date', this.registeredon);

                                    }, 
                                error => { console.log('Error: ' + error); });
                                
                                this.expireplanN = true;



                                //this.router.navigate(['user/profile']);
                                // localStorage.setItem('tdUser', JSON.stringify({'u': this.username, 'p': this.password, 't': this.user_type}));
                                // this.loginService.logout()
                                //     .subscribe((response: any) => { 
                                //     }, error =>  { 
                                //       console.log('error ', error);
                                //     }); 
                              }else {

                                
                                this.checkDisclaimer();
                              }

                            }, error => { 
                              console.log('Error: ' + error); 
                            });


                        } else {
                          this.invalidcode = true;
                          //swal('Verification code invalid. Try again.');
                          BaThemePreloader.load().then((values) => {
                            this._spinner.hide();
                          });
                        }
                      }, error =>  {
                        BaThemePreloader.load().then((values) => {
                          this._spinner.hide();
                        });
                        swal('Please Try again.');
                        // this.errorMessage = 'Please try again.';
                        console.log('error ', error);
                      })                
                  } else {
                    BaThemePreloader.load().then((values) => {
                      this._spinner.hide();
                    });
                    return false;
                  }
                          
                });

            } else {
               this.loginService.getDisclaimerStatusForUser(this.username, this.user_type, localStorage.getItem('a_token')).subscribe(
                            (message: Object) => {
                            var showstatus = message['status'] ;
                            var showexpired = message['expire_value'] ;
                            this.currenttime = new Date();
                            this.currenttime = this.currenttime.toUTCString();

                            localStorage.setItem('a_token', loginResp.IdToken);
                            localStorage.setItem('access_token', loginResp.token);
                            localStorage.setItem('username', this.username);
                            localStorage.setItem('user', JSON.stringify(loginResp.user));
                           
                            localStorage.setItem('td_login', 'true');
                            localStorage.setItem('login_val_df', 'notlogged');
                            localStorage.setItem('td_username', this.username);
                            localStorage.setItem('td_password', this.user_type);
                            localStorage.setItem("user_group", this.user_type); 
                            localStorage.setItem("checkCreditsChanged", "true");
                            localStorage.setItem('last-login', this.currenttime);

                            this.successMessage = 'Log in successful.';

                            localStorage.removeItem('checkedMarket');
                            localStorage.removeItem('checkedSector');
                            localStorage.removeItem('checkedPlan');
                            localStorage.removeItem('checkedAuthor');
                            localStorage.removeItem('checkedPublication1');
                            localStorage.removeItem('checkedPublication2');
                            localStorage.removeItem('checkedTradeType');
                            localStorage.removeItem('checkedActiveTrade');
                            localStorage.removeItem('filtered');
                            localStorage.setItem("checkedActiveTrade", 'active' );

                            if(showstatus == 'expired' || showexpired == 'true') {
                              //localStorage.setItem('tdUser', JSON.stringify({'u': this.username, 'p': this.password, 't': this.user_type}));
                              localStorage.setItem('planExpire' , 'true');
                               this.expireplan = true;
                               this.profservice.getLoginDataWordpress(this.username, localStorage.getItem('a_token')).subscribe(
                                    (message: Object) => {
                               
                                    }, 
                                    error => { console.log('Error: ' + error); });
                              this.router.navigate(['user/profile']);
                              
                            }else {

                              
                              this.checkDisclaimer();
                            }

                          }, error => { 
                            console.log('Error: ' + error); 
                          });
            }

           
            // localStorage.setItem('a_token', message.token);
            // this.router.navigate(['/user/strategies-list']);

          } else {
            this.errorMessage = loginResp.message;
            this.login_button = 'Log In';
            if(loginResp.message == "User is not confirmed.") {
              this.loginService.resendConfirm({username: this.username})
              .subscribe((resp: any) => {  
                if(resp.status) {  
                  this.router.navigate(['/confirm-registration' + '/' + this.username],{ queryParams: { type: 'User' }});
                }
              })
            }
            BaThemePreloader.load().then((values) => {
                this._spinner.hide();
             });
          }
        }, error =>  {
          console.log('error ', error);
          this.errorMessage = 'Please try again.';
          this.login_button = 'Log In';
          BaThemePreloader.load().then((values) => {
            this._spinner.hide();
          });
         
        }); 
    // this.logservice.authenticate(this.username, this.password, this);
   
  }

  closeexpireplan(){

    this.expireplan = false;

    this.profservice.getLoginDataWordpress(this.username, localStorage.getItem('a_token')).subscribe(
    (message: Object) => {

    }, 
    error => { console.log('Error: ' + error); });

    this.router.navigate(['user/profile']);
  }

  closeexpireplanN(){

    this.expireplanN = false;

    this.profservice.getLoginDataWordpress(this.username, localStorage.getItem('a_token')).subscribe(
    (message: Object) => {

    }, 
    error => { console.log('Error: ' + error); });

    this.router.navigate(['user/subscription']);

  }

  back_Clicked() {
    if(document.referrer == ''){
       window.location.href = '/';
    }else{
        this._location.back();
    }
  }

  cognitoCallbackVerify(error: any, result: any) {
        if (error != null) {
        } else {
        }
    }

  goToPage(page) {
   if(page === 'login') {
     this.router.navigate(['/login']);
   } else {
      this.router.navigate(['/login/analyst']); 
   }
  }

  checkDisclaimer() {
    this.loginService.getDisclaimerStatusForUser(this.username, this.user_type ,localStorage.getItem('a_token')).subscribe(
      (message: Object) => {
         var showDisclaimer = message['show-disclaimer'] ;
         var showstatus = message['status'] ;

         this.registeredon = moment(Date.parse(message['registeredon'])).format('MMMM Do YYYY, HH:mm:ss');
        if(this.registeredon == 'Invalid date'){
          this.registeredon = '';
        }
        localStorage.setItem('regsitered_date', this.registeredon);

         if(showstatus == 'expired' && this.login_title === 'User Log In'){
              BaThemePreloader.load().then((values) => {
                this._spinner.hide();
              });
              this.errorMessage = 'Account deactivated. Please subscribe to a plan to continue.';
              return false;   
         }else if ( showDisclaimer == true ) {
           
           BaThemePreloader.load().then((values) => {
            this._spinner.hide();
           });
           // Show Disclaimer poup
           this.showchildModal();
         } else {

           // Show important call poup

           this.showchildModal2();

            setInterval(() => {

              this.countermessage--;

              if(this.countermessage == 0){
                this.closehideChildModal2();
              }

            }, 1000);

            // this.profservice.getLoginDataWordpress(this.username).subscribe(
            // (message: Object) => {
       
            // }, 
            // error => { console.log('Error: ' + error); });

            // let returnUrl = this.route.snapshot.queryParams['returnUrl'];
            // if(returnUrl && returnUrl !== null) {
            //   returnUrl = returnUrl.replace('&', '?');
            //   if(window.location.href.indexOf('localhost') > 1) {
            //      window.location.href = returnUrl;
            //   } else {
            //     returnUrl = '/app/v1/' + returnUrl;
            //     window.location.href = returnUrl;
            //     // this.router.navigate([returnUrl || '/user/strategies-list']);
            //   }  
            // } else {
            //  this.router.navigate([returnUrl || '/user/strategies-list']);

            // }

         }
      }, 
      error => { console.log('Error: ' + error); });
  }

  closehideChildModal(): void {
    
      this.childModal.hide();
      
      if ( this.disclaimerChoice == true ) {
        this.loginService.updateDisclaimerStatusForUser(this.username, false,this.user_type).subscribe(
          (message:Object) => {
            // status updated
        }, error => { console.log('Error: ' + error); });
      }

      this.showchildModal2();

      setInterval(() => {

        this.countermessage--;

        if(this.countermessage == 0){
          this.closehideChildModal2();
        }

      }, 1000);

      // setTimeout(() => {

      //   this.nocall = false;

      // }, 10000);

      //this.showchildModal2();

      //  this.profservice.getLoginDataWordpress(this.username).subscribe(
      //       (message: Object) => {
       
      //       }, 
      //       error => { console.log('Error: ' + error); });
       
      // let returnUrl = this.route.snapshot.queryParams['returnUrl'];
      // if(returnUrl && returnUrl !== null) {
      //   returnUrl = returnUrl.replace('&', '?');
      //   if(returnUrl.includes('?') || returnUrl.includes('=')) {
      //    window.location.href = '/app/v1/' + returnUrl;
      //   } else {
      //    this.router.navigate([returnUrl || '/user/strategies-list']);
      //   }  
      // } else {
      //  this.router.navigate([returnUrl || '/user/strategies-list']);
      // }

  }

   closehideChildModal2(): void {
    
      this.childModal2.hide();

       this.profservice.getLoginDataWordpress(this.username, localStorage.getItem('a_token')).subscribe(
            (message: Object) => {
       
            }, 
            error => { console.log('Error: ' + error); });
       
      let returnUrl = this.route.snapshot.queryParams['returnUrl'];
      if(returnUrl && returnUrl !== null) {
        returnUrl = returnUrl.replace('&', '?');
        if(returnUrl.includes('?') || returnUrl.includes('=')) {
         window.location.href = '/app/v1/' + returnUrl;
        } else {
         this.router.navigate([returnUrl || '/user/strategies-list']);
        }  
      } else {
       this.router.navigate([returnUrl || '/user/strategies-list']);
      }

  }

  showchildModal() {
    this.childModal.config.ignoreBackdropClick = true;
    this.childModal.show();
  }

  showchildModal2() {
    this.childModal2.config.ignoreBackdropClick = true;
    this.childModal2.show();
  }

  callback() {}

  isLoggedIn(message: string, isLoggedIn: boolean) {
      if (isLoggedIn)
          this.router.navigate(['/user/strategies-list']);
      }
  }