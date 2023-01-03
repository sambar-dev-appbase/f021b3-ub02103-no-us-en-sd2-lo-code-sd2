import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { RecaptchaModule } from 'ng2-recaptcha';
import { InternationalPhoneModule } from 'ng4-intl-phone';
import {JoinNowComponent} from "./join-now.component";
import {LoginService} from "../login/login.service";
import { routing }       from './join-now.routing';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RecaptchaModule.forRoot(),
    FormsModule,
    NgaModule,
    routing,
    InternationalPhoneModule,
  ],
  declarations: [
    JoinNowComponent
  ],
    providers: [
        LoginService,
    ]    
})
export class JoinNowModule {}
