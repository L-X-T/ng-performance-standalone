import { Routes } from '@angular/router';

import { FlightSearchComponent } from './flight-search/flight-search.component';
import { FlightEditComponent } from './flight-edit/flight-edit.component';

export const flightBookingRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'flight-search',
  },

  {
    path: 'flight-edit/:id',
    component: FlightEditComponent,
  },

  {
    path: 'flight-search',
    component: FlightSearchComponent,
  },
];

export default flightBookingRoutes;
