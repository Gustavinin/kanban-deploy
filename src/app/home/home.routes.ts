import { Routes } from '@angular/router';

export const HOME_ROUTES: Routes = [
    {
      path: 'board',
      loadComponent: () => import('./board/board.component').then(c => c.BoardComponent),
      loadChildren: () => import('./board/board.routes').then(c => c.BOARD_ROUTES)
    }
];
