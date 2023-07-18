import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  isDevMode,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';

import * as moment from 'moment';

import { Flight } from '../../entities/flight';
import { CityPipe } from '../../pipes/city.pipe';
import { BlinkService } from '../../shared/blink.service';

@Component({
  selector: 'app-flight-card',
  standalone: true,
  imports: [CityPipe],
  templateUrl: './flight-card.component.html',
  styleUrls: ['./flight-card.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlightCardComponent implements OnInit, OnChanges {
  debug = !isDevMode();

  @Input({ required: true }) item!: Flight;
  @Input() isSelected = false;
  @Output() isSelectedChange = new EventEmitter<boolean>();
  @Output() edit = new EventEmitter<void>();

  private readonly blinkService = inject(BlinkService);
  private readonly elementRef = inject(ElementRef);

  static getRandomCssColor(): string {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }

  ngOnChanges(): void {
    if (this.debug) {
      console.warn('[FlightCardComponent - ngOnChanges()]');
      console.log(this.item);
      console.log('isSelected: ' + this.isSelected);
    }
  }

  ngOnInit(): void {
    if (this.debug) {
      console.warn('[FlightCardComponent - ngOnInit()]');
      console.log(this.item);
      console.log('isSelected: ' + this.isSelected);
    }
  }

  select(): void {
    // this.isSelected = true;
    if (this.debug) {
      console.warn('[FlightCardComponent - select()]');
      console.log('isSelected: ' + true);
    }
    this.isSelectedChange.emit(true);
  }

  deselect(): void {
    // this.isSelected = false;
    if (this.debug) {
      console.warn('[FlightCardComponent - deselect()]');
      console.log('isSelected: ' + false);
    }
    this.isSelectedChange.emit(false);
  }

  getDate(item: Flight): string {
    return moment(item.date).format('MM.DD.YYYY HH:mm');
  }

  blink(): void {
    this.blinkService.blinkElementsFirstChild(this.elementRef);
  }
}
