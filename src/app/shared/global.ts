import { FlightService } from '../flights/flight.service';

// intentional circular dependency
export const apiUrl = FlightService.USE_HTTPS ? 'https://demo.angulararchitects.io/api/' : 'http://www.angular.at/api/';
export const pattern = '[a-zA-ZäöüÄÖÜß ]*';
