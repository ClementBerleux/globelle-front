export class User {
  id: number = 0;
  firstname: string = '';
  lastname: string = '';
  username: string = '';
  email: string = '';
  password: string | null = null;
  postalCode: string = '';
  city: string = '';
  address: string = '';
  telephone: string = '';
  backlisted: boolean = false;
}
