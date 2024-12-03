import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { environment } from '../../environments/environment';
import { Provider } from '../models/provider';
import { Service } from '../models/service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(public http: HttpClient) { }

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
    return this.http.get<Provider[]>(environment.BACKEND_URL + '/users/providers');
  }

  getProvider(id: number): Observable<Provider> {
    return this.http.get<Provider>(environment.BACKEND_URL + '/users/providers/' + id);
  }

  getServices(id: number): Observable<Service[]> {
    return this.http.get<Service[]>(environment.BACKEND_URL + '/users/1/' + id + '/services');
  }
}
