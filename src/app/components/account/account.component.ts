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
import { Provider } from '../../models/provider';
import { UserToken } from '../../models/user-token';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css',
})
export class AccountComponent {
  readonly userToken = signal<UserToken>(new UserToken());
  readonly provider = signal<Provider>(new Provider());
  public accountForm = new FormGroup({
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl(''),
    address: new FormControl('', Validators.required),
    postalCode: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    telephone: new FormControl('', Validators.required),
  });
  public serviceForm = new FormGroup({
    serviceName: new FormControl('', Validators.required),
    servicePrice: new FormControl(undefined, Validators.required),
  });
  public languageForm = new FormGroup({
    languageName: new FormControl('', Validators.required),
  });
  public disponibilites = signal('0000000');

  constructor(
    public router: Router,
    public userService: UserService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.userToken.set(this.authService.getUserToken());
    if (this.authService.isAuthenticated())
      this.userService.getClient(this.userToken().id).subscribe((data) => {
        this.accountForm.patchValue(data);
        this.accountForm.patchValue({ password: '****' });
      });
  }

  public onSubmit(): void {
    let user = new User();
    user.firstname = this.accountForm.value.firstname || '';
    user.lastname = this.accountForm.value.lastname || '';
    user.username = user.firstname[0] + user.lastname;
    user.username = user.username.trim().toLowerCase();
    user.email = this.accountForm.value.email || '';
    user.address = this.accountForm.value.address || '';
    user.postalCode = this.accountForm.value.postalCode || '';
    user.city = this.accountForm.value.city || '';
    user.telephone = this.accountForm.value.telephone || '';

    if (this.authService.isAuthenticated()) {
      user.password = null;
      this.userService.updateUser(this.userToken().id, user).subscribe();
    } else {
      user.password = this.accountForm.value.password || '';
      this.authService
        .register(user, false)
        .subscribe(() => this.router.navigate(['/login']));
    }
  }

  public delUser(): void {
    this.userService.delUser(this.userToken().id).subscribe();
  }

  public ajoutService(): void {}

  public ajoutLanguage(): void {}

  public toggleDispo(numJour: number): void {
    let nouvelleDispo = '0';
    if (this.disponibilites()[numJour] == '0') nouvelleDispo = '1';
    this.disponibilites.set(
      this.disponibilites().substring(0, numJour) +
        nouvelleDispo +
        this.disponibilites().substring(numJour + 1)
    );
  }
}
