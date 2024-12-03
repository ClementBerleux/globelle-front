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

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css',
})
export class AccountComponent {
  readonly user = signal<User>(new User());
  readonly provider = signal<Provider>(new Provider());
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
  public disponibilites = signal('0000000');

  constructor(
    public serviceUser: UserService,
    public authService: AuthService
  ) {
    if (authService.isAuthenticated())
      this.serviceUser.getClient(3).subscribe((data) => {
        this.user.set(data);
        this.accountForm.patchValue(data);
      });
  }

  public onSubmit(): void {
    if (this.authService.isAuthenticated()) {
      // this.serviceUser.updateUser(this.user().id).subscribe();
    } else {
      let user = new User();
      user.firstname = this.accountForm.value.firstname || '';
      user.lastname = this.accountForm.value.lastname || '';
      console.log('User à ajouter : ');
      console.log(user);
      this.authService.register(user).subscribe();
    }
  }

  public delUser(): void {
    this.serviceUser.delUser(this.user().id).subscribe();
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
