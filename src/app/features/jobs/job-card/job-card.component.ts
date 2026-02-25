import { Component, Input, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { isFavorite } from '../../../store/favorites/favorites.selectors';
import { take } from 'rxjs';
import * as FavoritesActions from '../../../store/favorites/favorites.actions';
import { ApplicationService } from '../../../core/services/application.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-job-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.css']
})
export class JobCardComponent implements OnInit {
  private store = inject(Store);
  private appService = inject(ApplicationService);

  @Input() job: any;

  isAlreadyFavorite$: Observable<boolean> = of(false);


  showToast = false;
  toastMsg = '';
  toastType: 'success' | 'error' | 'info' = 'success';

  ngOnInit() {
    const currentOfferId = this.job.slug || this.job.id;
    this.isAlreadyFavorite$ = this.store.select(isFavorite(currentOfferId));
  }

  isNew(timestamp: number): boolean {
    const today = new Date().getTime();
    const jobDate = timestamp * 1000;
    const diff = (today - jobDate) / (1000 * 3600 * 24);
    return diff < 7;
  }

  private triggerToast(msg: string, type: 'success' | 'error' | 'info' = 'success') {
    this.toastMsg = msg;
    this.toastType = type;
    this.showToast = true;
    setTimeout(() => this.showToast = false, 3000);
  }

  addToFavorites() {
    const userData = localStorage.getItem('currentUser');
    if (!userData) {
      this.triggerToast('Veuillez vous connecter', 'info');
      return;
    }

    const user = JSON.parse(userData);
    const currentOfferId = this.job.slug || this.job.id;

    this.store.select(isFavorite(currentOfferId)).pipe(
      take(1)
    ).subscribe(exists => {
      if (exists) {
        this.triggerToast('Déjà dans vos favoris !', 'info');
      } else {
        const favoriteOffer = {
          userId: user.id,
          offerId: currentOfferId,
          title: this.job.title,
          company: this.job.company_name,
          location: this.job.location
        };
        this.store.dispatch(FavoritesActions.addFavorite({ offer: favoriteOffer }));
        this.triggerToast('Ajouté aux favoris ❤️');
      }
    });
  }

  onApply() {
    const userData = localStorage.getItem('currentUser');
    if (!userData) {
      this.triggerToast('Veuillez vous connecter', 'info');
      return;
    }

    const user = JSON.parse(userData);

    const newApplication = {
      userId: user.id,
      offerId: this.job.slug || Math.random().toString(),
      apiSource: "arbeitnow",
      title: this.job.title,
      company: this.job.company_name,
      location: this.job.location,
      url: this.job.url,
      status: "en_attente",
      notes: "",
      dateAdded: new Date().toISOString()
    };

    this.appService.apply(newApplication).subscribe({
      next: () => this.triggerToast('Candidature enregistrée ! 🚀'),
      error: (err) => this.triggerToast('Erreur: ' + err.message, 'error')
    });
  }
}
