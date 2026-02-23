import { Component, inject } from '@angular/core';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

private router = inject(Router);

  get isLoggedIn(): boolean {
    return localStorage.getItem('currentUser') !== null;
  }
  logout() {
    localStorage.removeItem('currentUser');
    window.location.href = '/login';
  }
}
