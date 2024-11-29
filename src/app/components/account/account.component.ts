import { Component, signal } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css',
})
export class AccountComponent {
  readonly user = signal<User>(new User());

  constructor(public serviceUser: UserService) {
    this.serviceUser.getClient(1).subscribe((data) => this.user.set(data));
  }
}
