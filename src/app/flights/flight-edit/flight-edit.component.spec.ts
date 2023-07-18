import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { provideRouter } from '@angular/router';

import { appRoutes } from '../../app.routes';
import { FlightEditComponent } from './flight-edit.component';

describe('FlightEditComponent', () => {
  let component: FlightEditComponent;
  let fixture: ComponentFixture<FlightEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FlightEditComponent],
      providers: [provideHttpClient(), provideRouter(appRoutes)],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
