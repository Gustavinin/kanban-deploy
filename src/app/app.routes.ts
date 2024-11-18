import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
    {
      path: '',
      redirectTo: 'board/list',
      pathMatch: 'full'
    },
    {
      path: '', 
      loadComponent: () => import('./home/home.component').then(c => c.HomeComponent), 
      loadChildren: () => import('./home/home.routes').then(r => r.HOME_ROUTES)
    },
    { 
      path: '**', redirectTo: 'board/list'
    }

];
