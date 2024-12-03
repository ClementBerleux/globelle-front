import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  public isProvider: boolean = false;
  public email: string = '';
  public motDePasse: string = '';

  constructor(public authService: AuthService) {}

  public connect(): void {
    // let user = new User;
    // user.email = this.email
    // user.pa = this.email
    this.authService.login(this.email, this.motDePasse).subscribe();
  }
}
