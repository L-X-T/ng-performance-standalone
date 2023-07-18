import { Component, inject, OnChanges, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Observable } from 'rxjs';
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
export class FlightEditComponent implements OnChanges, OnInit {
  flight$?: Observable<Flight>;
  flight?: Flight;

  id?: number;
  showDetails = '';
  message = '';
  pattern = pattern;
  editForm!: FormGroup;

  private readonly DEBOUNCE_MS = 250;
  private readonly DELAY_MS = 3_000;
  private fb = inject(FormBuilder);
  private flightService = inject(FlightService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  constructor() {
    this.setupEditForm();
  }

  ngOnChanges(): void {
    this.patchFormValue();
  }

  ngOnInit(): void {
    this.editForm.valueChanges
      .pipe(
        debounceTime(this.DEBOUNCE_MS),
        distinctUntilChanged((a, b) => a.id === b.id && a.from === b.from && a.to === b.to && a.date === b.date),
      )
      .subscribe((value) => {
        console.log(value);
      });

    this.flight$ = this.route.params.pipe(
      tap((params: Params) => (this.id = params['id'])),
      tap((params: Params) => (this.showDetails = params['showDetails'])),
      switchMap((params: Params) => this.flightService.findById(params['id'])),
    );

    this.flight$.subscribe({
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
  }

  onSave(): void {
    this.message = 'Is saving ...';

    const flightToSave: Flight = this.editForm.value;

    this.flightService
      .save(flightToSave)
      .pipe(delay(this.DELAY_MS))
      .subscribe({
        next: (flight) => {
          // console.warn('FlightEditComponent - onSave()');
          // console.log(flight);
          this.flight = flight;
          this.patchFormValue();
          this.message = 'Success saving! Navigating ...';

          setTimeout(() => this.router.navigate(['/flights/flight-search']), this.DELAY_MS);
        },
        error: (errResponse) => {
          console.error(errResponse);
          this.message = 'Error saving!';
        },
      });
  }

  private setupEditForm() {
    this.editForm = this.fb.group({
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

  private patchFormValue() {
    if (this.editForm && this.flight) {
      this.editForm.patchValue(this.flight);
    }
  }
}
