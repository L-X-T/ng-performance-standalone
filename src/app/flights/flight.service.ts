import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Flight } from '../entities/flight';
import { apiUrl } from '../shared/global';

@Injectable({ providedIn: 'root' })
export class FlightService {
  static USE_HTTPS = true;

  // intentional circular dependency
  readonly url = apiUrl + (FlightService.USE_HTTPS ? 'Flight' : 'flight');

  private readonly http = inject(HttpClient);

  find(from: string, to: string): Observable<Flight[]> {
    const headers = new HttpHeaders().set('Accept', 'application/json');
    const params = new HttpParams().set('from', from).set('to', to);

    return this.http.get<Flight[]>(this.url, { headers, params });
  }

  findById(id: string): Observable<Flight> {
    const headers = new HttpHeaders().set('Accept', 'application/json');
    const params = new HttpParams().set('id', id);

    return this.http.get<Flight>(this.url, { params, headers });
  }

  save(flight: Flight): Observable<Flight> {
    const headers = new HttpHeaders().set('Accept', 'application/json');

    return this.http.post<Flight>(this.url, flight, { headers });
  }
}
