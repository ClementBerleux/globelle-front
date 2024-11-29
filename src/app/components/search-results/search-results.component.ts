import { Component, signal } from '@angular/core';
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
  readonly search = signal<string>('');
  readonly providers = signal<Provider[]>([]);

  constructor(
    public route: ActivatedRoute,
    public servicePrestataires: ProviderService
  ) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      this.search.set(params.get('search') || '');
      this.servicePrestataires
        .getPrestataires()
        .subscribe((data) => this.providers.set(data));
    });
  }
}
