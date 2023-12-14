import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeferredChartsComponent } from './deferred-charts.component';

describe('DeferredChartComponent', () => {
  let component: DeferredChartsComponent;
  let fixture: ComponentFixture<DeferredChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeferredChartsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DeferredChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
