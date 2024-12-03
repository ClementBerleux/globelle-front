import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {
  readonly userName = signal<string>('');

  constructor(
    public serviceAuth: AuthService,
    public serviceUser: UserService
  ) {
    this.serviceUser
      .getClient(3)
      .subscribe((data) =>
        this.userName.set(data.firstname + ' ' + data.lastname)
      );
  }
}
