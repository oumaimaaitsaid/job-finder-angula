import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  private http = inject(HttpClient);
  private router = inject(Router);

  user: any = null;

  // UI State
  showToast = false;
  toastMsg = '';
  isDeleteModalOpen = false;

  ngOnInit() {
    const data = localStorage.getItem('currentUser');
    if (data) this.user = JSON.parse(data);
  }

  private triggerToast(msg: string) {
    this.toastMsg = msg;
    this.showToast = true;
    setTimeout(() => this.showToast = false, 3000);
  }

  onUpdate() {
    this.http.patch(`http://localhost:3000/users/${this.user.id}`, this.user)
      .subscribe(() => {
        localStorage.setItem('currentUser', JSON.stringify(this.user));
        this.triggerToast('Profil mis à jour avec succès ! ✨');
      });
  }

  openDeleteModal() {
    this.isDeleteModalOpen = true;
  }

  closeDeleteModal() {
    this.isDeleteModalOpen = false;
  }

  confirmDelete() {
    this.http.delete(`http://localhost:3000/users/${this.user.id}`).subscribe(() => {
      localStorage.clear();
      this.isDeleteModalOpen = false;
      this.router.navigate(['/register']);
    });
  }
}
