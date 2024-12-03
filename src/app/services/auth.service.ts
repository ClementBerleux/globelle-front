import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {}

  login(email: string, motDePasse: string): Observable<any> {
    console.log('credential');
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

  register(user: User): Observable<any> {
    console.log('Register !!!');
    console.log(user);
    return this.http.post(`${this.apiUrl}/register/2`, {
      username: 'toto',
      email: 'toto@toto.fr',
      password: 'toto',
    }); // Endpoint for registration
  }

  getUserRoles(): string[] {
    // Get token from localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      return [];
    }

    try {
      // Decode the JWT token
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      // Return roles from token payload, or empty array if no roles found
      return tokenPayload.roles || [];
    } catch (error) {
      console.error('Error decoding token:', error);
      return [];
    }
  }

  logout(): void {
    localStorage.removeItem('token'); // Remove the token
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
