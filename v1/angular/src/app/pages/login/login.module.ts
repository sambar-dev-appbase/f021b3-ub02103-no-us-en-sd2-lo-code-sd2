import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { DropdownModule, ModalModule } from 'ng2-bootstrap';
import { Modals } from '../ui/components/modals/modals.component';
import { RecaptchaModule } from 'ng2-recaptcha';
import {ProfileService} from "../profile/profile-update.service";
import {LoginService} from "./login.service";
import {SubscriptionService} from "../subscription/subscription-update.service";
import { Login } from './login.component';
import { routing }       from './login.routing';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RecaptchaModule.forRoot(),
    FormsModule,
    NgaModule,
    routing,
    DropdownModule.forRoot(),
    ModalModule.forRoot(),
  ],
  declarations: [
    Login
  ],
    providers: [
        ProfileService,
        LoginService,
        SubscriptionService
    ]    
})
export class LoginModule {}
