import {
  AfterViewInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';

import { ChartsDataService } from './charts-data.service';
import { BlinkService } from '../../shared/blink.service';

import 'anychart';

@Component({
  selector: 'app-chart',
  standalone: true,
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() id = 0;
  @Input() data = 'data1';

  @ViewChild('container') container?: ElementRef;

  chart?: anychart.charts.Pie | null;

  private readonly cdr = inject(ChangeDetectorRef);
  private readonly chartsDataService = inject(ChartsDataService);
  private readonly blinkService = inject(BlinkService);
  private readonly elementRef = inject(ElementRef);
  private readonly ngZone = inject(NgZone);

  ngOnInit(): void {
    // Default data set mapping, hardcoded here.
    this.chart = anychart.pie(this.chartsDataService.getData(this.data));
  }

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      if (this.chart && this.container) {
        this.chart.container(this.container.nativeElement);
        this.chart.draw();
        //this.cdr.detach();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.dispose();
      this.chart = null;
    }
  }

  blink(): void {
    this.blinkService.blinkElementsFirstChild(this.elementRef);
  }
}
