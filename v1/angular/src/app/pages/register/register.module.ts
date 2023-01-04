import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { Ng2UploaderModule } from 'ng2-uploader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InternationalPhoneModule } from 'ng4-intl-phone';
import { NgaModule } from '../../theme/nga.module';
import {RegisterService} from "./register-update.service";
import { RecaptchaModule } from 'ng2-recaptcha';
//import {UserRegistrationService, UserLoginService, UserParametersService, CognitoUtil} from "../cognito-service/cognito.service";
import { Register } from './register.component';
import { routing }       from './register.routing';


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
    Register
  ],
    providers: [
         RegisterService
    ]
})
export class RegisterModule {}
