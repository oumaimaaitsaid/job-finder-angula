import { createReducer, on } from '@ngrx/store';
import * as FavoritesActions from './favorites.actions';

export interface FavoritesState {
  favorites: any[];
  loading: boolean;
}

export const initialState: FavoritesState = {
  favorites: [],
  loading: false
};

export const favoritesReducer = createReducer(
  initialState,
  on(FavoritesActions.loadFavoritesSuccess, (state, { favorites }) => ({ ...state, favorites })),
  on(FavoritesActions.addFavoriteSuccess, (state, { favorite }) => ({
    ...state,
    favorites: [...state.favorites, favorite]
  })),
  on(FavoritesActions.removeFavoriteSuccess, (state, { id }) => ({
    ...state,
    favorites: state.favorites.filter(f => f.id !== id)
  }))
);
