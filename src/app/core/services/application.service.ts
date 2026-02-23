import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApplicationService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/applications';

  apply(application: any): Observable<any> {
    return this.http.post(this.apiUrl, application);
  }

  getUserApplications(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?userId=${userId}`);
  }

  updateStatus(id: string, data: { status?: string, notes?: string }): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, data);
  }


  deleteApplication(id: string | number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
