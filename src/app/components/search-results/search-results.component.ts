import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css',
})
export class SearchResultsComponent {
  public constructor(public route: ActivatedRoute) {}

  public search: string = '';

  public services = [
    {
      name: 'Manucure',
      prestataire: 'Robert',
      prix: '35€',
      nbAvis: 18,
      note: 4,
      dispo: [true, false, true, true, false, false, true],
      isfavorite: false,
    },
    {
      name: 'Vernis',
      prestataire: 'Michel',
      prix: '15€',
      nbAvis: 7,
      note: 2,
      dispo: [true, true, true, true, true, false, false],
      isfavorite: true,
    },
    {
      name: 'Extension cils',
      prestataire: 'Bernard',
      prix: '88€',
      nbAvis: 13,
      note: 5,
      dispo: [true, true, false, false, false, true, false],
      isfavorite: false,
    },
  ];

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      this.search = params.get('search') || '';
    });
  }
}
