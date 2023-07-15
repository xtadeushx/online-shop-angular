import { Component } from '@angular/core';
import { ILink, LABELS, PATHS } from './header.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  linksList: ILink[] = [
    { path: PATHS.ROOT, label: LABELS.HOME },
    { path: PATHS.PRODUCTS, label: LABELS.PRODUCTS },
    { path: PATHS.BASKET, label: LABELS.BASKET },
  ]
}

