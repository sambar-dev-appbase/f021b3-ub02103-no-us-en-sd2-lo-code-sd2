import { Routes, RouterModule }  from '@angular/router';
import { Pages } from './pages.component';
import { ModuleWithProviders } from '@angular/core';
// noinspection TypeScriptValidateTypes

// export function loadChildren(path) { return System.import(path); };

export const routes: Routes = [
  {
    path: '',
    //loadChildren: 'app/pages/home/home.module#HomeModule'
    loadChildren: 'app/pages/register/register.module#RegisterModule'
  },
  {
    path: 'register',
    loadChildren: 'app/pages/register/register.module#RegisterModule'
  },
  {
    path: 'join',
    loadChildren: 'app/pages/invitation-code-join-now-form/invitation-code-join-now-form.module#JoinNowModule'
  },
  {
    path: 'register-cognito',
    loadChildren: 'app/pages/register-cognito/register-cognito.module#RegisterCognitoModule'
  },
  {
    path: 'register/:usertype',
    loadChildren: 'app/pages/register/register.module#RegisterModule'
  },
  {
    path: 'register-cognito/:usertype',
    loadChildren: 'app/pages/register-cognito/register-cognito.module#RegisterCognitoModule'
  },
  {
    path: 'confirm-registration/:username',
    loadChildren: 'app/pages/confirm/confirm.module#RegistrationConfirmationModule'
  },
  {
    path: 'user',
    component: Pages,
    children: [
      { path: 'ui', loadChildren: 'app/pages/ui/ui.module#UiModule' },
    ]
  } 
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
