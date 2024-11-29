import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  // private categories: Category[] = [
  //   { name: 'Manucure', image: 'images/categories/Belle1.png' },
  //   { name: 'Epilation', image: 'images/categories/Belle2.png' },
  //   { name: 'Coiffure', image: 'images/categories/Belle3.png' },
  //   { name: 'Maquillage', image: 'images/categories/Belle4.png' },
  //   { name: 'Extension de cils', image: 'images/categories/Belle5.png' },
  //   { name: 'Soin', image: 'images/categories/Belle6.png' },
  // ];

  constructor(public http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(environment.BACKEND_URL + '/categories');
  }
}
