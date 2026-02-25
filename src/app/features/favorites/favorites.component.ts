import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectAllFavorites } from '../../store/favorites/favorites.selectors';
import * as FavoritesActions from '../../store/favorites/favorites.actions';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorites.component.html'
})
export class FavoritesComponent implements OnInit {
  private store = inject(Store);

  favorites$ = this.store.select(selectAllFavorites);

 showToast = false;
 toastMsg = ';'
  ngOnInit() {
    this.store.dispatch(FavoritesActions.loadFavorites());
  }

  onRemove(id: string) {
    if(confirm('Supprimer de vos favoris ?')) {
      this.store.dispatch(FavoritesActions.removeFavorite({ id }));
      this.triggerToast('Offre supprimée des favoris 🗑️');

    }
}

triggerToast(msg: string) {
    this.toastMsg = msg;
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }
}
