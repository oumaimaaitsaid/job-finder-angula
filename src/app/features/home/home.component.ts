import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobService } from '../../core/services/job.service';
import { JobCardComponent } from '../jobs/job-card/job-card.component';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router'; // Zdi RouterModule bach l-links d-navbar ikhdmou

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, JobCardComponent, FormsModule, RouterModule],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  private jobService = inject(JobService);
  private router = inject(Router);

  jobs: any[] = [];
  filteredJobs: any[] = [];

  hasSearched: boolean = false;
  loading: boolean = false;

  searchTerm: string = '';
  locationTerm: string = '';

  currentPage: number = 1;
  itemsPerPage: number = 10;

  ngOnInit() {
  }

  onSearch() {
    this.hasSearched = true;
    this.loading = true;

    this.jobService.getJobs().subscribe({
      next: (data) => {
        this.jobs = data.sort((a: any, b: any) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        this.applyFilters();
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur API:', err);
        this.loading = false;
      }
    });
  }

  applyFilters() {
    this.filteredJobs = this.jobs.filter(job => {
      const matchTitle = job.title.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchLocation = job.location.toLowerCase().includes(this.locationTerm.toLowerCase());
      return matchTitle && matchLocation;
    });
    this.currentPage = 1;
  }

  get paginatedJobs() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredJobs.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages() {
    return Math.ceil(this.filteredJobs.length / this.itemsPerPage);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      window.scrollTo(0, 0);
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      window.scrollTo(0, 0);
    }
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
}
