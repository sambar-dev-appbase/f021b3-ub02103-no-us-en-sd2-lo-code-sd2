import { Routes, RouterModule }  from '@angular/router';
import { Pages } from './pages.component';
import { ModuleWithProviders } from '@angular/core';
// noinspection TypeScriptValidateTypes

// export function loadChildren(path) { return System.import(path); };

export const routes: Routes = [
  {
    path: '',
    loadChildren: 'app/pages/home/home.module#HomeModule'
  },
  {
    path: 'update-subscription',
    loadChildren: 'app/pages/update-subscription/updateSubscription.module#updateSubscriptionModule'
  },
  {
    path: 'login',
    loadChildren: 'app/pages/login/login.module#LoginModule'
  },
  {
    path: 'login/:usertype',
    loadChildren: 'app/pages/login/login.module#LoginModule'
  },
  {
    path: 'register',
    loadChildren: 'app/pages/register/register.module#RegisterModule'
  },
  {
    path: 'join',
    loadChildren: 'app/pages/join-now/join-now.module#JoinNowModule'
  },
  {
    path: 'register-cognito',
    loadChildren: 'app/pages/register-cognito/register-cognito.module#RegisterCognitoModule'
  },
  {
    path: 'claim-profile',
    loadChildren: 'app/pages/claim-profile/claim-profile.module#ClaimProfileModule'
  },
  {
    path: 'forgot-username',
    loadChildren: 'app/pages/forgot-username/forgot-username.module#ForgotUsernameModule'
  },
  {
    path: 'verify-user',
    loadChildren: 'app/pages/verify-user/verify-user.module#RegistrationUserConfirmationModule'
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
    path: 'confirm-registration-cognito/:username',
    loadChildren: 'app/pages/confirm-cognito/confirm-cognito.module#RegistrationConfirmationCognitoModule'
  },
  {
    path: 'forgot-password/:username/:source',
    loadChildren: 'app/pages/forgot/forgot2.module#Forgot2Module'
  },
  {
    path: 'forgot-password',
    loadChildren: 'app/pages/forgot/forgot.module#ForgotModule'
  },
  {
    path: 'logout',
    loadChildren: 'app/pages/logout/logout.module#LogoutModule'
  },
  {
    path: 'opportunities',
    loadChildren: 'app/pages/opportunities/opportunities.module#OpportunitiesModule'
  },
  {
    path: 'analyst/:username/:article_id',
    loadChildren: 'app/pages/articles/articles.module#ArticlesModule'
  },
  {
    path: 'myarticles',
    loadChildren: 'app/pages/myarticles/myarticles.module#MyArticlesModule'
  },
  {
    path: 'trades-list/:strategy-code',
    loadChildren: 'app/pages/trades-list/trades-list.module#TradesListModule' 
  },
  {
    path: ':strategy-code',
    children: [{ 
      path: 'trades-list', loadChildren: 'app/pages/trades-list/trades-list.module#TradesListModule', 
    }]
  },
  {
    path: 'user',
    component: Pages,
    children: [
      { path: '', redirectTo: 'strategies-list', pathMatch: 'full' },
      { path: 'subscription',loadChildren: 'app/pages/subscription/subscription.module#SubscriptionModule'},
      { path: 'logout',loadChildren: 'app/pages/logout/logout.module#LogoutModule'},
      { path: 'strategies-list', loadChildren: 'app/pages/strategies-list/strategies-list.module#StrategiesListModule' },
      { path: 'strategies-list/:board', loadChildren: 'app/pages/strategies-list/strategies-list.module#StrategiesListModule' },
      { path: 'profile', loadChildren: 'app/pages/profile/profile.module#ProfileModule'},
      { path: 'edit-profile', loadChildren: 'app/pages/profile/edit-profile/edit-profile.module#EditProfileModule'},
      { path: 'change-password', loadChildren: 'app/pages/profile/change-password/change-password.module#ChangePasswordModule'},
      { path: 'broker-information', loadChildren: 'app/pages/profile/broker-information/broker-information.module#BrokerInformationModule'},
      { path: 'broker-information/:broker-name', loadChildren: 'app/pages/profile/broker-information/broker-information.module#BrokerInformationModule'},
      //{ path: 'dashboard', loadChildren: 'app/pages/profile/dashboard/dashboard.module#DashboardModule'},
      { path: 'my-trades', loadChildren: 'app/pages/profile/my-trades/my-trades.module#MyTradesModule'},
      { path: 'my-trades/:trades-name', loadChildren: 'app/pages/profile/my-trades/my-trades.module#MyTradesModule'},      
      { path: 'my-orders', loadChildren: 'app/pages/profile/my-orders/my-orders.module#MyOrdersModule'},
      { path: 'my-orders/:trades-name', loadChildren: 'app/pages/profile/my-orders/my-orders.module#MyOrdersModule'},

      { path: 'group-trades', loadChildren: 'app/pages/profile/group-trades/group-trades.module#GroupTradesModule'},
      { path: 'group-trades/:trades-name', loadChildren: 'app/pages/profile/group-trades/group-trades.module#GroupTradesModule'},      
      { path: 'following', loadChildren: 'app/pages/profile/following/following.module#FollowingModule'},
      { path: 'following/:type', loadChildren: 'app/pages/profile/following/following.module#FollowingModule'},
      //{ path: 'following-analysts', loadChildren: 'app/pages/profile/follow-authors/follow-authors.module#FollowAuthorsModule'},
      { path: 'program-1000', loadChildren: 'app/pages/profile/program-1000/program-1000.module#Program1000Module'},
      { path: 'lebar-payments/:tabtype', loadChildren: 'app/pages/profile/lebar-payments/lebar-payments.module#LebarPaymentsModule'},
      //{ path: 'following-articles', loadChildren: 'app/pages/profile/follow-articles/follow-articles.module#FollowArticlesModule'},
      { path: 'plans', loadChildren: 'app/pages/profile/plan-and-credits/plan-credits.module#PlanCreditsModule'},
      { path: 'billing-info', loadChildren: 'app/pages/profile/billing-info/billing-info.module#BillingInfoModule'},
      { path: 'billing-history', loadChildren: 'app/pages/profile/billing-history/billing-history.module#BillingHistoryModule'},
      { path: 'notifications', loadChildren: 'app/pages/profile/notifications/notifications.module#NotificationsModule'},
      { path: 'recommended-strategies', loadChildren: 'app/pages/profile/recommended-strategies/recommended-strategies.module#RecommendedStrategiesModule'},
      { path: 'my-strategies/:trades-name', loadChildren: 'app/pages/profile/recommended-strategies/recommended-strategies.module#RecommendedStrategiesModule'},
      { path: 'analysts-list', loadChildren: 'app/pages/profile/analysts/analysts.module#AnalystsModule'},
      { path: 'analysts-view/:id', loadChildren: 'app/pages/profile/analysts-profile/analysts-profile.module#AnalystsProfileModule'},
      //{ path: 'following-publications', loadChildren: 'app/pages/profile/follow-publications/follow-publications.module#FollowPublicationModule'},
     // { path: 'following-publications/:publication-name', loadChildren: 'app/pages/profile/follow-publications/follow-publications.module#FollowPublicationModule'},
      
      { path: 'strategies', loadChildren: 'app/pages/strategies/strategies.module#StrategiesModule' },
      { path: 'group-trades/:groupID/:scode/:tcode', loadChildren: 'app/pages/profile/group-trades-chart/gtstrategies.module#GTStrategiesModule' },
      { path: 'ui', loadChildren: 'app/pages/ui/ui.module#UiModule' },
    ]
  } 
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
