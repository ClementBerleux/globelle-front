import { Component, signal } from '@angular/core';
import { UserService } from '../../services/user.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css',
})
export class AccountComponent {
  readonly user = signal<User>(new User());
  public accountForm = new FormGroup({
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    telephone: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    postalCode: new FormControl('', Validators.required),
  });
  public serviceForm = new FormGroup({
    serviceName: new FormControl('', Validators.required),
    servicePrice: new FormControl(undefined, Validators.required),
  });
  public languageForm = new FormGroup({
    languageName: new FormControl('', Validators.required),
  });
  public isProvider: boolean = true;

  constructor(
    public serviceUser: UserService,
    public authService: AuthService
  ) {
    if (authService.isAuth())
      this.serviceUser.getClient(2).subscribe((data) => {
        this.user.set(data);
        this.accountForm.patchValue(data);
      });
  }

  public onSubmit(): void {
    console.log(this.accountForm.value);
  }

  public delUser(): void {
    this.serviceUser.delUser(this.user().id).subscribe();
  }

  public ajoutService(): void {}

  public ajoutLanguage(): void {}
}
