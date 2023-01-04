import {Component,Output,ViewChild,EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import {GlobalState} from '../../../global.state';

import 'style-loader!./baPageTop.scss';
import { Modals } from '../../../pages/ui/components/modals/modals.component';
//import { UserDynamoDbData } from '../../../../../api/user-dynamodb-data';
import * as moment from 'moment';
import { ModalDirective } from 'ng2-bootstrap';

@Component({
  selector: 'ba-page-top',
  templateUrl: './baPageTop.html',
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

  constructor(public router: Router,private _state:GlobalState) {
      
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

    
    this.setUserData();
  }

  sitefeedback(){
    this.opensitefeedback = true;
  }

  closesitefeedback(){
    this.opensitefeedback = false;
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