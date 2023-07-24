import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideImageKitLoader } from '@angular/common';
import { NoPreloading, provideRouter, withPreloading } from '@angular/router';

import { quicklinkProviders, QuicklinkStrategy } from 'ngx-quicklink';

import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideImageKitLoader('https://ik.imagekit.io/LXT'),
    provideRouter(
      appRoutes,
      // withDebugTracing(),
      // withEnabledBlockingInitialNavigation()
      withPreloading(NoPreloading),
    ),
    // quicklinkProviders,
  ],
};
