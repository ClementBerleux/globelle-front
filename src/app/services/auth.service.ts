import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly isAuth = signal(false)

  constructor() { }

  public toogleAuth(): void {
    this.isAuth.set(!this.isAuth())
  }
}
