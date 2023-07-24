import { Component, ViewEncapsulation } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { ChartComponent } from './chart/chart.component';

@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [ChartComponent, ScrollingModule],
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ChartsComponent {
  title = 'Charts';

  rowCount = 30;
  charts: {
    col1: { id: number; data: string };
    col2: { id: number; data: string };
    col3: { id: number; data: string };
    col4: { id: number; data: string };
  }[] = [];

  constructor() {
    for (let index = 0; index < this.rowCount; index++) {
      this.charts.push({
        col1: { id: index * 4, data: 'data1' },
        col2: { id: index * 4 + 1, data: 'data2' },
        col3: { id: index * 4 + 2, data: 'data3' },
        col4: { id: index * 4 + 3, data: 'data4' },
      });
    }
  }
}
