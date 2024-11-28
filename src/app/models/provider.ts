export class Provider {
  name: string = '';
  prestataire: string = '';
  prix: number = 0;
  nbAvis: number = 0;
  note: number = 3;
  dispo: [boolean, boolean, boolean, boolean, boolean, boolean, boolean] = [
    true,
    false,
    true,
    true,
    false,
    false,
    true,
  ];
  isfavorite: boolean = false;
}
