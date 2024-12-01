import { Component, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProviderService } from '../../services/provider.service';
import { Provider } from '../../models/provider';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.css'
})
export class ReservationsComponent {
  readonly search = signal<string>('');
  readonly providers = signal<Provider[]>([]);

  constructor(
    public route: ActivatedRoute,
    public servicePrestataires: ProviderService,
    public location: Location
  ) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      this.search.set(params.get('search') || '');
      this.servicePrestataires
        .getPrestataires()
        .subscribe((data) => this.providers.set(data));
    });
  }
}
