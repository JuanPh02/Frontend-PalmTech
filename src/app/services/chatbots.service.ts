import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { User } from 'app/models/user.model';

const base_url = environment.base_url;
const urlUsers = `${base_url}/users`

@Injectable({
  providedIn: 'root'
})
export class ChatbotsService {

  constructor(private http: HttpClient) { }

  createUser(user: User) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<any>(urlUsers, user, httpOptions).pipe(
      catchError(error => {
        return throwError(error);
      })
    )
  }

  getUsers() {
    return this.http.get<User[]>(urlUsers);
  }

  deleteUser() {
    
  }

}
