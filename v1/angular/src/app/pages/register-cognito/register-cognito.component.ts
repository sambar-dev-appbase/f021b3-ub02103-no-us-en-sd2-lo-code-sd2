import {Component} from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
import { InternationalPhoneModule } from 'ng4-intl-phone';
import { BaImageLoaderService, BaThemePreloader, BaThemeSpinner } from '../../theme/services';
//import {UserRegistrationService, CognitoCallback} from "../cognito-service/cognito.service";
import {RegisterCognitoService} from "./register-cognito-update.service";

import 'assets/js/sweetalert.min.js';
declare let swal: any;

export class RegistrationUser {
    name: string;
    first_name: string;
    middle_name: string = '';
    last_name: string;
    email: string;
    password: string;
    username: string;
    gender: string;
    locale: string;
    street_number: string;
    address_street1: string;
    address_street2: string;
    postal_code: string;
    city: string;
    state: string;
    country: string;
    qualification: string;
    phone_number: string;
    picture: string;
    cover_pic: string;
    subscription: string;
    UserGroup: string;
    agree: boolean;
    agree1: boolean;
    agree2: boolean;
    agree3: boolean;
    confirmpassword: string;
    user_url: string;
    amount: string;
    invitation: string;
    group_trade: string;
    dob: string= '';
    day: string= '';
    month: string= '';
    years: string= '';
    taxId: string;
    id_proof: string;
    tax_id_proof: string;
    tax_form: string;
    country_citizenship: string = '';
    permanent_resident1: string = '';
    permanent_resident2: string = '';
    permanent_resident3: string = '';
    country_citizenship2:string = '';
}

@Component({
  selector: 'register-cognito',
  styleUrls: ['./register-cognito.scss'],
  templateUrl: './register-cognito.html',
})
export class RegisterCognito {

  registrationUser: RegistrationUser;
  errorMessage: string;
  successMessage: string;
  public showLoader:boolean;
  private sub: any;
  public user_type:string = 'User';
  public register_title: string = 'Register as User';
  public captcharesponse: string;
  public plansData: any;
  public stripePublicKey: any;
  public planbaseduser:string = 'true';
  public showTaxInfo:boolean = false;
  public helpGroup:boolean = false;
  public maxdb: any;
  public totaldays: any;
  public totalyears: any;
  public days: any;
  public years: any;


  constructor(public router: Router,public route: ActivatedRoute,private _spinner: BaThemeSpinner, public regservice: RegisterCognitoService,private _location: Location) {
    
    this.onInit();

    this.errorMessage = "* Required";
    this.successMessage = null;
     // BaThemePreloader.load().then((values) => {
     //      this._spinner.show();
     //  });

     this.registrationUser.gender = 'Male';

     this.route.queryParams.subscribe(queryParams => {
        
        if(queryParams && queryParams.plan && queryParams.plan !=='') {
          this.registrationUser.subscription = queryParams.plan;
        }
        
      });

      this.totaldays = 31;
      this.totalyears = 100;

      this.days = [];
      for (var i = 0; i < this.totaldays; i += 1) {
          this.days.push(i + 1);
      }

      this.years = [];
      var currentYear = new Date().getFullYear() - 15;
      for (var i = currentYear; i > currentYear - this.totalyears; i--) {
          this.years.push(i - 1);
      }
  }
    
   public ngAfterViewInit(): void {
        // by defulat collpase sidebar
      setTimeout(() => {
        BaThemePreloader.load().then((values) => {
                this._spinner.hide();
             });
      }, 500);  

      // hide spinner once all loaders are completed 
  }

    resolved(captchaResponse: string) {

        this.captcharesponse = captchaResponse;
        return false;
    }
    

    // UB05F Validation Check to remove special character and blank space

    omit_special_char(event)
    {   
       var k;  
       var keyID = (event.charCode) ? event.charCode : ((event.which) ? event.which : event.keyCode);
       var val = ((keyID > 64 && keyID < 91) || (keyID > 96 && keyID < 123) || keyID == 8 || keyID === 95 || keyID === 46 || keyID === 45 || (keyID >= 48 && keyID <= 57)); 
       return val;
    }

