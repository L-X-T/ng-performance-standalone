# Web Audit Tools

<!-- TOC -->

- [Test the performance of a public web property](#test-the-performance-of-a-public-web-property)
  - [Bonus: Analyze & optimize the performance of the chosen web property](#bonus-analyze--optimize-the-performance-of-the-chosen-web-property)
- [Test the performance of an Angular App served on your localhost](#test-the-performance-of-an-angular-app-served-on-your-localhost)
  - [Bonus: Analyze & optimize the performance of the chosen Angular App](#bonus-analyze--optimize-the-performance-of-the-chosen-angular-app)
  - [Bonus: Serve the App via Caddy reverse proxy & gzip (only Linux & Mac)](#bonus-serve-the-app-via-caddy-reverse-proxy--gzip-only-linux--mac)
  <!-- TOC -->

In this lab we'll get to know some of the most important web audit tools for performance measurement.

## Test the performance of a public web property

1. Choose a `web property` for your first lab, it can be

   - a **website**,
   - a **webshop** or
   - a **web app**.

   Best option would be to test a project of your own work or else of your team or your company. The `web property` does not have to be an Angular App! However if your company doesn't have a publicly available `web property` you can chose any website you want.

2. Now select between using **[Google PageSpeed Insights](https://pagespeed.web.dev/)** or **[WebPageTest](https://www.webpagetest.org/)**. There are many other services out there, but your trainer would recommend using on of those two options. For both you don't need a login.
3. The next step is to prepare the `audit document`. You can either copy my **[Google Docs Template](https://docs.google.com/document/d/1AQgAwHoHvasmT43HUlSr3THifj-WHD_wwJQRhd0KG64/edit)** into your Google Drive account or - if you don't have Drive - use one of the templates in this folder.
4. Make sure you fill the _[X]_, _[Y]_ and _[Z]_ placeholders in that `audit document`.
5. Now go to your tool of choice and test the chosen `web property`.
6. Fill the fields in the `audit document` and try to find things that can be improved.
7. Prepare to share your findings with the other workshop participants.
8. When you're done stop your `serve` with `Ctrl+C`.

### Bonus: Analyze & optimize the performance of the chosen web property

If possible try to fix the issues of the `web property` or else write a friendly (seriously!) email to the person that you think might be responsible for fixing it.

## Test the performance of an Angular App served on your localhost

1. Choose an `Angular App` for this lab. You need the source code. Best option would be a workspace of your own work or else of your team or your company. If you currently don't have access to any Angular workspace as a last resort you can use this workspace.
2. Check the configurations in `angular.json` and then run a production build of the project, typically if production is the default configuration:
   ```
   ng b
   ```
   Or else (assuming "production" is the name of the build configuration):
   ```
   ng b -c production
   ```
   If you're using Nx the command of course becomesL
   ```
   nx b
   ```
   Or more specific (where `ng-performance` is our app's name):
   ```
   nx run ng-performance:build:production
   ```
3. Serve your `Angular build` on your localhost. You can either
   - use something like MAMP/WAMP/XAMPP,
   - edit your hosts file manually or
   - use npm serve with this two commands:
   ```
   npm i -g serve
   ```
   Now switch the directory containing the build (e.g. `dist/ng-performance` in this workspace) and run:
   ```
   serve -s
   ```
   Please note: the `-s` parameter rewrites all requests to `index.html` which is what we want for an Angular App.
4. Now open the `Angular App` in Chrome and make sure you have the `Lighthouse` extension installed.
5. The next step is to prepare another `audit document`. You can again copy my **[Google Docs Template](https://docs.google.com/document/d/1AQgAwHoHvasmT43HUlSr3THifj-WHD_wwJQRhd0KG64/edit)** into your Google Drive account or - if you don't have Drive - use one of the templates in this folder.
6. Make sure you fill the _[X]_, _[Y]_ and _[Z]_ placeholders in that `audit document`.
7. Now fire up your Chrome's DevTools, switch to the `Lighthouse` tab and run it for "**Mobile**" (it's stricter than "**Desktop**") and "**Performance**" - of course you can run the other tests as well, if you want.
8. Fill the fields in the document and try to find things that can be improved.
9. Prepare to share your findings with the other workshop participants.
10. When you're done stop your `serve` with `Ctrl+C`.

### Bonus: Analyze & optimize the performance of the chosen Angular App

If possible try to fix the issues of the `Angular App` or at least write a friendly (no joke!) email to the person that you think might be responsible for fixing it.

### Bonus: Serve the App via Caddy reverse proxy & gzip (only Linux & Mac)

1. Open this page and install Caddy on your machine: https://caddyserver.com/docs/install
2. Checkout the `Caddyfile` in the projects root directory.
3. Build and serve your App again:
   ```
   nx b && npm run serve
   ```
4. In another terminal (tab) start Caddy with this command:
   ```
   caddy start
   ```
5. You should now be able to access your App on http://localhost:4210.
6. Stop Caddy with this command:
   ```
   caddy stop
   ```
7. Also stop your `serve` with `Ctrl+C`.
