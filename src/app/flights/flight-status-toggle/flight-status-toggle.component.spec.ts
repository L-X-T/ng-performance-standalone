import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightStatusToggleComponent } from './flight-status-toggle.component';

describe('FlightStatusToggleComponent', () => {
  let component: FlightStatusToggleComponent;
  let fixture: ComponentFixture<FlightStatusToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightStatusToggleComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightStatusToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
