import { Component, ViewContainerRef, OnInit } from '@angular/core';
import { Router, NavigationEnd,NavigationStart,ActivatedRoute } from '@angular/router';
import { GlobalState } from './global.state';
import { BaImageLoaderService, BaThemePreloader, BaThemeSpinner } from './theme/services';
import { BaThemeConfig } from './theme/theme.config';
import { layoutPaths } from './theme/theme.constants';
import {RegisterService} from "./pages/register/register-update.service";

import { AppState } from "./app.service";

import 'style-loader!./app.scss';
import 'style-loader!./theme/initial.scss';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  template: `
    <main (mousemove)="mousemove()" (keydown)="keydown()" (keypress)="keypress($event)" [ngClass]="{'menu-collapsed': isMenuCollapsed}" baThemeRun>
      <div class="additional-bg"></div>
      <router-outlet></router-outlet>
    </main>
  <div id="popup1" class="overlay" *ngIf="logoutMessage">
  <div class="popup">
    <div class="close_btn ap_close_btn" (click)="closeLogoutsession()">&times;</div>
    <h2>Your session is about to expire.</h2>
    <!-- <a class="close" (click)="closeLogoutsession()" >&times;</a> -->
    <div class="content update_cover_content">
      For security reasons, this session will expire in <span class="no_of_seconds">{{noOfSeconds}}</span> seconds. To extend session, click on 'Continue' or click on 'Log out' to end session immediately.
    </div>
    <div class="content">
      <a class="continue_session" (click)="closeLogoutsession()" >Continue</a>
      <a class="logout_session" (click)="LogoutUsersession()" >Log Out</a>
    </div>
  </div>
</div>
<div id="popup1" class="overlay" *ngIf="expireSubscription">
  <div class="popup">
    <div class="close_btn ap_close_btn" (click)="closeexpireSubscription()">&times;</div>
    <!-- <a class="close" (click)="closeexpireSubscription()" >&times;</a> -->
    <div class="content update_cover_content">
      Your subscription has expired. Please subscribe to a plan to continue.
    </div>
    <div class="content">
      <a class="continue_session" (click)="closeexpireSubscription()" >Continue</a>
    </div>
  </div>
</div>`,
})
export class App implements OnInit {

  isMenuCollapsed: boolean = true;
  currentURL: string;
  previousUrl: string;
  groupnm: string;
  username : string;
  usergroup : string;
  setDefaultPlanFilter : boolean = false;
  isUserLoggedIn : boolean = false;
  logoutMessage : boolean = false;
  expireSubscription: boolean = false;
  idleCounter: number = 0;
  curRoute: string = "";
  noOfSeconds: number = 60;
  checkLogout: boolean = false;
  sessionCountdown: any;
  brokerStatusCheck: any;
  userloggedintype: string;
  accesstokenvalue: string;
  accessTokenval: string;
  accessToken: string;
  refreshToken: string;
    
