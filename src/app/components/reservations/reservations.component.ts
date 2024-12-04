import { Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Reservation } from '../../models/reservation';
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
  readonly reservations = signal<Reservation[]>([]);

  constructor(
    public route: ActivatedRoute,
    public userService: UserService,
    public location: Location
  ) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      this.search.set(params.get('search') || '');
      this.userService
        .getReservations()
        .subscribe((data) => this.reservations.set(data));
    });
  }
}
