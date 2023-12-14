import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ChartComponent } from '../charts/chart/chart.component';

@Component({
  selector: 'app-performance-deferred-chart',
  standalone: true,
  imports: [ChartComponent],
  templateUrl: './deferred-charts.component.html',
  styleUrls: ['./deferred-charts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeferredChartsComponent {
  title = 'Charts';

  chartsCount = 12;
  charts: { id: number; data: string }[] = [];

  constructor() {
    for (let index = 1; index <= this.chartsCount; index++) {
      let dataNumber = index % 3;
      if (!dataNumber) {
        dataNumber = 3;
      }

      this.charts.push({ id: index, data: 'data' + dataNumber });
    }
  }
}
