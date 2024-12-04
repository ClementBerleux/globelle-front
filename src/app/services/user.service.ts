import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { environment } from '../../environments/environment';
import { Provider } from '../models/provider';
import { Service } from '../models/service';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root',
})

export class UserService { 
  private token = localStorage.getItem('token');

  constructor(public http: HttpClient) {}

  getClients(): Observable<User[]> {
    return this.http.get<User[]>(environment.BACKEND_URL + '/users');
  }

  getClient(id: number): Observable<User> {
    return this.http.get<User>(environment.BACKEND_URL + '/users/' + id);
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(environment.BACKEND_URL + '/users/' + id, user);
  }

  delUser(id: number): Observable<any> {
    return this.http.delete(environment.BACKEND_URL + '/users/' + id);
  }

  getProviders(): Observable<Provider[]> {
    return this.http.get<Provider[]>(
      environment.BACKEND_URL + '/users/providers'
    );
  }

  getProvider(id: number): Observable<Provider> {
    return this.http.get<Provider>(environment.BACKEND_URL + '/users/' + id);
  }

  getServices(id: number): Observable<Service[]> {
    return this.http.get<Service[]>(
      environment.BACKEND_URL + '/users/provider/' + id + '/services'
    );
  }

  getProvidersSearch(search: string): Observable<Provider[]> {
    return this.http.get<Provider[]>(
      environment.BACKEND_URL + '/users/provider/search?service=' + search
    );
  }

  getReservations(): Observable<Reservation[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<Reservation[]>(environment.BACKEND_URL + '/users/client/31/reservations', { 'headers': headers });
  }
}
