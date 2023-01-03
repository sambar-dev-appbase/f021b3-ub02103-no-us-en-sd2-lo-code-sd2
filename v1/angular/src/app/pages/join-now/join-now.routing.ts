import { Routes, RouterModule }  from '@angular/router';

import {JoinNowComponent} from "./join-now.component";
import { ModuleWithProviders } from '@angular/core';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: JoinNowComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
