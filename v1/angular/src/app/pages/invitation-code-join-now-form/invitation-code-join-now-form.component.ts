import {Component, OnInit, OnDestroy} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import { InternationalPhoneModule } from 'ng4-intl-phone';
import { InvitationCodeJoinNowFormService } from "./invitation-code-join-now-form.service";
import { BaImageLoaderService, BaThemePreloader, BaThemeSpinner } from '../../theme/services';
import 'style-loader!./invitation-code-join-now-form.component.scss';

@Component({
    selector: 'app-invitation-code-join-now-form',
    templateUrl: './invitation-code-join-now-form.component.html',
    providers: [ 
      InvitationCodeJoinNowFormService
  ]
})
export class InvitationCodeJoinNowFormComponent  {  
    //ui0209_f12.p03
    email: string;
    errorMessage: string;
    phoneNumber: string;
    successMessage: string;
    username: string;
    firstName: string;
    lastName: string;
    country: string = '';
    public showLoader:boolean;
    captcharesponse: string;

    constructor(public router: Router,private _spinner: BaThemeSpinner, public invitationcodejoinnowservice: InvitationCodeJoinNowFormService) {
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
            //this.router.navigate(['/user/strategies-list']);
            window.location.href = '/ub02115/v1/user/strategies-list';
        }else{
            console.log('Here');
        }
    }

    onNext() {
        BaThemePreloader.load().then((values) => {
          this._spinner.show();
        });
        this.errorMessage = null;
        if (this.email == null || this.phoneNumber == null || this.firstName == null || this.lastName == null || this.country == null ) {

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


          this.invitationcodejoinnowservice.invitationCodeJoinNow({firstName: this.firstName,lastName: this.lastName, email: this.email, phoneNumber: this.phoneNumber, country: this.country})
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

                //this.router.navigate(['/login/']);
                window.location.href = '/ub02106/v1/login/';

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
