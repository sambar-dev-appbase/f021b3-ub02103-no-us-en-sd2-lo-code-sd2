import { Routes, RouterModule }  from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { RegistrationConfirmationComponent } from './confirmRegistration.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: RegistrationConfirmationComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
