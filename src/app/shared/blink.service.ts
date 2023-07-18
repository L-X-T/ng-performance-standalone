import { ElementRef, inject, Injectable, NgZone } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BlinkService {
  private readonly ngZone = inject(NgZone);

  // Just a hack used to visualize the change detection for 1s
  blinkElementsFirstChild(elementRef: ElementRef): void {
    // Just a hack used to visualize the change detection for 1 second.
    elementRef.nativeElement.firstChild.style.backgroundColor = this.getRandomCssColor();
    //                   ^----- DOM-Element

    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        elementRef.nativeElement.firstChild.style.backgroundColor = '';
      }, 1000);
    });
  }

  private getRandomCssColor(): string {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }
}