    // UB05F Validaion Ends here

    checkPhoneNumber() {
   
    }

    onInit() {

        // this.subscriptionservice.getPlansFromDynamoDb(true).subscribe(
        //     (message: any) => {
              
        //      this.plansData = message;

        //     },error => { console.log('Error: ' + error); 
        // });

        this.registrationUser = new RegistrationUser();
        this.captcharesponse = null;
        
        this.registrationUser.gender = "0";
        this.registrationUser.subscription = "silver";
        this.registrationUser.UserGroup = "User";
        this.registrationUser.qualification = "";
        this.registrationUser.picture = '/app/v1/assets/img/no-photo.png';
        this.registrationUser.id_proof = '';
        this.registrationUser.tax_id_proof = '';
        this.registrationUser.tax_form = '';
        this.registrationUser.taxId = '';
        this.registrationUser.country = 'United States of America';
        this.registrationUser.group_trade = 'No';
        this.registrationUser.agree = false;
        this.registrationUser.agree1 = true;
        this.registrationUser.agree2 = true;
        this.registrationUser.agree3 = true;
        this.sub = this.route.params.subscribe(params => {
            this.user_type = params['usertype'];
            if(this.user_type == 'analyst'){
              this.registrationUser.UserGroup = "Author";
              this.register_title = 'Register as Analyst';
              this.planbaseduser = 'false';
              this.registrationUser.subscription = "basic";
              this.registrationUser.picture = '';
            }else{
              this.user_type = 'User';
            }

            //this.router.navigate(['/register']);
        });

        // this.subscriptionservice.getStripeKey()
        //   .subscribe(
        //     (response: any) => {
        //       this.stripePublicKey = response.STRIPE_PUBLIC_KEY;
        //     },
        //     error =>  {
        //          console.log('Error: ' + JSON.stringify(error));
        //    }); 
    }
    backhistory(){
       if(document.referrer == ''){
           window.location.href = '/';
        }else{
           this._location.back();
        }
    }

    openWindow(nativeWindow) {
        
    }


   //  public fileChangeEvent(fileInput: any){
   //     $('#imageDiv').removeClass('input-required');
   //     let thisDuplicate = this;
   //     if (fileInput.target.files && fileInput.target.files[0]) {
   //       let filseSize = fileInput.target.files[0].size;
   //       $('#uploadFile').html(fileInput.target.files[0].name);
   //       if(filseSize < 4194304) {
   //         let reader = new FileReader();
   //          reader.onload = function (e : any) {
   //           let image = new Image();
   //           image.src = e.target.result;
   //           image.onload = function() {
   //               //first upload image and get s3 URL
   //               thisDuplicate.profservice.uploadImage(e.target.result).subscribe((response: any) => {
   //                   if(response && response.status) {
   //                     thisDuplicate.registrationUser.picture = response.s3ImageUrl;
   //                   } else {
   //                   }
   //               }, error => {
   //                   console.log('Error uploading image to S3', error);
   //               });
   //           };
   //         }
   //         reader.readAsDataURL(fileInput.target.files[0]);
   //       } else {

   //         this.errorMessage = 'Profile image should be less than 2MB.';
   //       }
   //   }
   // }

   // public fileIDChangeEvent(fileInput: any){
   //     $('#imageDivIdProof').removeClass('input-required');
   //     let thisDuplicate = this;
   //     if (fileInput.target.files && fileInput.target.files[0]) {
   //       let filseSize = fileInput.target.files[0].size;
   //       $('#uploadFileID').html(fileInput.target.files[0].name);
   //       if(filseSize < 4194304) {
   //         let reader = new FileReader();
   //          reader.onload = function (e : any) {
   //           let image = new Image();
   //           image.src = e.target.result;
   //           image.onload = function() {
   //               //first upload image and get s3 URL
   //               thisDuplicate.profservice.uploadImage(e.target.result).subscribe((response: any) => {
   //                   if(response && response.status) {
   //                     thisDuplicate.registrationUser.id_proof = response.s3ImageUrl;
   //                     $(".choose_fileID").html("Replace File");
   //                   } else {
   //                   }
   //               }, error => {
   //                   console.log('Error uploading image to S3', error);
   //               });
   //           };
   //         }
   //         reader.readAsDataURL(fileInput.target.files[0]);
   //       } else {

