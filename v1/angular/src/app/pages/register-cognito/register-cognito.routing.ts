import { Routes, RouterModule }  from '@angular/router';

import { RegisterCognito } from './register-cognito.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: RegisterCognito
  }
];

export const routing = RouterModule.forChild(routes);
