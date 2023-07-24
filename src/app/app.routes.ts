import { Route } from '@angular/router';

import { HomeComponent } from './home/home.component';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },

  {
    path: 'home',
    component: HomeComponent,
  },

  {
    path: 'flights',
    // children: flightBookingRoutes,
    loadChildren: () => import('./flights/flight-booking.routes'),
  },

  {
    path: 'charts',
    // component: ChartsComponent,
    loadComponent: () => import('./charts/charts.component').then((c) => c.ChartsComponent),
  },

  /*{
    path: '**',
    redirectTo: '',
  },*/
];
