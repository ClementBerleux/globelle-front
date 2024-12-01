import { Component, signal } from '@angular/core';
import { Location } from '@angular/common';
import { ProviderService } from '../../services/provider.service';
import { Service } from '../../models/service';
import { Provider } from '../../models/provider';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-booking-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './booking-page.component.html',
  styleUrl: './booking-page.component.css',
})
export class BookingPageComponent {
  readonly services = signal<Service[]>([]);
  readonly provider = signal<Provider>(new Provider);
  readonly idProvider = signal(0)
  readonly selection = signal('')
  public today: Date = new Date(Date.now())
  public todayString: string;
  public formGroup = new FormGroup({
    service: new FormControl('', { nonNullable: true })
  })

  constructor(private route: ActivatedRoute, public location: Location, public providerService: ProviderService) {
    this.todayString = this.today.getFullYear() + '-' + this.today.getMonth() + '-' + this.today.getDate()
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => this.idProvider.set(Number(params.get('id'))))
    this.providerService.getPrestataire(this.idProvider()).subscribe((data) => this.provider.set(data))
    this.providerService.getServices(this.idProvider()).subscribe((data) => this.services.set(data));
    // console.log('Date : ' + Date.now())
  }

  onSubmit(): void {
    // console.log(this.formGroup.value)
  }

  inputChange(serviceName: string): void {
    this.selection.set(serviceName)
  }
}