   //         this.errorMessage = 'Profile image should be less than 2MB.';
   //       }
   //   }
   // }

   // public fileTAXIDChangeEvent(fileInput: any){
   //     $('#imageDivTaxIdProof').removeClass('input-required');
   //     let thisDuplicate = this;
   //     if (fileInput.target.files && fileInput.target.files[0]) {
   //       let filseSize = fileInput.target.files[0].size;
   //       $('#uploadFileTAXID').html(fileInput.target.files[0].name);
   //       if(filseSize < 4194304) {
   //         let reader = new FileReader();
   //          reader.onload = function (e : any) {
   //           let image = new Image();
   //           image.src = e.target.result;
   //           image.onload = function() {
   //               //first upload image and get s3 URL
   //               thisDuplicate.profservice.uploadImage(e.target.result).subscribe((response: any) => {
   //                   if(response && response.status) {
   //                     thisDuplicate.registrationUser.tax_id_proof = response.s3ImageUrl;
   //                     $(".choose_fileTaxID").html("Replace File");
   //                   } else {
   //                   }
   //               }, error => {
   //                   console.log('Error uploading image to S3', error);
   //               });
   //           };
   //         }
   //         reader.readAsDataURL(fileInput.target.files[0]);
   //       } else {

   //         this.errorMessage = 'Profile image should be less than 2MB.';
   //       }
   //   }
   // }


   restrictNumeric(e) {
    let input;
    if (e.metaKey || e.ctrlKey) {
      return true;
    }
    if (e.which === 32) {
     return false;
    }
    if (e.which === 0) {
     return true;
    }
    if (e.which < 33) {
      return true;
    }
    input = String.fromCharCode(e.which);
    return !!/[\d\s]/.test(input);
   }

   grouptradeVal(value){

     //console.log(value);

     if(value == 'Yes'){
       this.showTaxInfo = true;
       this.registrationUser.group_trade = 'Yes';
     }else{
       this.showTaxInfo = false;
       this.registrationUser.group_trade = 'No';
     }

   }


