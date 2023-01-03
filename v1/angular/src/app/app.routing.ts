import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  { path: '', redirectTo: 'user', pathMatch: 'full' },
  { path: '**', redirectTo: 'user/strategies-list' }
];

// export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true });
export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
