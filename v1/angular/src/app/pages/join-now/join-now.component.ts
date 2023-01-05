import {Component, OnInit, OnDestroy} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import { InternationalPhoneModule } from 'ng4-intl-phone';
import { RegisterService } from "../register/register-update.service";
import { BaImageLoaderService, BaThemePreloader, BaThemeSpinner } from '../../theme/services';
import 'style-loader!./join-now.scss';

@Component({
    selector: 'join-now',
    templateUrl: './join-now.html',
    providers: [ 
      RegisterService
  ]
})
export class JoinNowComponent  {
    email: string;
    errorMessage: string;
    phoneno: string;
    successMessage: string;
    username: string;
    first_name: string;
    last_name: string;
    country: string = '';
    public showLoader:boolean;
    captcharesponse: string;

    constructor(public router: Router,private _spinner: BaThemeSpinner, public regservice: RegisterService) {
        this.errorMessage = null;
        this.errorMessage = "* Required";

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
          //console.log(captchaResponse);
          this.captcharesponse = captchaResponse;
          return false;
         // console.log('Resolved captcha with response ${captchaResponse}:');
    }

    isLoggedIn(message: string, isLoggedIn: boolean) {
        if (isLoggedIn){
            this.router.navigate(['/user/strategies-list']);
        }else{
            console.log('Here');
        }
    }

    onNext() {
        BaThemePreloader.load().then((values) => {
          this._spinner.show();
        });
        this.errorMessage = null;
        if (this.email == null || this.phoneno == null || this.first_name == null || this.last_name == null || this.country == null ) {

            this.errorMessage = "* Required";
            BaThemePreloader.load().then((values) => {
             this._spinner.hide();
            });
            return;

        }else if(this.captcharesponse == null) {

            //console.log('I am Here');
            this.errorMessage = "Check the recaptcha box.";
            BaThemePreloader.load().then((values) => {
              this._spinner.hide();
            });
            return;

        } else {


          this.regservice.joinUser({first_name: this.first_name,last_name: this.last_name, email: this.email, phone: this.phoneno, country: this.country})
          .subscribe((response: any) => {

            BaThemePreloader.load().then((values) => {
              this._spinner.hide();
            });
            if(response.success) {

               this.successMessage = 'Your details are submitted. We will revert back to you soon.';

               setTimeout(() => {

                BaThemePreloader.load().then((values) => {
                  this._spinner.show();
                });

                this.router.navigate(['/login/']);
               }, 3000);

            } else {
              BaThemePreloader.load().then((values) => {
               this._spinner.hide();
              }); 
              this.errorMessage = response.message;
              this.successMessage = null;
            }

          }, error =>  {
            this.errorMessage = 'Invalid Details Provided.';
            this.successMessage = null;
            BaThemePreloader.load().then((values) => {
             this._spinner.hide();
            });                  
            console.log('error ', error);
          }) 
        }
        
    }

}