    onRegister() {

        this.registrationUser.locale = this.registrationUser.address_street1;

        if(this.registrationUser.middle_name == ''){

          this.registrationUser.name = this.registrationUser.first_name+' '+ this.registrationUser.last_name;

        }else{

          this.registrationUser.name = this.registrationUser.first_name + ' '+ this.registrationUser.middle_name + ' '+ this.registrationUser.last_name;
        }


        let thisDuplicate = this;
        $('input, #imageDiv').removeClass('input-required');
        $('input, textarea, #uploadBtn').each(function(value) {
          
          if($(this).attr('name') === 'agree' && !thisDuplicate.registrationUser.agree) {
            $(this).addClass('input-required');
          }
          if(!$(this).val() ||  $(this).val() == '' || $(this).val() == 'undefined') {
            $(this).addClass('input-required');
          }
        });

        setTimeout(function(){

            $("#signupMiddleName").removeClass("input-required");
            $("#address_street2").removeClass("input-required");

          }, 500);

        if(typeof(this.registrationUser.name) == "undefined" || this.registrationUser.name == ''){
             this.errorMessage = "* Required";
             BaThemePreloader.load().then((values) => {
                this._spinner.hide();
             });
             $("html, body").animate({ scrollTop: $('#pageTop').offset().top }, 500);

             return false;
        }

        if(typeof(this.registrationUser.permanent_resident1) == "undefined" || this.registrationUser.permanent_resident1 == ''){
             this.errorMessage = "* Required";
             BaThemePreloader.load().then((values) => {
                this._spinner.hide();
             });
             $("html, body").animate({ scrollTop: $('#pageTop').offset().top }, 500);

             return false;
        }


        if(typeof(this.registrationUser.permanent_resident2) == "undefined" || this.registrationUser.permanent_resident2 == ''){
             this.errorMessage = "* Required";
             BaThemePreloader.load().then((values) => {
                this._spinner.hide();
             });
             $("html, body").animate({ scrollTop: $('#pageTop').offset().top }, 500);

             return false;
        }


        if(typeof(this.registrationUser.country_citizenship) == "undefined" || this.registrationUser.country_citizenship == ''){
             this.errorMessage = "* Required";
             BaThemePreloader.load().then((values) => {
                this._spinner.hide();
             });
             $("html, body").animate({ scrollTop: $('#pageTop').offset().top }, 500);

             return false;
        }


        if(typeof(this.registrationUser.country_citizenship2) == "undefined" || this.registrationUser.country_citizenship2 == ''){
             this.errorMessage = "* Required";
             BaThemePreloader.load().then((values) => {
                this._spinner.hide();
             });
             $("html, body").animate({ scrollTop: $('#pageTop').offset().top }, 500);

             return false;
        }

        if(this.registrationUser.group_trade == 'Yes'){

          if(typeof(this.registrationUser.day) == "undefined" || this.registrationUser.day == ''){
               this.errorMessage = "* Required";
               BaThemePreloader.load().then((values) => {
                  this._spinner.hide();
               });
               $("html, body").animate({ scrollTop: $('#pageTop').offset().top }, 500);

               return false;
          }

          if(typeof(this.registrationUser.month) == "undefined" || this.registrationUser.month == ''){
               this.errorMessage = "* Required";
               BaThemePreloader.load().then((values) => {
                  this._spinner.hide();
               });
               $("html, body").animate({ scrollTop: $('#pageTop').offset().top }, 500);

               return false;
          }

          if(typeof(this.registrationUser.years) == "undefined" || this.registrationUser.years == ''){
               this.errorMessage = "* Required";
               BaThemePreloader.load().then((values) => {
                  this._spinner.hide();
               });
               $("html, body").animate({ scrollTop: $('#pageTop').offset().top }, 500);

               return false;
          }

          if(typeof(this.registrationUser.taxId) == "undefined" || this.registrationUser.taxId == ''){
               this.errorMessage = "* Required";
               BaThemePreloader.load().then((values) => {
                  this._spinner.hide();
               });
               $("html, body").animate({ scrollTop: $('#pageTop').offset().top }, 500);

               return false;
          }

          if(typeof(this.registrationUser.id_proof) == "undefined" || this.registrationUser.id_proof == ''){
               this.errorMessage = "* Required";
               BaThemePreloader.load().then((values) => {
                  this._spinner.hide();
               });
               $("html, body").animate({ scrollTop: $('#pageTop').offset().top }, 500);

               return false;
          }

          if(typeof(this.registrationUser.tax_id_proof) == "undefined" || this.registrationUser.tax_id_proof == ''){
               this.errorMessage = "* Required";
               BaThemePreloader.load().then((values) => {
                  this._spinner.hide();
               });
               $("html, body").animate({ scrollTop: $('#pageTop').offset().top }, 500);

               return false;
          }

          this.registrationUser.dob = this.registrationUser.day + '-'+ this.registrationUser.month + '-'+ this.registrationUser.years;

        }
        

        var emailvalidating =  /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}$/;

        var testingemailvalidation =  emailvalidating.test((this.registrationUser.email));
         
          if(testingemailvalidation ===  true){

          }else{

            this.errorMessage = 'Invalid email address.';
             BaThemePreloader.load().then((values) => {
                this._spinner.hide();
             });
              $('#signupEmail').addClass('input-required');
             $("html, body").animate({ scrollTop: $('#pageTop').offset().top }, 500);
             return false;

          }


