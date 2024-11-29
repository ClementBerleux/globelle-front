import { Injectable } from '@angular/core';
import { Provider } from '../models/provider';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProviderService {
  // public prestataires: Provider[] = [
  //   {
  //     name: 'Manucure',
  //     prestataire: 'Roberto',
  //     prix: 35,
  //     nbAvis: 18,
  //     note: 4,
  //     dispo: [true, false, true, true, false, false, true],
  //     isfavorite: false,
  //   },
  //   {
  //     name: 'Vernis',
  //     prestataire: 'Michel',
  //     prix: 15,
  //     nbAvis: 7,
  //     note: 2,
  //     dispo: [true, true, true, true, true, false, false],
  //     isfavorite: true,
  //   },
  //   {
  //     name: 'Extension cils',
  //     prestataire: 'Bernard',
  //     prix: 88,
  //     nbAvis: 13,
  //     note: 5,
  //     dispo: [true, true, false, false, false, true, false],
  //     isfavorite: false,
  //   },
  // ];

  constructor(public http: HttpClient) {}

  getPrestataires(): Observable<Provider[]> {
    return this.http.get<Provider[]>(environment.BACKEND_URL + '/providers');
  }
}
