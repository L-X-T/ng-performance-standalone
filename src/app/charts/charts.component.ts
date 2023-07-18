import { Component } from '@angular/core';

import { ChartComponent } from './chart/chart.component';

@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [ChartComponent],
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
})
export class ChartsComponent {
  title = 'Charts';

  chartsCount = 4;
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