        if(typeof(this.registrationUser.email) == "undefined" || this.registrationUser.email == ''){
             this.errorMessage = "* Required";
             BaThemePreloader.load().then((values) => {
                this._spinner.hide();
             });
             $("html, body").animate({ scrollTop: $('#pageTop').offset().top }, 500);
             return false;
        }
        if(typeof(this.registrationUser.locale) == "undefined" || this.registrationUser.locale == ''){
             this.errorMessage = "* Required";
             BaThemePreloader.load().then((values) => {
                this._spinner.hide();
             });
             $("html, body").animate({ scrollTop: $('#pageTop').offset().top }, 500);
             return false;
        }
        if(typeof(this.registrationUser.phone_number) == "undefined" || this.registrationUser.phone_number == ''){
             this.errorMessage = "* Required";
             BaThemePreloader.load().then((values) => {
                this._spinner.hide();
             });
             $("html, body").animate({ scrollTop: $('#pageTop').offset().top }, 500);
             return false;
        }
        if(typeof(this.registrationUser.username) == "undefined" || this.registrationUser.username == ''){
             this.errorMessage = "* Required";
             BaThemePreloader.load().then((values) => {
                this._spinner.hide();
             });
             $("html, body").animate({ scrollTop: $('#pageTop').offset().top }, 500);
             return false;
        }
        if(typeof(this.registrationUser.password) == "undefined" || this.registrationUser.password == ''){
             this.errorMessage = "* Required";
             BaThemePreloader.load().then((values) => {
                this._spinner.hide();
             });
             $("html, body").animate({ scrollTop: $('#pageTop').offset().top }, 500);
             return false;
        }

        if(this.registrationUser.phone_number.length < 12 ){

             this.errorMessage = "Phone number is least 11 digits or higher, including country code.";
             BaThemePreloader.load().then((values) => {
                this._spinner.hide();
             });
             //$('#signupEmail').addClass('input-required');
             $("html, body").animate({ scrollTop: $('#pageTop').offset().top }, 500);
             return false;
        }

        var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        var testing =  re.test((this.registrationUser.password));
       
        if(testing ===  true){

        }else{

          this.errorMessage = 'Password must have at least 8 characters (one number, one lowercase, one uppercase, one special character)';
           BaThemePreloader.load().then((values) => {
              this._spinner.hide();
           });
           $('#signupPassword').addClass('input-required');
           $("html, body").animate({ scrollTop: $('#pageTop').offset().top }, 500);
           return false;

        }
        
        if(this.registrationUser.password === this.registrationUser.confirmpassword ){
             
        }else{
             this.errorMessage = "Password and confirm password do not match.";
             BaThemePreloader.load().then((values) => {
                this._spinner.hide();
             });
             $('#signupConfirmPassword').addClass('input-required');
             $("html, body").animate({ scrollTop: $('#pageTop').offset().top }, 500);
             return false;
        }
        
        if(this.captcharesponse == null){

             this.errorMessage = "Check the recaptcha box";
             BaThemePreloader.load().then((values) => {
                this._spinner.hide();
             });
             $("html, body").animate({ scrollTop: $('#pageTop').offset().top }, 500);
             return false;
        }


        if(this.registrationUser.agree == false ){
             this.errorMessage = "Agree to the Legal Terms and Conditions, Privacy Policy, Trading Disclaimer, Pre-Release Agreement, and Cookie Policy.";
             BaThemePreloader.load().then((values) => {
                this._spinner.hide();
             });
             $("html, body").animate({ scrollTop: $('#pageTop').offset().top }, 500);
             return false;
        }


        if(!this.registrationUser.subscription){
             this.errorMessage = "Plan is required";
             BaThemePreloader.load().then((values) => {
                this._spinner.hide();
             });
             $("html, body").animate({ scrollTop: $('#pageTop').offset().top }, 500);
             return false;
        }

          var check_phone = this.registrationUser.phone_number;
          if(this.registrationUser.phone_number != null ){
            if( check_phone.indexOf('+') >= 0){
            }else{
             this.registrationUser.phone_number = '+' + this.registrationUser.phone_number;
            }
          }
          
