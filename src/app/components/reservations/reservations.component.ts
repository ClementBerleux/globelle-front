import { Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Reservation } from '../../models/reservation';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { UserService } from '../../services/user.service';
import { UserToken } from '../../models/user-token';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.css',
})
export class ReservationsComponent {
  readonly search = signal<string>('');
  readonly reservations = signal<Reservation[]>([]);
  readonly userToken = signal<UserToken>(new UserToken());

  constructor(
    public route: ActivatedRoute,
    public userService: UserService,
    public authService: AuthService,
    public location: Location
  ) {}

  ngOnInit() {
    this.userToken.set(this.authService.getUserToken());
    this.route.queryParamMap.subscribe((params) => {
      this.search.set(params.get('search') || '');
      this.userService
        .getReservations(
          this.userToken().id,
          this.userToken().role == 'PROVIDER'
        )
        .subscribe((data) => this.reservations.set(data));
    });
  }
}
