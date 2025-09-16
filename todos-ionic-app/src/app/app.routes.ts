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
    redirectTo: 'preferences-theme',
    pathMatch: 'full',
  },
  {
    path: 'perso-platform',
    loadComponent: () => import('./perso-platform/perso-platform.page').then( m => m.PersoPlatformPage)
  },
  {
    path: 'preferences-theme',
    loadComponent: () => import('./preferences-theme/preferences-theme.page').then( m => m.PreferencesThemePage)
  },
  {
    path: 'preferences',
    loadComponent: () => import('./preferences/preferences.page').then( m => m.PreferencesPage)
  }
];