          let planAmount = this.plansData.price_total_basic;
          let planName = 'Basic Plan';
          
          if(this.registrationUser.subscription === 'silver') {
            planAmount = this.plansData.price_total_silver;
            planName = 'Silver Plan';
          } else if(this.registrationUser.subscription === 'gold') {
            planAmount = this.plansData.price_total_gold;
            planName = 'Gold Plan';
          } else if(this.registrationUser.subscription === 'platinum') {
            planAmount = this.plansData.price_total_platinum;
            planName = 'Platinum Plan';
          } else if(this.registrationUser.subscription === 'yearly') {
            planAmount = this.plansData.price_total_yearly;
            planName = 'Yearly Plan';
          } else {
            planAmount = this.plansData.price_total_basic;
            planName = 'Basic Plan';
          }
          let planMessage = 'Enter payment details.';

          // UB05F Make Username Lowercase

          this.registrationUser.username = this.registrationUser.username.toLowerCase();

         this.regservice.checkPhoneNumber(this.registrationUser.phone_number)
          .subscribe((message: any) => { 

            //console.log('Checking Phone');
            if(message && message.status) {

              //console.log('Message ',message.message);
              this.errorMessage = message.message;
              BaThemePreloader.load().then((values) => {
                this._spinner.hide();
             });
              $("html, body").animate({ scrollTop: $('#pageTop').offset().top }, 500);
              return false;

          }else{


              this.regservice.register(this.registrationUser).subscribe((message: any) => {                         
                              
                if(message.status) {

                  localStorage.setItem('confirm_pass',  this.registrationUser.password);
                  localStorage.setItem('reg_plan',  this.registrationUser.subscription);
                  
                   this.router.navigate(['/confirm-registration-cognito' + '/' + this.registrationUser.username],{ queryParams: { type: this.registrationUser.UserGroup }});   

                } else {
                  this.errorMessage = message.message;
                }

              }, error =>  {
                console.log('error ', error);
              });

          }
          
          }, error =>  {
            console.log('error ', error);
          });




          //check duplicate email in wpdb
          // this.regservice.checkEmail(this.registrationUser.email).subscribe((message: any) => {
          //     BaThemePreloader.load().then((values) => {
          //         this._spinner.show();
          //     });
          //     if(message && !message.success) {
          //       this.errorMessage = message.message;
          //       BaThemePreloader.load().then((values) => {
          //         this._spinner.hide();
          //       });
          //       $("html, body").animate({ scrollTop: $('#pageTop').offset().top }, 500);
          //       return false;
          //     } else {
             
          //     this.registrationUser.username = this.registrationUser.username.replace(/\s/g,'');
          //     this.regservice.checkUserName(this.registrationUser.username)
          //       .subscribe((message: any) => {            
          //         if(message && !message.success) {
          //           this.errorMessage = message.message;
          //           BaThemePreloader.load().then((values) => {
          //             this._spinner.hide();
          //          });
          //           $("html, body").animate({ scrollTop: $('#pageTop').offset().top }, 500);
          //           return false;
          //         } else {                   
          //           this.errorMessage = null;

