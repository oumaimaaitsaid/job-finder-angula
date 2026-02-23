import { createAction, props } from '@ngrx/store';

export const loadFavorites = createAction('[Favorites] Load Favorites');
export const loadFavoritesSuccess = createAction('[Favorites] Load Success', props<{ favorites: any[] }>());
export const addFavorite = createAction('[Favorites] Add Favorite', props<{ offer: any }>());
export const addFavoriteSuccess = createAction('[Favorites] Add Success', props<{ favorite: any }>());
export const removeFavorite = createAction('[Favorites] Remove Favorite', props<{ id: string }>());
export const removeFavoriteSuccess = createAction('[Favorites] Remove Success', props<{ id: string }>());
