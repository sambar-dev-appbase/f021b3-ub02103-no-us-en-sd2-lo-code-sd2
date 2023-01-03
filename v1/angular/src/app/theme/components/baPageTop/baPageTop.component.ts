import {Component,Output,ViewChild,EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import {GlobalState} from '../../../global.state';

import 'style-loader!./baPageTop.scss';
import { Modals } from '../../../pages/ui/components/modals/modals.component';
//import { UserDynamoDbData } from '../../../../../api/user-dynamodb-data';
import * as moment from 'moment';
import { ModalDirective } from 'ng2-bootstrap';
import {LoginService} from "../../../pages/login/login.service";
import {ProfileService} from "../../../pages/profile/profile-update.service";
import {SubscriptionService} from "../../../pages/subscription/subscription-update.service";

@Component({
  selector: 'ba-page-top',
  templateUrl: './baPageTop.html',
  providers: [
    ProfileService,
    SubscriptionService
  ]
})

export class BaPageTop {

  public isScrolled:boolean = false;
  public isMenuCollapsed:boolean = true;
  public groupnm : string;
  public username: string;
  public nooftoken: any;
  public showTokenBtn: boolean = false;
  public noofcredits: any;
  public planstringval: any = 'Basic, LeBar: 0 and Credits: 0';
  public planname: string;
  public registeredon: any;
  public opensitefeedback: boolean = false;
  public dynamicmenu: boolean = false;
  private intervalcredits: any;
  private intervalCancelMembership: any;
  private showScreenMsg: boolean = false;
  public selectedname: string;
  public selectedemail: string;
  public selectedFeed: string;
  public messagefeed: string;
  public getSuccessMessage: boolean = false;
  public authormenu:boolean = false;
  public userpicture: string;
  public userGroup: string;
  public accessTokenval: string;
  public blockedTokens1: number = 0;
  public blockedTokens2: number = 0;
  public blockedTokens3: number = 0;

  public purpose1:string;
  public purpose2:string;
  public purpose3:string;
  public leBarAvailable:number = 0;
  public leBarPurchase:number = 0;
  public centsTotal:number = 0;
  public myLebarTotal:any;
  public accountNo:any;


  @Output() messageEvent = new EventEmitter<string>();

  //@ViewChild('childModalHomeVideo') childModalHomeVideo: ModalDirective;
  @ViewChild('visualFeebackVideo') visualFeebackVideo: ModalDirective;
  // @ViewChild('childModalFutureVideo') childModalFutureVideo: ModalDirective;
  // @ViewChild('childModalResourcesVideo') childModalResourcesVideo: ModalDirective;
  // @ViewChild('childModalMyplanVideo') childModalMyplanVideo: ModalDirective;
  // @ViewChild('childModalStrategyVideo') childModalStrategyVideo: ModalDirective;
  // @ViewChild('childModalArticleVideo') childModalArticleVideo: ModalDirective;
  // @ViewChild('childModalMyprofileVideo') childModalMyprofileVideo: ModalDirective;
  // @ViewChild('childModalMyprofileAuthorVideo') childModalMyprofileAuthorVideo: ModalDirective;
  // @ViewChild('childModalTradeboardVideo') childModalTradeboardVideo: ModalDirective;
  // @ViewChild('childModalStocksVideo') childModalStocksVideo: ModalDirective;
  // @ViewChild('childModalEtfVideo') childModalEtfVideo: ModalDirective;
  // @ViewChild('childModalForexVideo') childModalForexVideo: ModalDirective;
  @ViewChild('childModalDifference') childModalDifference: ModalDirective;

  constructor(public router: Router,private _state:GlobalState,public profservice: ProfileService, public subscriptionservice: SubscriptionService, public loginService: LoginService) {
      
      this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
      

    });
      //this.loadScript('https://fast.wistia.com/embed/medias/e3ke5nn6hz.jsonp');
      //this.loadScript('https://fast.wistia.com/assets/external/E-v1.js');
      // this.authService.getAccessToken(new AccessTokenOAuthCallbackZuul(this));
      // this.userService.isAuthenticated(this);
      //console.log("top menu")
      // this.loadScript('https://fast.wistia.com/embed/medias/3niwk08nnf.jsonp');
      // this.loadScript('https://fast.wistia.com/embed/medias/s0ax2fjvmy.jsonp');
      // this.loadScript('https://fast.wistia.com/embed/medias/hy9m4v5620.jsonp');
      // this.loadScript('https://fast.wistia.com/embed/medias/5upnrt2els.jsonp');
      // this.loadScript('https://fast.wistia.com/embed/medias/nz2q8p0ggt.jsonp');
      // this.loadScript('https://fast.wistia.com/embed/medias/s71l7yg23n.jsonp');
      // this.loadScript('https://fast.wistia.com/embed/medias/1op3mn2y4u.jsonp');
      // this.loadScript('https://fast.wistia.com/embed/medias/bfnvkwnc3a.jsonp');
      // this.loadScript('https://fast.wistia.com/embed/medias/im1fgqg76s.jsonp');
      // this.loadScript('https://fast.wistia.com/embed/medias/ley0dyvet4.jsonp');
      // this.loadScript('https://fast.wistia.com/embed/medias/hmuco955ji.jsonp');
      // this.loadScript('https://fast.wistia.com/embed/medias/mdrq00vwd5.jsonp');

  }


    getOAuthUrlForZuul(accessToken){
      this.accessTokenval = accessToken;
    }


  public loadScript(url) {
    let node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(node);
  }


  getBroserVersion(browserInfo) {
   
  }

  /** 
  * Called on page load
  **/
  ngOnInit() {

    this.accessTokenval = localStorage.getItem('a_token');
    this.username = localStorage.getItem('username');

    if(window.innerWidth < 1280) {
      this.showScreenMsg = true;
    }

    if(this.username && this.username != "") {
      this.dynamicmenu = false;
    }else{
      this.dynamicmenu = true;   
    }

    // setTimeout(() => {
    //  if(this.username && this.username != "") {
    //    this.loginService.getDisclaimerStatusForUser(this.username, "user").subscribe(
    //     (message: Object) => {
    //      var showstatus = message['status'] ;
    //      var showexpired = message['expire_value'];         
    //       if(showstatus == 'expired' || showexpired == 'true'){
    //        //this.router.navigate(['/logout']);
    //        this.router.navigate(['user/subscription']);
    //       }
    //     }, error => { console.log('Error: ' + error); });  
    //   }
    // },3000);

    // if(localStorage.getItem("user_plan") && localStorage.getItem("user_plan") != "") {   

    //    let userobj = {plan: localStorage.getItem("user_plan"),username: this.username};
    //    if(localStorage.getItem("user_plan") != ''){
    //     let plan = localStorage.getItem("user_plan");
    //     this.subscriptionservice.updateUserSubscription({
    //          'token': localStorage.getItem('access_token'), 
    //          'attribute' : 'custom:subscription_plan', 
    //          'value' : plan 
    //        }).subscribe((message: any) => {
    //           localStorage.removeItem('user_plan');
    //           if(message.status) {        
    //             let result = JSON.parse(localStorage.getItem('user'));
    //             for (let i = 0; i < result.length; i++) {          
    //               if(result[i].Name == 'custom:subscription_plan'){
    //                 result[i].Value = plan
    //               }
    //             }
    //             localStorage.setItem('user', JSON.stringify(result));                  
    //           }
    //         }, error =>  {
    //           console.log('error ', error);
    //         });
    //    }
    // }

    
    this.intervalcredits = setInterval(() => {
      if(localStorage.getItem("checkCreditsChanged") == "true") {              
          this.setUserData();
          this.profservice.getCreditsofUser(this.username, '',this.accessTokenval)
            .subscribe((messagecredits: any) => {
                messagecredits = messagecredits.data;
                this.nooftoken = (messagecredits.tokenbalance) ? messagecredits.tokenbalance : '';
                this.noofcredits = (messagecredits.creditsbalance) ? messagecredits.creditsbalance : '';
                this.blockedTokens1 = (messagecredits.blocked_tokens1) ? messagecredits.blocked_tokens1 : 0;
                this.blockedTokens2 = (messagecredits.blocked_tokens2) ? messagecredits.blocked_tokens2 : 0;
                this.blockedTokens3 = (messagecredits.blocked_tokens3) ? messagecredits.blocked_tokens3 : 0;

                this.leBarAvailable = (messagecredits.lebar_avail) ? messagecredits.lebar_avail : 0;
                this.leBarPurchase = (messagecredits.lebar_purchased) ? messagecredits.lebar_purchased : 0;
                //this.centsTotal = (messagecredits.cents_total) ? messagecredits.cents_total : 0;

                this.purpose1 = (messagecredits.purpose1) ? messagecredits.purpose1 : '';
                this.purpose2 = (messagecredits.purpose2) ? messagecredits.purpose2 : '';
                this.purpose3 = (messagecredits.purpose3) ? messagecredits.purpose3 : '';

                this.planstringval = this.planname +', LeBar: '+this.nooftoken+', Credits: '+this.noofcredits;
                localStorage.setItem("checkCreditsChanged", "false");

                //this.getTotalLebar();
            }, 
            error => {  
              localStorage.setItem("checkCreditsChanged", "false");
              console.log('Error: ' + error); 
            });
              
      }

      let loginvalue = localStorage.getItem('login_val_df');
      if(loginvalue == 'logged'){
        this.dynamicmenu = true;
      }else{
       
      }

      /* Check If User is authenticated after few seconds in other tab */

      if(localStorage.getItem('logoutCheck') == 'true') {

        localStorage.removeItem("logoutCheck");
        window.location.reload();

      }

    }, 5000);  

    this.setUserData();
  }

  sitefeedback(){
    this.opensitefeedback = true;
  }

  closesitefeedback(){
    this.opensitefeedback = false;
  }


  getTotalLebar(){

    this.profservice.getlebarTotal(this.username,this.accountNo,this.accessTokenval)
    .subscribe( (message: any) => {

      this.myLebarTotal = message.total;

    }, error => {
      // this.listloading = true;
      console.log('Error: ' + JSON.stringify(error));
    });

    this.profservice.getcentsTotal(this.username,this.accountNo,this.accessTokenval)
    .subscribe( (message: any) => {

      this.centsTotal = message.total;

    }, error => {
      // this.listloading = true;
      console.log('Error: ' + JSON.stringify(error));
    });

  }

  sendfeedback(){

      let userfeedObj = {name: this.selectedname, email: this.selectedemail, feed: this.selectedFeed};

          this.profservice.submitFeedbackForm(userfeedObj)
                .subscribe(
                   (messagecredits: any) => {
                       this.getSuccessMessage = true;
                       // console.log('Message Coming From is ===>', messagecredits.message,' All Message is ===>', messagecredits);
                        this.messagefeed = messagecredits.message;
                        this.selectedname = '';
                        this.selectedemail = '';
                        this.selectedFeed = '';
                       setTimeout(()=>{
                        this.getSuccessMessage = false;
                        this.opensitefeedback = false;
                      }, 5000);
                    }, 
          error => {  
            this.selectedname = '';
            this.selectedemail = '';
            this.selectedFeed = '';
            console.log('Error: ' + error); 
          });

  }

  closePopup(){
    this.showScreenMsg = false;
  }

  // openChildModalHomeVideo() : void{
  //     this.childModalHomeVideo.show();
  // }

  // closehideChildModalHomeVideo() : void{
  //     this.childModalHomeVideo.hide();
  // }

  visualfeeback(){
    this.visualFeebackVideo.show();
  }

  closehidevisualFeebackVideo() : void{
      this.visualFeebackVideo.hide();
  }


  // openChildModalFutureVideo() : void{
  //     this.childModalFutureVideo.show();
  // }

  // closehideChildModalFutureVideo() : void{
  //     this.childModalFutureVideo.hide();
  // }

  // openChildModalResourcesVideo() : void{
  //     this.childModalResourcesVideo.show();
  // }

  // closehideChildModalResourcesVideo() : void{
  //     this.childModalResourcesVideo.hide();
  // }

  // openChildModalMyplanVideo() : void{
  //     this.childModalMyplanVideo.show();
  // }

  // closehideChildModalMyplanVideo() : void{
  //     this.childModalMyplanVideo.hide();
  // }

  // openChildModalStrategyVideo() : void{
  //     this.childModalStrategyVideo.show();
  // }

  // closehideChildModalStrategyVideo() : void{
  //     this.childModalStrategyVideo.hide();
  // }

  // openChildModalArticleVideo() : void{
  //     this.childModalArticleVideo.show();
  // }

  // closehideChildModalArticleVideo() : void{
  //     this.childModalArticleVideo.hide();
  // }

  // openChildModalMyprofileVideo() : void{
  //     this.childModalMyprofileVideo.show();
  // }

  // closehideChildModalMyprofileVideo() : void{
  //     this.childModalMyprofileVideo.hide();
  // }

  // openChildModalMyprofileAuthorVideo() : void{
  //     this.childModalMyprofileAuthorVideo.show();
  // }

  // closehideChildModalMyprofileAuthorVideo() : void{
  //     this.childModalMyprofileAuthorVideo.hide();
  // }

  // openChildModalTradeboardVideo() : void{
  //     this.childModalTradeboardVideo.show();
  // }

  // closehideChildModalTradeboardVideo() : void{
  //     this.childModalTradeboardVideo.hide();
  // }

  // openChildModalStocksVideo() : void{
  //     this.childModalStocksVideo.show();
  // }

  // closehideChildModalStocksVideo() : void{
  //     this.childModalStocksVideo.hide();
  // }

  // openChildModalEtfVideo() : void{
  //     this.childModalEtfVideo.show();
  // }

  // closehideChildModalEtfVideo() : void{
  //     this.childModalEtfVideo.hide();
  // }

  // openChildModalForexVideo() : void{
  //     this.childModalForexVideo.show();
  // }

  // closehideChildModalForexVideo() : void{
  //     this.childModalForexVideo.hide();
  // }

  openChildModalDifference() : void{
      this.childModalDifference.show();
  }
  closeChildModalDifference() : void{
      this.childModalDifference.hide();
  }



  logoutuser(){
  
     
  }

  setUserData() {
     
    let result = JSON.parse(localStorage.getItem('user'));
    if(result) {
        for (let i = 0; i < result.length; i++) {          
              if(result[i].Name == 'custom:subscription_plan'){
                this.groupnm = result[i].Value;
                this.groupnm =  this.groupnm.toLowerCase();
              }
              //if(result[i].Name == 'custom:user_group'){ 
                //this.userGroup = result[i].Value;
                //this.userGroup =  this.userGroup.toLowerCase();
                this.userGroup =  'user';
                
                  if(result[i].Value == 'Author'){
                     this.authormenu = true;
                   }else{
                     this.authormenu = false;
                   }
               //}
               if(result[i].Name == 'picture'){
                 this.userpicture = result[i].Value;
               }
          }

          if(this.groupnm == 'gold'){
            this.groupnm = 'G';
            this.planname = 'Gold';
          }else if(this.groupnm == 'silver'){
            this.groupnm = 'S';
            this.planname = 'Silver';
          }else if(this.groupnm == 'platinum'){
            this.groupnm = 'P';
            this.planname = 'Platinum';
          }else if(this.groupnm == 'yearly'){
            this.groupnm = 'Y';
            this.planname = 'Yearly';
          }else{
            this.groupnm = 'B';
            this.planname = 'Basic';
          }

          // this.username
          this.profservice.getCreditsofUser(this.username, '',this.accessTokenval)
            .subscribe((messagecredits: any) => {
              messagecredits = messagecredits.data; 
        
              this.nooftoken =  (messagecredits.tokenbalance) ? messagecredits.tokenbalance : '';
              this.noofcredits = (messagecredits.creditsbalance) ? messagecredits.creditsbalance : '';
              this.blockedTokens1 = (messagecredits.blocked_tokens1) ? messagecredits.blocked_tokens1 : 0;
              this.blockedTokens2 = (messagecredits.blocked_tokens2) ? messagecredits.blocked_tokens2 : 0;
              this.blockedTokens3 = (messagecredits.blocked_tokens3) ? messagecredits.blocked_tokens3 : 0;

              this.leBarAvailable = (messagecredits.lebar_avail) ? messagecredits.lebar_avail : 0;
              this.leBarPurchase = (messagecredits.lebar_purchased) ? messagecredits.lebar_purchased : 0;
              //this.centsTotal = (messagecredits.cents_total) ? messagecredits.cents_total : 0;


              this.purpose1 = (messagecredits.purpose1) ? messagecredits.purpose1 : '';
              this.purpose2 = (messagecredits.purpose2) ? messagecredits.purpose2 : '';
              this.purpose3 = (messagecredits.purpose3) ? messagecredits.purpose3 : '';

              this.planstringval = this.planname +', LeBar: '+this.nooftoken+', Credits: '+this.noofcredits;
              this.showTokenBtn = true;
              this.accountNo = messagecredits.account_number;
              //this.registeredon = messagecredits.registeredon;
              localStorage.setItem("checkCreditsChanged", "false");
              localStorage.setItem("account_number", messagecredits.account_number);
              //this.registeredon = moment(this.registeredon).format("MMMM Do YYYY, h:mm:ss a");
              //this.registeredon = moment(Date.parse(this.registeredon)).format('MMMM Do YYYY, HH:mm:ss');
              //if(this.registeredon == 'Invalid date'){
               // this.registeredon = '';
              //}
              //localStorage.setItem('regsitered_date', this.registeredon);

              this.getTotalLebar();

            }, 
            error => {  
              console.log('Error: ' + error); 
            });

    }
    
  }


  callbackWithParam(result: any) {
       //console.log(result);
       //if(result && result != null && result.length) {
        for (let i = 0; i < result.length; i++) {

            if(result[i].getName() == 'custom:subscription_plan'){
              this.groupnm = result[i].getValue();
              this.groupnm =  this.groupnm.toLowerCase();
            }
            if(result[i].getName() == 'custom:user_group'){ 
              this.userGroup = result[i].getValue();
              this.userGroup =  this.userGroup.toLowerCase();
                if(result[i].getValue() == 'Author'){
                   this.authormenu = true;
                 }else{
                   this.authormenu = false;
                 }
             }
             if(result[i].getName() == 'picture'){
               this.userpicture = result[i].getValue();
             }
        }

          if(this.groupnm == 'gold'){
            this.groupnm = 'G';
            this.planname = 'Gold';
          }else if(this.groupnm == 'silver'){
            this.groupnm = 'S';
            this.planname = 'Silver';
          }else if(this.groupnm == 'platinum'){
            this.groupnm = 'P';
            this.planname = 'Platinum';
          }else if(this.groupnm == 'yearly'){
            this.groupnm = 'Y';
            this.planname = 'Yearly';
          }else{
            this.groupnm = 'B';
            this.planname = 'Basic';
          }



         // setTimeout(() => {
            this.profservice.getCreditsofUser(this.username, '',this.accessTokenval)
              .subscribe((messagecredits: any) => {
                //console.log("this4")
                messagecredits = messagecredits.data; 
                this.nooftoken =  (messagecredits.tokenbalance) ? messagecredits.tokenbalance : '';
                this.noofcredits = (messagecredits.creditsbalance) ? messagecredits.creditsbalance : '';
                this.blockedTokens1 = (messagecredits.blocked_tokens1) ? messagecredits.blocked_tokens1 : 0;
                this.blockedTokens2 = (messagecredits.blocked_tokens2) ? messagecredits.blocked_tokens2 : 0;
                this.blockedTokens3 = (messagecredits.blocked_tokens3) ? messagecredits.blocked_tokens3 : 0;                

                this.planstringval = this.planname +', LeBar: '+this.nooftoken+', Credits: '+this.noofcredits;
                 this.showTokenBtn = true;
                //this.registeredon = messagecredits.registeredon;
                localStorage.setItem("checkCreditsChanged", "false");
                //this.registeredon = moment(this.registeredon).format("MMMM Do YYYY, h:mm:ss a");
                //if(this.registeredon == 'Invalid date'){
                  //this.registeredon = '';
                //}
                //localStorage.setItem('regsitered_date', this.registeredon);
              }, 
              error => {  
                 console.log('Error: ' + error); 
              });
          //},1000);

        //} else {
         // this.router.navigate(['/login']);
        //}

  }
  callback() {

  }

  cognitoCallbacksub(message: string, result: any) {}

  /** 
  * Open Mobile Menu
  **/
  openMobileNav() {
    $('.sub_menu_things').removeClass('visible');
    $('.sub_menu').removeClass('visible');
    $('#mySidenav').slideToggle('slow'); 
    //let menuW = document.getElementById("mySidenav").style.display;
   // if(menuW === 'none') {
    //  document.getElementById("mySidenav").style.display = "block";
   // } else {
    //  document.getElementById("mySidenav").style.display = "none";
    //}
  }

  /** 
  * Close Mobile Menu
  **/
  closeMobileNav() {
     //document.getElementById("mySidenav").style.display = "none";
  }

  /**
  * Add Display Class To Sub Menu When HoverOn Main Menu
  **/
  mouseEnter(className: string) {

      if($('ul.sub_menu_things.' + className + '-sub').hasClass('visible') == true) {
        $('.sub_menu_things').removeClass('visible');
      } else {
        $('.sub_menu_things').removeClass('visible');
        $('.' + className + '-sub').addClass('visible');
      }
  }

  /**
  * For Level 2 menu
  **/
  mouseEnterSub(className: string) { console.log('open submenu ', '.' + className + '-sub-menu');
      $('.sub-menu').removeClass('visible');
      $('.sub-menu-3').removeClass('visible');
      if($('.' + className + '-sub-menu').hasClass('visible')) {
        $('.' + className + '-sub-menu').removeClass('visible');
      } else {
        $('.' + className + '-sub-menu').addClass('visible');
      }
  }

  /** 
  * For Level 3 Menu
  **/
  showSub3Menu(className: string) {
    $('.sub-menu-3').removeClass('visible');
    $('.'+ className +'-sub-menu-3').addClass('visible');
  }

  // isLoggedIn(message: string, isLoggedIn: boolean,group: string,user: string) {
      
  //       if (isLoggedIn){
  //           this.username = user;
  //           this.userParams.getParameters(this);
  //           this.dynamicmenu = false;
  //       }else{
  //           this.dynamicmenu = true;           
  //       }
  //   }

  public toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
    this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    return false;
  }

  public scrolledChanged(isScrolled) {
    this.isScrolled = isScrolled;
  }

  ngOnDestroy() {
        if (this.intervalcredits) {
          clearInterval(this.intervalcredits);
        }
        if(this.intervalCancelMembership){
           clearInterval(this.intervalCancelMembership);
        }
   }

}