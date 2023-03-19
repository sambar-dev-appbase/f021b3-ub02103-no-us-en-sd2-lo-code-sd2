import { Routes, RouterModule }  from '@angular/router';

import {InvitationCodeJoinNowFormComponent} from "./invitation-code-join-now-form.component";
import { ModuleWithProviders } from '@angular/core';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: InvitationCodeJoinNowFormComponent
  }
];

export const InvitationCodeJoinNowFormRouting: ModuleWithProviders = RouterModule.forChild(routes);
