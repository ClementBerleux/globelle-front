import { Component } from '@angular/core';
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
  public search: string = '';
  public categories: Category[];

  constructor(public categoryService: CategoryService) {
    this.categories = categoryService.getCategories();
  }
}
