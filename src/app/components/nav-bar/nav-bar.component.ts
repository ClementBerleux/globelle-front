import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { UserToken } from '../../models/user-token';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {
  readonly userToken = signal<UserToken>(new UserToken);

  constructor(
    public authService: AuthService,
    public userService: UserService
  ) {
  }

  ngOnInit(){
    this.userToken.set(this.authService.getUserToken())
  }
}