  constructor(private _state: GlobalState,
              private _imageLoader: BaImageLoaderService,
              private _spinner: BaThemeSpinner,
              private viewContainerRef: ViewContainerRef,
              private themeConfig: BaThemeConfig,
              public regservice: RegisterService, 
              private router: Router,private route: ActivatedRoute, public appState: AppState) {

    themeConfig.config();
    this._loadImages();

    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });

  }

  ngOnInit() {

      this.accesstokenvalue = localStorage.getItem('a_token');
      this.accessToken = localStorage.getItem('access_token');
      this.refreshToken = localStorage.getItem('refresh_token');
      this.username = localStorage.getItem('username');

      this.setUserData();
        // check previous url to set plan filter param after login
         this.router.events.subscribe(e => {

         if(e.url.includes("opportunities")){

              BaThemePreloader.load().then((values) => {
                  this._spinner.show();
              }); 
          
          }
         
         if ( this.previousUrl == '/login' || this.previousUrl == '/app/v1/login' ) {
              this.setDefaultPlanFilter = true;
          }
            this.previousUrl = e.url;
        });

        this.currentURL = window.location.href;

        this.router.events.subscribe((evt) => {
                    //this._spinner.show();

          if (evt instanceof NavigationStart) {

            this.accesstokenvalue = localStorage.getItem('a_token');
            this.accessToken = localStorage.getItem('access_token');
            this.username = localStorage.getItem('username');

            if (this.username && this.username != '') { 

                if(localStorage.getItem('planExpire') && localStorage.getItem('planExpire') == 'true'){ 
                    //old logic
                    // if(evt.url.includes("opportunities") || evt.url.includes("strategies-list") || evt.url.includes("trades-list") || evt.url.includes("user/strategies")){

                    //   this.expireSubscription = true;

                    //   this.router.navigate(['user/subscription']);

                    // }

                    if(!evt.url.includes("user/subscription") && !evt.url.includes("user/profile") && !evt.url.includes("logout") ){

                      //this.router.navigate(['user/profile']);

                      window.location.href = '/app/v1/user/profile';
                    }

                }

            }
            

            this.regservice.isAuthenticated({token: this.accessToken})
                  .subscribe((response: any) => {

                        this.isUserLoggedIn = true;
                        //console.log("response", response)
                        if(!response.status) {
                          this.isUserLoggedIn = false;
                          localStorage.removeItem("access_token");
                          localStorage.removeItem("username");
                          localStorage.removeItem("a_token");
                          localStorage.setItem('td_login', 'false');
                          localStorage.setItem('login_val_df', 'logged');
                          localStorage.setItem("checkCreditsChanged", "true");
                          localStorage.setItem('td_username', '');
                          localStorage.setItem('td_password', '');
                          localStorage.setItem("user_group", '' ); 
                          localStorage.setItem("user_email", '');

                          setTimeout(() => {
                            
                            if(!evt.url.includes("login") 
                              && !evt.url.includes("register")
                              && !evt.url.includes("forgot-password")
                              && !evt.url.includes("forgot-username")
                              && !evt.url.includes("verify-user")
                              && !evt.url.includes("opportunities")
                              && !evt.url.includes("confirm-registration")
                              && !evt.url.includes("update-subscription")
                              && !evt.url.includes("claim-profile")
                              && !evt.url.includes("join")
                              ) {
                              this.router.navigate(['/login']);

                            }                      
                          }, 100)
                        }


                  }, error =>  {
                    console.log('error ', error);
                  })  
            
          }

          if (!(evt instanceof NavigationEnd)) {
                // BaThemePreloader.load().then((values) => {
                //     this._spinner.show();
                // });                
                return;
            }
            
            window.scrollTo(0, 0)

            this.idleCounter = 1;
            this.noOfSeconds = 60;
            this.checkLogout = false;
            this.sessionCountdown = 0;
            this.logoutMessage = false;
            this.curRoute = this.router.url;
     
            var url = evt.url; // get current url 
            
            // array of path params
            var path_array = url.split('/').slice(1);
            
            // get current component from array / removed query string params
            if ( path_array.length > 1 ) {              
              var currentComponent = path_array[1].split('?'); 
            } else {
              var currentComponent = path_array; 
            }
            

            // components array which do not need sidebar
            var noSideBarComp = ['subscription', 'strategies-list', 'trades-list', 'strategies', 'strategy-list', 'opportunities']; 

              if ( noSideBarComp.indexOf(currentComponent[0]) > 0 ) { // hide sidebar              
                this._state.notifyDataChanged('menu.isCollapsed', true);
              } else { // show sidebar       
                let urlArr = window.location.href.split('/');
                let pageName = (urlArr && urlArr.length) ? urlArr[urlArr.length - 2] : '';
                if((window.innerWidth < 1024) && (pageName === 'my-strategies' || pageName === 'my-trades' || pageName === 'following' || pageName === 'plans' || pageName === 'billing-info' || pageName === 'billing-history' || pageName === 'lebar-payments')) { 
                  
                  this.isMenuCollapsed = true;
                  setTimeout(() => this._state.notifyDataChanged('menu.isCollapsed', true), 1000);
                   } else {
                     
                    this._state.notifyDataChanged('menu.isCollapsed', false);
                } 
            }

            $('#mySidenav').hide();
        });       

        var tm = setInterval(() => {

          clearInterval(this.sessionCountdown);

          if (this.username) {              
              this.appState.checkUserIdleTime(this.username,this.userloggedintype, this.idleCounter,this.accesstokenvalue)
                .subscribe(
                    (resp: any) => { 
                      if(resp.idle || resp.diff > 5) {
                          this.logoutMessage = true;
                          this.sessionCountdown = setInterval(() => {
                            this.noOfSeconds--;
                            if(this.noOfSeconds < 1) {
                              clearInterval(this.sessionCountdown);
                              this.LogoutUsersession();
                            }
                         }, 1000);
                      }else{
                          this.logoutMessage = false;
                      }
                      this.idleCounter = 0;
                    },
                    error =>  {
                      this.logoutMessage = false;
                      console.log('Error: ' + JSON.stringify(error));
                      this.idleCounter = 1;
                    });
              
            }

          
          // }
        }, 20000 ); 

        this.brokerStatusCheck = setInterval(() => {
          
          let sessionToken = localStorage.getItem("tradeITSessionToken");
          
          if ( sessionToken ) {
          }
        }, 840000); // 14 minutes

    }

    setUserData(){

      let result = JSON.parse(localStorage.getItem('user'));
      if(result) {
        for (let i = 0; i < result.length; i++) {          
          if(result[i].Name == 'custom:subscription_plan'){
            this.groupnm = result[i].Value;
            this.groupnm =  this.groupnm.toLowerCase();
          }
        }

        if(this.groupnm == 'yearly'){
          this.groupnm = 'platinum';
        }
        if ( this.setDefaultPlanFilter ) {

          this.setDefaultPlanFilter = false;
          localStorage.setItem("checkedPlan", this.groupnm.toString() );
          localStorage.setItem("checkedActiveTrade", 'active' );
          localStorage.setItem("filtered", "true" );              
        }
      }




    }

    closeexpireSubscription(){

      this.expireSubscription = false;

    }

     getOAuthUrlForZuul(accessToken){
       this.accesstokenvalue = accessToken;
     }

    callbackWithParam(result: any) {
        
        for (let i = 0; i < result.length; i++) {

          if(result[i].getName() == 'custom:subscription_plan'){

            var groupnm = result[i].getValue();
            groupnm     =  groupnm.toLowerCase();

            if(groupnm == 'platinum' || groupnm == 'yearly'){
              
              groupnm = 'Platinum';
            } else {

              groupnm = groupnm.charAt(0).toUpperCase() + groupnm.slice(1);
            }

            this.groupnm = groupnm;

            // set plan filter based on user plan after login
            if ( this.setDefaultPlanFilter ) {
             
              this.setDefaultPlanFilter = false;
              localStorage.setItem("checkedPlan", this.groupnm.toString() );
              localStorage.setItem("checkedActiveTrade", 'active' );
              localStorage.setItem("filtered", "true" );              
            }


          }

            if(result[i].getName() == 'custom:user_group'){

                this.userloggedintype = result[i].getValue();
                this.userloggedintype = this.userloggedintype.toLowerCase();
                localStorage.setItem("user_group", this.userloggedintype );  

             }
        }
    }

    closeLogoutsession() {
      this.logoutMessage = false;
      this.idleCounter = 1;
      clearInterval(this.sessionCountdown);
    }
    
    LogoutUsersession() {

     // this.disconnectWithBroker();

      this.logoutMessage = false;
      this.idleCounter = 1;
      this.isUserLoggedIn = false;
      this.checkLogout = true;
      clearInterval(this.sessionCountdown);

      this.appState.getUserLogoutWordpress(this.username,"user", localStorage.getItem("a_token")).subscribe(
       (message: Object) => {         
          //console.log('message', message);
       },
       error => { console.log('Error: ' + error); });
      
      localStorage.setItem('login_val_df', 'logged');
      localStorage.setItem('td_username', '');
      localStorage.setItem('td_password', '');
      localStorage.setItem("user_group", '' ); 
      localStorage.setItem("user_email", '');
      localStorage.removeItem("access_token");
      localStorage.removeItem("username");
      localStorage.removeItem("a_token");
      localStorage.removeItem('planExpire');
      //this.userService.logout();

      // disconnect through Trade it

      
       setTimeout(() => {
          window.location.href = '/';  
       }, 1000);  

    }

    mousemove() {
      this.idleCounter = 1;
    }
    keydown() {
      this.idleCounter = 1;
    }
    keypress() {
      this.idleCounter = 1;
    }


  // isLoggedIn(message: string, isLoggedIn: boolean,group: string,username: string) {

  //   if (isLoggedIn) {
  //     this.isUserLoggedIn = true;
  //     this.username = username;
  //     this.usergroup = group;
  //     this.userParams.getParameters(this);

  //   } else {
  //     this.isUserLoggedIn = false;
  //     this.username = "";
  //     this.usergroup = "";       
  //   }
  // }
  // callback() {

  // }

  private _loadImages(): void {
    // register some loaders
    
    BaThemePreloader.registerLoader(this._imageLoader.load(layoutPaths.images.root + 'default-image.jpg'));
  }

}


// export class AccessTokenCallback implements Callback {
//     constructor(public appCmp: App) {

//     }

//     callback() {

//     }

//     callbackWithParam(accessToken) 
//     {
//         this.appCmp.keepTradeITSessionAlive(accessToken);
//     }
// }

// export class AccessTokenBrokerDisconnectCallback implements Callback {
//     constructor(public appCmp: App) {

//     }

//     callback() {

//     }

//     callbackWithParam(accessToken) 
//     {
//         this.appCmp.disconnectWithBrokerForUser(accessToken);
//     }
// }

// export class AccessTokenOAuthCallbackZuul implements Callback {
//     constructor(public appCmp: App) {

//     }

//     callback() {

//     }

//     callbackWithParam(accessToken) 
//     {
//         this.appCmp.getOAuthUrlForZuul(accessToken);
//     }
// }
