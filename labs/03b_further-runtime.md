# Further Runtime

<!-- TOC -->

- [Using for track](#using-for-track)
- [Using Virtual Scrolling](#using-virtual-scrolling)
- [Unsubscribing RxJS subscriptions](#unsubscribing-rxjs-subscriptions)
<!-- TOC -->

## Using for track

When you resubmit the same search, you will find out that `@for` will repaint all items from scratch. This is not necessary, instead we could reuse our existing items by setting an intelligent `track`.

1. Open the `flight-search.component.html` and look for the line that uses `@for`.

2. Set the `track` function in the `@for` loop.

   ```html
   @for (flight of flights; track identifyFlightById(flight)) [...]
   ```

3. Now you need to implement the `identifyFlightById` method in the `flight-search.component.ts`.

    <details>
    <summary>Show Code</summary>
    <p>

   ```typescript
   identifyFlightById(flight: Flight): number {
     return flight.id;
   }
   ```

   </p>
   </details>

Try resubmitting the same search again and interpret your findings.

## Using Virtual Scrolling

1. To be able to use the Virtual Scrolling we need to install `@angular/cdk` first:

   `npm i @angular/cdk` or `yarn @angular/cdk` or `pnpm i @angular/cdk`

2. Now we need to import the `ScrollingModule` into the `ChartsComponent`

   ```typescript
   imports: [[...], ScrollingModule],
   ```

3. In the `charts.component.ts` we want to change the count of charts from 4 to something bigger.

   ```typescript
   chartsCount = 120; // at least ;-)
   ```

4. In the `charts.component.html` we need to replace the `div.row` with a virtual scrolling viewport:

   ```html
   <cdk-virtual-scroll-viewport itemSize="66" class="viewport row">
     <div
       *cdkVirtualFor="let chart of charts; let index = index"
       [id]="'chart_' + index"
       class="col-xs-12 col-sm-6 col-md-4 col-lg-3"
     >
       <app-chart [id]="chart.id" [data]="chart.data"></app-chart>
     </div>
   </cdk-virtual-scroll-viewport>
   ```

   Please note: By adding the height of each item as `itemSize` in `px` we can optimize performance. Since we have 4 columns we need to divide the real height by 4 here to get a useful value here.

5. Finally, in the `charts.component.scss` we need set a height for the with virtual scrolling viewport:

   ```css
   .viewport {
     height: calc(100vh - 222px);
   }
   ```

6. Also, in the `charts.component.scss` we want to add flex styling to the `cdk-virtual-scroll-content-wrapper` class:

   ```css
   .cdk-virtual-scroll-content-wrapper {
     display: flex;
     flex-wrap: wrap;
     margin-right: -15px;
     margin-left: -15px;
   }
   ```

7. But since the `wrapper` is not part of our component , its `styles` are not applied.

8. To fix this, you can either move the styles to the global `app.component.scss` or switch the components `encapsulation` to `ViewEncapsulation.None`.

9. Check your solution and look into the DevTools Elements to see what's happening!

## Unsubscribing RxJS subscriptions

Open the `flight-edit.component.ts` and look for subscriptions. You should find at least two of them - if not more than that ;-)

Do you still remember which one does not have to be managed?

Unsubscribe the other two by using at least one of the recommended methods:

1. If possible using the `AsyncPipe` (if that's possible!?)
2. Else use the Angular 16's new `takeUntilDestroyed()`

You should at least once use the `takeUntilDestroyed()`.

Hint: If you're calling that operator in the constructor, you don't need a `DestroyRef`.

If you need a reference open `flight-search.component.ts` - there you'll find the two introduced methods of unsubscribing.
