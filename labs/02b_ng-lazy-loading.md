# Angular Lazy Loading

<!-- TOC -->

- [Implementing Lazy Loading with the router for a feature](#implementing-lazy-loading-with-the-router-for-a-feature)
- [Implementing Lazy Loading with the router for a component](#implementing-lazy-loading-with-the-router-for-a-component)
- [Implementing Preloading](#implementing-preloading)
- [Use ngx-quicklink for smarter Preloading \*](#use-ngx-quicklink-for-smarter-preloading-)
- [Implementing Lazy Loading without the router \*\*](#implementing-lazy-loading-without-the-router-)
- [Bonus: Implementing a Custom Preloading Strategy \*\*](#bonus-implementing-a-custom-preloading-strategy-)
<!-- TOC -->

In this lab we will further improve the initial load of our `ng-performance` by using lazy loading. Of course, you could also apply the same optimizations to your own App - if you prefer to do that.

## Implementing Lazy Loading with the router for a feature

Implement lazy loading for the `FlightBooking` folder in your `app.routes.ts`.

Keep in mind that lazy loading only works if the components (or the module if you're still using Ng Modules) in question isn't referenced directly but only with a string in the router configuration.

1. Open the file `app.routes.ts` and change the route with the path `flight-booking`.
   It should be using the `loadChildren` now.

    <details>
    <summary>Show Code</summary>
    <p>

   ```typescript
   [...]
   {
       path: 'flight-booking',
       // children: flightBookingRoutes,
       loadChildren: () => import('./flights/flight-booking.routes').then((f) => f.flightBookingRoutes),
   },
   {
       // This route needs to be the last one!
       path: '**',
       [...]
   }
   [...]
   ```

    </p>
    </details>

2. Make sure your sidebar link to flight-search still works (something like `routerLink="/flight-booking/flight-search"`).

3. Also make sure your `Edit` Button in your `FlightCardComponent` still works.

4. Find out that webpack splits off an own chunk for the `FlightBookingModule` after implementing lazy loading.
   If this works, you will see another chunk at the console (e.g. `src_app_flights_flight-booking_routes_ts.js` depending on the used version of the CLI)

5. Try it out in the browser and use the network tab within the dev tools (F12) to make sure that it is only loaded on demand.
   If it doesn't work, have a look to the console tab within the dev tools.

## Implementing Lazy Loading with the router for a component

Now try to add the Lazy Loading also for the **ChartsComponent**.

Hint: You'll need `loadComponent` with the component instead of `loadChildren` with the routes.

Make sure everything still works. If yes, then this might be the time to **check** our results by running the `webpack bundle analyzer` or the `source map explorer`!

## Implementing Preloading

In this exercise you will implement Preloading using Angular's `PreloadAllModules` strategy.

1. Open the file `app.config.ts` and register the `PreloadAllModules` strategy by calling `withPreloading()`.

   <details>
   <summary>Show Code</summary>
   <p>

   ```typescript
   [...]
     provideRouter(
       appRoutes,
       [...],
       withPreloading(PreloadAllModules),
     ),
   [...]
   ```

   </p>
   </details>

   Also, ensure all imports have been added correctly.

2. Make sure it works using the network tab within Chrome's dev tools. If it works, the lazy bundles are loaded **after** the app has been initializes. If this is the case, the chunks show up quite late in the water fall diagram.

## Use ngx-quicklink for smarter Preloading \*

1. [Look at ngx-quicklink](https://www.npmjs.com/package/ngx-quicklink) on npmjs.com to get started with `ngx-quicklink`.

2. First you need to install `ngx-quicklink`:

   ```
   npm i ngx-quicklink
   ```

3. Now replace the `PreloadAllModules` with the `QuicklinkStrategy` and add the `quicklinkProviders`:

   <details>
   <summary>Show Code</summary>
   <p>

   ```typescript
   [...]
     provideRouter(
       appRoutes,
       [...],
       withPreloading(QuicklinkStrategy),
     ),
     quicklinkProviders,
   [...]
   ```

   </p>
   </details>

4. Attention: To recognize the router links, it's also necessary to add the `QuicklinkModule` to the `SidebarComponent`s imports:

   <details>
   <summary>Show Code</summary>
   <p>

   ```typescript
   import { QuicklinkModule } from 'ngx-quicklink';

   @Component({
     selector: 'app-sidebar',
     standalone: true,
     imports: [RouterModule, QuicklinkModule],
     templateUrl: 'sidebar.component.html',
   })
   ```

   </p>
   </details>

5. Make sure it still works using the network tab within Chrome's dev tools.

6. Also try to remove one of the 2 bundles from the preloading by removing its link from the sidebar.

7. Learn more about `ngx-quicklink` - like how to apply it with good old NgModules - here: https://github.com/mgechev/ngx-quicklink

## Implementing Lazy Loading without the router \*\*

1. Create a new component called `DynamicChartComponent`:

   ```
   nx g c dynamic-chart
   ```

   Hint: If there are multiple, choose any generator you want.

2. Add the new component to the `sidebar.html`:

   <details>
   <summary>Show Code</summary>
   <p>

   ```html
   <li routerLinkActive="active">
     <a routerLink="/dynamic-chart">
       <p>Dynamic Chart</p>
     </a>
   </li>
   ```

   </p>
   </details>

3. Also add the route to the `app.routes.ts`:

   <details>
   <summary>Show Code</summary>
   <p>

   ```typescript
     {
       path: 'dynamic-chart',
       component: DynamicChartComponent,
     },
   ```

   </p>
   </details>

4. Now open your `dynamic-chart.component.html` and replace the content with this:

   ```html
   <h1>Dynamic Chart</h1>

   <ng-container #cnt></ng-container>
   ```

   Hint: We will use the `ng-container` with the handle `#cnt` to create our dynamic chart.

5. Now switch to `dynamic-chart.component.ts` and add the `AfterViewInit` interface and a `ViewContainerRef`:

   ```typescript
   export class DynamicChartComponent implements AfterViewInit {
     @ViewChild('cnt', { read: ViewContainerRef }) viewContainerRef!: ViewContainerRef;

     ngAfterViewInit(): void {
       console.log(this.viewContainerRef);
     }
   }
   ```

6. Okay, so now let's implement the dynamic creation of the chart. We do this by switching `ngAfterViewInit` to async mode:

   ```typescript
   async ngAfterViewInit(): Promise<void> {
     await this.createChartDynamically();
   }
   ```

7. Of course, we also need that new method:

   ```typescript
   private async createChart(): Promise<void> {
     const esm = await import('../charts/chart/chart.component');
     const chartRef = this.viewContainerRef.createComponent(esm.ChartComponent);
   }
   ```

8. Now everything should work, but where is our chart you ask? Well probably your component was created with `ChangeDetectionStrategy.OnPush`. We'll talk about that later on, but for now it's okay to just comment that out. Alternatively, if you know what you're doing, you could add a `markForCheck()` of the injected `ChangeDetectorRef` just below the creation of the chart.

9. Once you see the chart, it might be time for a final round of build analyzing.

Please note: Dynamically loaded parts will not be preloaded.

## Bonus: Implementing a Custom Preloading Strategy \*\*

1. [Here](https://www.angulararchitects.io/aktuelles/performanceoptimierung/) you find some information about creating a custom preloading strategy. Have a look at it.

2. Create a custom preloading strategy that only preloads modules that have been marked with the `data` attribute in the router configuration.

3. Configure the system to make use of it and test it.
