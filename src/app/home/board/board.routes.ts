import { Routes } from '@angular/router';

export const BOARD_ROUTES: Routes = [


    {
        path: 'list', loadComponent: () => import('./list/list.component').then(c => c.ListComponent)
    },
    {
        path: 'register', loadComponent: () => import('./form/form.component').then(c => c.FormComponent)
    },
    {
        path: 'edit/:id', loadComponent: () => import('./form/form.component').then(c => c.FormComponent)
    }

];
