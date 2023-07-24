# Server-Side Rendering

<!-- TOC -->

- [Add SSR to your app](#add-ssr-to-your-app)
- [Add routes for Prerendering](#add-routes-for-prerendering)
- [Add Non-Destructive Hydration](#add-non-destructive-hydration)
<!-- TOC -->

In this lab we will further improve the initial load of our `ng-performance` app by using server-side rendering. Once again, you could also apply the same optimizations to your own App - if you prefer to do that. Please keep in mind that this only works for **public** routes which are not dependent on a **login**.

## Add SSR to your app

To begin with, we need to add Angular Universal to our app:

```
nx add @nguniversal/express-engine
```

Nx will tell you that it doesn't like `nx add`. However, it will still work once you entered a `y` for yes!

Look into your `package.json` for the new SSR npm scripts. I would recommend to update them to use `nx` instead of `ng`:

```json
"dev:ssr": "nx run ng-performance:serve-ssr:development",
"build:ssr": "nx b && nx run ng-performance:server:production",
"serve:ssr": "node dist/ng-performance/server/main.js",
"prerender": "nx run ng-performance:prerender:production"
```

Also, make sure you update the `dist` directory to include `/browser` in the other scripts:

```json
"build:serve": "nx build && serve dist/ng-performance/browser -s",
"serve": "serve dist/ng-performance/browser -s",
[...]
"stats:wba": "nx b --stats-json && webpack-bundle-analyzer dist/ng-performance/browser/stats.json",
"wba": "webpack-bundle-analyzer dist/ng-performance/browser/stats.json",
"build:sme": "nx b && source-map-explorer dist/ng-performance/browser/**/*.js",
"sme": "source-map-explorer dist/ng-performance/browser/**/*.js",
```

Now try out SSR on your localhost! If you run the `prerender` npm script, it will tell you that it's unable to find the routes. This is due to our `Lazy Loading`, but there is a fix for that!

## Add routes for Prerendering

You can add the **routes** you want to be prerendered manually:

```json
"prerender": {
  "executor": "@nguniversal/builders:prerender",
  "options": {
    "routes": ["/home", "/flights/flight-search"]
  },
  [...]
}
```

## Add Non-Destructive Hydration

To add Angular 16's fantastic `Hydration` feature we just need to add the following provider to our `app.config.ts`:

```typescript
export const appConfig: ApplicationConfig = {
  providers: [
    [...],
    provideClientHydration(),
  ],
};
```

Make sure everything still works. If yes, then this might be the time to **measure** our results!
