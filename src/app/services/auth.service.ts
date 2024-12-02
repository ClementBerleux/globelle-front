import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly isAuth = signal(false);

  constructor(public router: Router) {}

  public toogleAuth(): void {
    this.isAuth.set(!this.isAuth());
    if (!this.isAuth()) this.router.navigate(['']);
  }
}
