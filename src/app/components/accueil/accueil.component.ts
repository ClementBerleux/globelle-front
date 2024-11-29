import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css',
})
export class AccueilComponent {
  readonly search = signal<string>('');
  readonly categories = signal<Category[]>([]);

  constructor(public categoryService: CategoryService) {
    this.categoryService
      .getCategories()
      .subscribe((data) => this.categories.set(data));
  }
}
