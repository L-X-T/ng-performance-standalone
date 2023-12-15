import { Component, DestroyRef, inject, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { debounceTime, delay, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';

import { pattern } from '../../shared/global';

import { FlightService } from '../flight.service';
import { Flight } from '../../entities/flight';

@Component({
  selector: 'app-flight-edit',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './flight-edit.component.html',
})
export class FlightEditComponent implements OnChanges {
  flight?: Flight;

  id?: number;
  showDetails = '';
  message = '';
  pattern = pattern;
  editForm!: FormGroup;

  private readonly DEBOUNCE_MS = 250;
  private readonly DELAY_MS = 3_000;
  private readonly flightService = inject(FlightService);
  private readonly flightSubscription = inject(ActivatedRoute)
    .params.pipe(
      tap((params: Params) => (this.id = params['id'])),
      tap((params: Params) => (this.showDetails = params['showDetails'])),
      switchMap((params: Params) => this.flightService.findById(params['id'])),
      takeUntilDestroyed(),
    )
    .subscribe({
      next: (flight) => {
        this.flight = flight;
        this.patchFormValue();
        this.message = 'Success loading!';
      },
      error: (errResponse) => {
        if (this.showDetails) {
          console.error(errResponse);
        }
        this.message = 'Error Loading!';
      },
    });

  constructor() {
    this.setupEditForm();

    this.subscribeToValueChanges();
  }

  ngOnChanges(): void {
    this.patchFormValue();
  }

  onSave(): void {
    this.message = 'Is saving ...';

    const flightToSave: Flight = this.editForm.value;

    this.flightService
      .save(flightToSave)
      .pipe(delay(this.DELAY_MS), takeUntilDestroyed(inject(DestroyRef)))
      .subscribe({
        next: (flight) => {
          // console.warn('FlightEditComponent - onSave()');
          // console.log(flight);
          this.flight = flight;
          this.patchFormValue();
          this.message = 'Success saving! Navigating ...';

          setTimeout(() => inject(Router).navigate(['/flights/flight-search']), this.DELAY_MS);
        },
        error: (errResponse) => {
          console.error(errResponse);
          this.message = 'Error saving!';
        },
      });
  }

  private setupEditForm() {
    this.editForm = inject(FormBuilder).group({
      id: [0, Validators.required],
      from: [
        '',
        {
          validators: [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(15),
            Validators.pattern(this.pattern),
          ],
          updateOn: 'blur',
        },
      ],
      to: [
        '',
        {
          validators: [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(15),
            Validators.pattern(this.pattern),
          ],
          updateOn: 'blur',
        },
      ],
      date: ['', [Validators.required, Validators.minLength(33), Validators.maxLength(33)], []],
    });
  }

  private subscribeToValueChanges() {
    this.editForm.valueChanges
      .pipe(
        debounceTime(this.DEBOUNCE_MS),
        distinctUntilChanged((a, b) => a.id === b.id && a.from === b.from && a.to === b.to && a.date === b.date),
        takeUntilDestroyed(),
      )
      .subscribe((value) => {
        console.log(value);
      });
  }

  private patchFormValue() {
    if (this.editForm && this.flight) {
      this.editForm.patchValue(this.flight);
    }
  }
}
