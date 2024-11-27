import { Component } from '@angular/core';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css',
})
export class AccueilComponent {
  public categories = [
    { name: 'Manucure', image: 'images/categories/Belle1.png' },
    { name: 'Epilation', image: 'images/categories/Belle2.png' },
    { name: 'Coiffure', image: 'images/categories/Belle3.png' },
    { name: 'Maquillage', image: 'images/categories/Belle4.png' },
    { name: 'Extension de cils', image: 'images/categories/Belle5.png' },
    { name: 'Soin', image: 'images/categories/Belle6.png' },
  ];
}
