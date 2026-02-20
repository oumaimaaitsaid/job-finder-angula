import { Injectable, inject } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, map} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobService {

private http = inject(HttpClient);

private apiUrl= 'https://www.arbeitnow.com/api/job-board-api';





}
