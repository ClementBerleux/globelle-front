import { Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Provider } from '../../models/provider';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { UserService } from '../../services/user.service';

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
    public userService: UserService,
    public location: Location
  ) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      this.search.set(params.get('search') || '');
      this.userService
        .getProviders()
        .subscribe((data) => this.providers.set(data));
    });
  }
}
