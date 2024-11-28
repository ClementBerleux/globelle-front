import { Routes } from '@angular/router';
import { AccueilComponent } from './components/accueil/accueil.component';
import { LoginComponent } from './components/login/login.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { BookingPageComponent } from './components/booking-page/booking-page.component';

export const routes: Routes = [
  { path: '', component: AccueilComponent },
  { path: 'login', component: LoginComponent },
  { path: 'result', component: SearchResultsComponent },
  { path: 'booking', component: BookingPageComponent },
  { path: '**', component: AccueilComponent },
];
