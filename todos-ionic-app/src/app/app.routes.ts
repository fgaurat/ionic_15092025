import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'todo/:id',
    loadComponent: () =>
      import('./todo-detail/todo-detail.page').then((m) => m.TodoDetailPage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  }
];

