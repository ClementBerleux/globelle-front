import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';

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

  constructor(
    public router: Router,
    public authService: AuthService,
    public location: Location
  ) {}

  public connect(): void {
    this.authService
      .login(this.email, this.motDePasse)
      .subscribe(() => this.location.back());
  }
}
