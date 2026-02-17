import { Injectable, inject } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user.model';
import {Observable ,map} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

 private http= inject(HttpClient);
 private apiUrl= 'http://localhost:3000/users';
}









  }

