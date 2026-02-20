import { Injectable, inject } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, map} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobService {

private http = inject(HttpClient);

private apiUrl= 'https://www.arbeitnow.com/api/job-board-api';

 getJobs(): Observable<any[]> {

   return this.http.get<any>(this.apiUrl).pipe(
     map(response =>{

       let jobs = response.data;

       return jobs.sort((a: any, b: any) => b.created_at - a.created_at );





       })

);

   }



}
