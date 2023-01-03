import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { Ng2UploaderModule } from 'ng2-uploader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InternationalPhoneModule } from 'ng4-intl-phone';
import { NgaModule } from '../../theme/nga.module';
import {RegisterCognitoService} from "./register-cognito-update.service";
import {ProfileService} from "../profile/profile-update.service";
import {SubscriptionService} from "../subscription/subscription-update.service";
import { RecaptchaModule } from 'ng2-recaptcha';
import {UserRegistrationService, UserLoginService, UserParametersService, CognitoUtil} from "../cognito-service/cognito.service";
import { RegisterCognito } from './register-cognito.component';
import { routing }       from './register-cognito.routing';


@NgModule({
  imports: [
    CommonModule,
    Ng2UploaderModule,
    RecaptchaModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    NgaModule,
    routing,
    InternationalPhoneModule
  ],
  declarations: [
    RegisterCognito
  ],
    providers: [
         UserRegistrationService,
         UserLoginService,
         UserParametersService,
         CognitoUtil,
         RegisterCognitoService,
         ProfileService,
         SubscriptionService
    ]
})
export class RegisterCognitoModule {}
