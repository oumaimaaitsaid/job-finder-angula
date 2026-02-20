import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobService } from '../../core/services/job.service';
import { JobCardComponent } from '../jobs/job-card/job-card.component';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, JobCardComponent, FormsModule],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  private jobService = inject(JobService);
  private router = inject(Router);

  jobs: any[] = [];
  filteredJobs: any[] = [];
  searchTerm: string = '';
  loading: boolean = true;

  ngOnInit() {
    this.loadJobs();
  }

  loadJobs() {
    this.loading = true;
    this.jobService.getJobs().subscribe({
      next: (data) => {
        this.jobs = data;
        this.filteredJobs = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur API:', err);
        this.loading = false;
      }
    });
  }


  onSearch() {
    this.filteredJobs = this.jobs.filter(job =>
      job.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
}
