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

//inscription

register(user: User): Observable<User>{

  return this.http.post<User>(this.apiUrl, user);
  }

//connexion

login(email:string, mdp:string): Observable<User | null>
{
return  this.http.get<User[]>(`${this.apiUrl}?email=${email}`).pipe(
  map(users => {
    const user =users[0];
    if(user && user.password === mdp){
      const {password, ...userWithoutPassword}= user;
      localStorage.setItem('currentUser',JSON.stringify(userWithoutPassword));

      return userWithoutPassword;
      }
return null;
      })
    );
  }

//logout

logout() {
  return localStorage.removeItem('currentUser');
  }


//getCurrentUser
 getCurrentUser() :User | null{
  const user = localStorage.getItem('currentUser');
  return user ?JSON.parse(user): null;
  }
  }

