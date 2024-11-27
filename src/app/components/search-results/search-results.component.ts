import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css',
})
export class SearchResultsComponent {
  public constructor(public route: ActivatedRoute) {}

  public search: string = '';

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      this.search = params.get('search') || '';
    });
  }
}
