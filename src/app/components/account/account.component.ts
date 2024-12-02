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
    id: new FormControl(0, Validators.required),
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    telephone: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    postalCode: new FormControl('', Validators.required),
  });

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
    this.serviceUser
      .delUser(this.accountForm.get('id')?.getRawValue())
      .subscribe();
  }
}