          //           // check invitation code
          //           this.regservice.checkInvitationCode(this.registrationUser.invitation)
          //             .subscribe((message: any) => {            
          //               if(message && !message.success) {
          //                 // this.errorMessage = message.message;
          //                 this.errorMessage = "This Invitation code isn't valid."
          //                 BaThemePreloader.load().then((values) => {
          //                   this._spinner.hide();
          //                });
          //                 $("html, body").animate({ scrollTop: $('#pageTop').offset().top }, 500);
          //                 return false;
          //               } else {                   
          //                 this.errorMessage = null;
          //                 this.openStripeCheckout(planAmount, planName, planMessage);
          //               }
          //             }, error =>  {
          //               console.log('error ', error);
          //             });                    
          //         }
          //       }, error =>  {
          //         console.log('error ', error);
          //       });
          //   }
          // }, error =>  {
          //   console.log('error ', error);
          // });
         
    }


    setInvitationCode(obj) {
      this.regservice.setInvitationCode(obj)
            .subscribe((message: any) => {  
              console.log('setInvitationCode message ', message);
            }, error =>  {
              console.log('error ', error);
            });
    }


    // openStripeCheckout(planAmount, planName, stripeBoxMessage ) {
    //   let thisDuplicate = this;
    //   setTimeout(function () {
    //     BaThemePreloader.load().then((values) => {
    //       thisDuplicate._spinner.hide();
    //     });
    //   },1500);
    //   $("html, body").animate({ scrollTop: $('#pageTop').offset().top }, 500);

    //   var handler = (<any>window).StripeCheckout.configure({
    //     key: this.stripePublicKey,
    //     locale: 'auto',
    //     token: function (token: any) {
    //       let paymentObj = {amount: 0, stripeEmail: '', subscription: '', stripeToken: '',username: '', plan: '', card : {}, userObj: thisDuplicate.registrationUser};
    //       paymentObj.amount = planAmount * 100;
    //       paymentObj.stripeEmail = token.email;
    //       paymentObj.subscription = planName;
    //       paymentObj.stripeToken = token.id;
    //       paymentObj.card = token.card;
    //       thisDuplicate.subscriptionservice.updateSubscriptionRegister(paymentObj).subscribe(
    //         (message: any) => {
    //                if(message.success == true){
    //                   // create the user in DB
    //                   thisDuplicate.successMessage = 'Registration successful.';
    //                   thisDuplicate.registrationUser.amount = planAmount;
                      
    //                   // new register
    //                   thisDuplicate.regservice.register(thisDuplicate.registrationUser).subscribe((message: any) => {                         
                          
    //                       if(message.status) {

    //                         // update the invitation code for registered user.
    //                         thisDuplicate.setInvitationCode({
    //                           code: thisDuplicate.registrationUser.invitation,
    //                           email: thisDuplicate.registrationUser.email,
    //                           name: thisDuplicate.registrationUser.username
    //                         });

    //                         /* Register With Wordpress */
    //                         thisDuplicate.regservice.getRegisterUserWordpress(thisDuplicate.registrationUser)
    //                             .subscribe((message: any) => {
    //                               // console.log("message")
    //                             }, error =>  {
    //                               console.log('error ', error);
    //                             });

    //                           thisDuplicate.regservice.getRegisterUserCommunity(thisDuplicate.registrationUser).subscribe((message: any) => {
                                  
    //                             }, error =>  {
    //                               console.log('error ', error);
    //                             });
    //                         /* Ends Here*/
                            
    //                         localStorage.setItem('confirm_pass',  thisDuplicate.registrationUser.password);
    //                         localStorage.setItem('reg_plan',  thisDuplicate.registrationUser.subscription);
                            
    //                          thisDuplicate.router.navigate(['/confirm-registration' + '/' + thisDuplicate.registrationUser.username],{ queryParams: { type: thisDuplicate.registrationUser.UserGroup }});   

    //                       } else {
    //                         thisDuplicate.errorMessage = message.message;
    //                       }

    //                     }, error =>  {
    //                       console.log('error ', error);
    //                     });

    //                   handler.close();

    //                }else{
    //                  BaThemePreloader.load().then((values) => {
    //                     thisDuplicate._spinner.hide();
    //                   });
    //                  handler.close();
    //                  thisDuplicate.errorMessage = message.message;
    //                  //console.log('stripe payment failed.');
    //                }
    //             }, 
    //             error => { console.log('Error: ' + error); });
    //       }
    //   });

    //   handler.open({
    //     name: planName,
    //     description: stripeBoxMessage,
    //     amount: planAmount * 100,
    //     closed: function () {                
    //           BaThemePreloader.load().then((values) => {
    //             thisDuplicate._spinner.hide();
    //           });
    //        }
    //   });
    // }


    backClicked() {
        this._location.back();
    }

}
