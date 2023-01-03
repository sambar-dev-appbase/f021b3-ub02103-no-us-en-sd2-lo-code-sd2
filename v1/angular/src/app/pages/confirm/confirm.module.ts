import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { RegistrationConfirmationComponent } from './confirmRegistration.component';
import { routing } from './confirmregister.routing.ts';
import { NotificationService } from "../strategies/components/services/notification.service";


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgaModule,
    routing
  ],
  declarations: [
    RegistrationConfirmationComponent
  ],
    providers: [
         NotificationService
    ]
})
export class RegistrationConfirmationModule {}
