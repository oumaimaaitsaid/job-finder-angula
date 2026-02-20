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







}
