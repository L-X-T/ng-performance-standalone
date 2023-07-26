import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, inject, Input, Output } from '@angular/core';

import { BlinkService } from '../../shared/blink.service';

@Component({
  selector: 'app-flight-status-toggle',
  standalone: true,
  templateUrl: './flight-status-toggle.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlightStatusToggleComponent {
  @Input() status = false;
  @Output() statusChange = new EventEmitter<boolean>();

  private readonly blinkService = inject(BlinkService);
  private readonly elementRef = inject(ElementRef);

  toggle(): void {
    this.statusChange.emit(!this.status);
  }

  blink(): void {
    this.blinkService.blinkElementsFirstChild(this.elementRef);
  }
}
