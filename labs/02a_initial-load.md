# Initial Load

<!-- TOC -->

- [Improving Initial Load NgOptimizedImage](#improving-initial-load-ngoptimizedimage)
  - [Use a responsive image loading provider](#use-a-responsive-image-loading-provider)
  - [Bonus: Use a preconnect tag](#bonus-use-a-preconnect-tag)
- [Improving Initial Load with NG Prod Mode](#improving-initial-load-with-ng-prod-mode)
  - [Inspecting Bundles with webpack-bundle-analyzer](#inspecting-bundles-with-webpack-bundle-analyzer)
  - [Bonus: Inspecting source files with source-map-explorer](#bonus-inspecting-source-files-with-source-map-explorer)
- [Avoid large 3rd party libs \*](#avoid-large-3rd-party-libs-)
  - [Replace moment with a Date Pipe](#replace-moment-with-a-date-pipe)
  - [Check your own build for large parts of 3rd party code](#check-your-own-build-for-large-parts-of-3rd-party-code)
  <!-- TOC -->

In this lab we will work with the Angular App of this repository / workspace. Of course, you could also apply the same optimizations to your own Apps if you prefer to do that.

## Improving Initial Load NgOptimizedImage

1. Check out the `HomeComponent` which is shown on our Apps front page.

   You can find some `<img>` tags in it. The first of them is above the fold, so it should be loaded eagerly, while the other two are below the fold, so we could use lazy loading on them.

2. To active image lazy loading we need to import the `NgOptimizedImage` directive to the `HomeComponent`:

   ```typescript
   @Component({
       [...],
       imports: [NgOptimizedImage],
       [...]
   })
   export class AppModule {}
   ```

   Also, make sure the corresponding import was added.

3. Now we just need to replace the images `src` attribute with the same `ngSrc` attribute (rename it from "src" to "ngSrc" without changing it\'s value).

4. For the first image, which will be loaded above the fold, also add the `priority` attribute.

### Use a responsive image loading provider

A "loader" is a function that generates an image transformation URL for a given image file. When appropriate, `NgOptimizedImage` sets the size, format, and image quality transformations for an image.

`NgOptimizedImage` provides both a generic loader that applies no transformations, as well as loaders for various third-party image services. It also supports writing your own custom loader.

You can find the documentation here: [NgOptimizedImage image loaders](https://angular.io/guide/image-directive#configuring-an-image-loader-for-ngoptimizedimage).

1. For using `imagekit.io` as your image loader (of course you can choose another one) you have register (if you don't have access to an existing one) an account on https://imagekit.io/registration/.
2. After successful registration you can upload your images to the image provider of choice.
3. The next step is the register the provider in our `app.config.ts`:

   ```typescript
   export const appConfig: ApplicationConfig = {
     providers: [
       [...],
       provideImageKitLoader('https://ik.imagekit.io/LXT'),
       [...],
     ],
   };
   ```

   Make sure you've also imported the `provideImageKitLoader` from `@angular/common`.

4. Now we need to adjust the image `ngSrc` paths from the local asset path to the path on the image provider:

   ```html
   [...]
   <img
     width="2596"
     height="1890"
     ngSrc="grimming_from_glaeserkoppe.jpg"
     alt="Photo showing Grimming from the Gläserkoppe"
     priority
   />

   [...]
   ```

5. As the final optimization we can add the desired `ngSrcset` widths and sizes controlling the responsive image sizes (resolutions):

   ```html
   [...]
   <img
     width="2596"
     height="1890"
     ngSrc="grimming_from_glaeserkoppe.jpg"
     ngSrcset="324w, 649w, 1298w, 1947w, 2596w"
     sizes="(max-width:991px) 98vw, 88vw"
     alt="Photo showing Grimming from the Gläserkoppe"
     priority
   />

   [...]
   ```

6. For the two images below insert the following `ngSrcset` and `sizes`:

   ```html
   [...]
   <img [...] ngSrcset="320w, 640w, 914w" sizes="(max-width:991px) 48vw, 38vw" [...] />

   [...]
   ```

7. Test your solution.

8. Additionally, make sure you understand the combination of `ngSrcset` and `sizes`.

### Bonus: Use a preconnect tag

Check your browsers console for a warning concerning a missing preconnect tag. You should add the tag to the index.html.

```html
[...]
<link rel="preconnect" href="https://ik.imagekit.io" />
[...]
```

## Improving Initial Load with NG Prod Mode

1. Make sure, your solution runs in debug mode (`ng s -o | nx s -o`)
2. Open the performance tab in Chrome's dev tools and reload the app. Find out how long bootstrapping takes and create a screenshot.

   **Hint:** In order to respect the cache, do it twice and take the screenshot after the 2nd try.

3. Install the simple web server serve:
   ```
   npm i serve -g
   ```
4. Switch to the console and move to the root folder of your project. Create a production build:
   ```
   ng b | nx b
   ```
5. Start live-server for your production build. For this, switch to your project within the `dist` folder and call serve:
   ```
   serve -s
   ```
6. Open the performance tab in Chrome's dev tools and reload the app. Find out how long bootstrapping takes and create a screenshot.

   **Hint:** In order to respect the cache, do it twice and take the screenshot after the 2nd try.

7. Compare your screenshot with the performance results.

### Inspecting Bundles with webpack-bundle-analyzer

Using the webpack-bundle-analyzer one can have a look at a bundle's content. In this exercise you will use this possibility by inspecting your AOT-based and your AOT-less production build.

1. Install the `webpack-bundle-analyzer` globally (for the sake of simplicity):
   ```
   npm i -g webpack
   npm i -g webpack-bundle-analyzer
   ```
2. Move to the root folder of your project. Create a Production Build without AOT and generate a statistics file for the analyzer using the `stats-json` flag:
   ```
   ng b | nx b --aot=false --build-optimizer=false --stats-json
   ```
3. Analyze your bundles:

   ```
   webpack-bundle-analyzer dist/ng-performance/stats.json
   ```

   The name of `stats.json` can be slightly different on your machine, e. g. `stats-es5.json` or `stats-es2015.json`.

4. Take a screenshot to document this.
5. Move to the root folder of your project. Create a production build using AOT:
   ```
   ng b | nx b --stats-json
   ```
6. Analyze these bundles too and compare it to the former bundles:
   ```
   webpack-bundle-analyzer dist/ng-performance/stats.json
   ```

### Bonus: Inspecting source files with source-map-explorer

Now let's try the `source-map-explorer` as an alternative to `webpack-bundle-analyzer`. With the `source-map-explorer` you look into single files instead of the bundle.

```
npm i -g source-map-explorer
```

To be able to explore the .js files you need source maps to be enabled in your `angular.json`. Make sure you enable that for both, the development and the production build.

After enabling source maps and rebuilding the App open the main bundle (main.js) and explore it with the `source-map-explorer`.

Results tend to be more accurate here compared to the `webpack-bundle-analyzer`.

## Avoid large 3rd party libs \*

### Replace moment with a Date Pipe

1. Go to your `flight-card.html` and replace the getDate function with a Date Pipe:

```angular2html
<div class="card-body">
  <p>
    Flight-No.: #{{ item.id }}
    @if (item.delayed) {
      <span> (delayed)</span>
    }
  </p>
  <p [class.delayed]="item.delayed">Date: {{ item.date | date: 'MM.dd.YYYY HH:mm' }}</p>
  [...]
</div>
```

2. Go to the `flight-card.ts` and remove the `getDate` function and the `moment` import. You don't need that any more.

3. Test if everything still works and then check your results by analyzing the build.

For reference take a look at this reference: https://angular.io/api/common/DatePipe.

### Check your own build for large parts of 3rd party code

You can either use `webpack-bundle-analyzer` or `source-map-explorer` for this task.

1. See if you can find a large import and if yes try to replace that.

2. Make sure the new 3rd party lib has **ES6 imports** and this is **tree-shakeable**.

3. Compare the production build size and check how much smaller your build has become.
