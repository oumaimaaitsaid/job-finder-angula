import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectAllFavorites } from '../../store/favorites/favorites.selectors';
import * as FavoritesActions from '../../store/favorites/favorites.actions';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  private store = inject(Store);

  favorites$ = this.store.select(selectAllFavorites);

  showToast = false;
  toastMsg = '';

  ngOnInit() {
    this.store.dispatch(FavoritesActions.loadFavorites());
  }

  onRemove(id: string) {
    this.store.dispatch(FavoritesActions.removeFavorite({ id }));
    this.triggerToast('Offre supprimée des favoris');
  }

  triggerToast(msg: string) {
    this.toastMsg = msg;
    this.showToast = true;
    setTimeout(() => this.showToast = false, 3000);
  }
}
