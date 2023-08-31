import { Pipe, PipeTransform } from '@angular/core';
import { Flight } from '../../../entities/flight';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'flightDate',
  standalone: true,
})
export class FlightDatePipe implements PipeTransform {
  transform(item: Flight, datePipe: DatePipe): string {
    console.log('flightDate pipe was called');
    return item.date;
  }
}
