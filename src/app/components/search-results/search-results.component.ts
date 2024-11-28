import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Provider } from '../../models/provider';
import { ProviderService } from '../../services/provider.service';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css',
})
export class SearchResultsComponent {
  public search: string = '';

  public prestataires: Provider[];

  constructor(
    public route: ActivatedRoute,
    public servicePrestataires: ProviderService
  ) {
    this.prestataires = servicePrestataires.getPrestataires();
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      this.search = params.get('search') || '';
    });
  }
}
