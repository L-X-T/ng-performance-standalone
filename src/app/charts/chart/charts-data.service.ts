import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ChartsDataService {
  // Observable string stream
  private dataSetChangeSource = new Subject<string>();

  // Observable string stream
  dataSetChanged$ = this.dataSetChangeSource.asObservable();

  private data_: object[] = [
    { customName: 'Name1', customValue1: 10, customValue2: 12, customValue3: 7, customValue4: 7 },
    { customName: 'Name2', customValue1: 14, customValue2: 10, customValue3: 17, customValue4: 7 },
    { customName: 'Name3', customValue1: 21, customValue2: 4, customValue3: 15, customValue4: 7 },
  ];

  private dataSet_: anychart.data.Set = anychart.data.set(this.data_);

  private mappings_: { [key: string]: anychart.data.View } = {
    data1: this.dataSet_.mapAs({ x: ['customName'], value: ['customValue1'] }),
    data2: this.dataSet_.mapAs({ x: ['customName'], value: ['customValue2'] }),
    data3: this.dataSet_.mapAs({ x: ['customName'], value: ['customValue3'] }),
    data4: this.dataSet_.mapAs({ x: ['customName'], value: ['customValue4'] }),
  };

  public getData(key = 'data1') {
    return this.mappings_[key];
  }
}
