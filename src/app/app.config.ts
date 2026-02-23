import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'; // 👈 Bedli hadi!

import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { favoritesReducer } from './store/favorites/favorites.reducer';
import { FavoritesEffects } from './store/favorites/favorites.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(), // 👈 Sta3mli hadi blast provideAnimations()
    provideStore({ favorites: favoritesReducer }),
    provideEffects([FavoritesEffects]),
  ]
};
