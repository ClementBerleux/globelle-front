import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { UserToken } from '../models/user-token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, motDePasse: string): Observable<any> {
    return this.http
      .post<{ accessToken: string }>(`${this.apiUrl}/login`, {
        email: email,
        password: motDePasse,
      })
      .pipe(
        tap((response: { accessToken: string }) => {
          localStorage.setItem('token', response.accessToken); // Store the token
        })
      );
  }

  register(user: User, roleProvider: boolean): Observable<any> {
    if (roleProvider) return this.http.post(`${this.apiUrl}/register/1`, user);
    else return this.http.post(`${this.apiUrl}/register/2`, user);
  }

  getUserToken(): UserToken {
    // Get token from localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      return new UserToken();
    }

    try {
      // Decode the JWT token
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      // console.info(tokenPayload)
      // Return roles from token payload, or empty array if no roles found
      const userToken: UserToken = new UserToken();
      userToken.id = tokenPayload.id || 0;
      userToken.username = tokenPayload.username || '';
      userToken.firstname = tokenPayload.firstname || '';
      userToken.lastname = tokenPayload.lastname || '';
      userToken.role = tokenPayload.role || '';
      return userToken;
    } catch (error) {
      console.error('Error decoding token:', error);
      return new UserToken();
    }
  }

  logout(): void {
    localStorage.removeItem('token'); // Remove the token
    this.router.navigate(['']);
  }

  isAuthenticated(): boolean {
    // Logique pour vérifier si l'utilisateur est authentifié
    return !!localStorage.getItem('token');
  }

  // readonly isAuth = signal(false);

  // constructor(public router: Router) {}

  // public toogleAuth(): void {
  //   this.isAuth.set(!this.isAuth());
  //   if (!this.isAuth()) this.router.navigate(['']);
  // }
}
