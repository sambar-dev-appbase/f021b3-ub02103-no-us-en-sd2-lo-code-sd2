import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { RecaptchaModule } from 'ng2-recaptcha';
import { InternationalPhoneModule } from 'ng4-intl-phone';
import { InvitationCodeJoinNowFormComponent } from "./invitation-code-join-now-form.component";
import { InvitationCodeJoinNowFormRouting }       from './invitation-code-join-now-form.routing';




@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RecaptchaModule.forRoot(),
    FormsModule,
    NgaModule,
    InvitationCodeJoinNowFormRouting,
    InternationalPhoneModule
  ],
  declarations: [
    InvitationCodeJoinNowFormComponent
  ]


})
export class InvitationCodeJoinNowFormModule {}

