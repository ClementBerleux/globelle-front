import { AfterViewInit, Component } from '@angular/core';
import { Location } from '@angular/common';
//import flatpickr from 'flatpickr';

@Component({
  selector: 'app-booking-page',
  standalone: true,
  imports: [],
  templateUrl: './booking-page.component.html',
  styleUrl: './booking-page.component.css',
})
export class BookingPageComponent implements AfterViewInit {
  public services = [{}, {}];

  constructor(public location: Location) {}

  ngAfterViewInit(): void {
    // flatpickr('#datepicker', {
    //   disable: [
    //     '2024-11-30', // Désactive une date spécifique
    //     '2024-12-01',
    //     '30/11/2024',
    //     '01/12/2024',
    //   ],
    //   minDate: '', // Empêche de sélectionner les dates passées
    // });
  }
}
