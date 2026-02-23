import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import * as FavoritesActions from './favorites.actions';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class FavoritesEffects {
  private actions$ = inject(Actions);
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/favoritesOffers';

  loadFavorites$ = createEffect(() => this.actions$.pipe(
    ofType(FavoritesActions.loadFavorites),
    mergeMap(() => this.http.get<any[]>(this.apiUrl).pipe(
      map(favorites => FavoritesActions.loadFavoritesSuccess({ favorites })),
      catchError(() => of({ type: '[Favorites] Load Error' }))
    ))
  ));

  addFavorite$ = createEffect(() => this.actions$.pipe(
    ofType(FavoritesActions.addFavorite),
    mergeMap(({ offer }) => this.http.post(this.apiUrl, offer).pipe(
      map(favorite => FavoritesActions.addFavoriteSuccess({ favorite })),
      catchError(() => of({ type: '[Favorites] Add Error' }))
    ))
  ));

  removeFavorite$ = createEffect(() => this.actions$.pipe(
    ofType(FavoritesActions.removeFavorite),
    mergeMap(({ id }) => this.http.delete(`${this.apiUrl}/${id}`).pipe(
      map(() => FavoritesActions.removeFavoriteSuccess({ id })),
      catchError(() => of({ type: '[Favorites] Remove Error' }))
    ))
  ));
}
