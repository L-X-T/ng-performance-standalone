# Build Analyzing

<!-- TOC -->

- [Run the webpack bundle analyzer](#run-the-webpack-bundle-analyzer)
  - [Bonus: Run it for your own app](#bonus-run-it-for-your-own-app)
- [Run the source map explorer](#run-the-source-map-explorer)
  - [Bonus: Analyze & optimize the performance of the chosen Angular App](#bonus-analyze--optimize-the-performance-of-the-chosen-angular-app)
- [Bonus: Check out the import dependencies](#bonus-check-out-the-import-dependencies)
<!-- TOC -->

In this lab we'll get to know some of the most important analyzing tools for Angular builds.

## Run the webpack bundle analyzer

Look into your `package.json`. There you'll find some scripts to build the app including a `stats.json` file which will then be used by `Webpack Bundle Analyzer` to create a nice tree map of your build. Check it out by running the script.

### Bonus: Run it for your own app

Now try to run the `Webpack Bundle Analyzer` for your own app.

## Run the source map explorer

Look into your `package.json` again. The `Source Map Explorer` is said to be more accurate than `WBA`. The drawback is that it's visualization is not that beautiful. Check it out by running the script.

### Bonus: Analyze & optimize the performance of the chosen Angular App

Now try to run the `Source Map Explorer` for your own app.

## Bonus: Check out the import dependencies

In your `package.json` there is another script for running the `Import Graph Visualizer`.

If `IGV` starts, you should select your `src/main.ts` as the **Import source** to see all imports in the whole app. You can then select an **Import target**, like for example `@angular/core/rxjs-interop` - to see if the app is already using that new stuff.

Notice that `IGV` even follows lazy-loading imports via the `app.routes.ts`.

If you want to run the `IGV` for your own project as well, you may need to adjust the paths of the `main.ts` and the `tsconfig.json` from the script command.
