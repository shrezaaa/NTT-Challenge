import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

const matModules = [
  MatIconModule,
  MatButtonModule,
  MatMenuModule,
];
@Component({
  selector: 'app-top-navbar',
  standalone: true,
  imports: [matModules],
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.scss'],
})
export class TopNavbarComponent {
  @Input() isLeftExpanded = false;
  @Output() isLeftExpandedChange = new EventEmitter<boolean>();
  hasProfileImg = false;

  @Input() mobileQuery!: MediaQueryList;

  constructor(private router: Router) {}

  getImageUrl(): string {
    return '';
  }


  onLogout() {
    this.router.navigate(['auth/login']);
  }

  toggleLeftExpansion() {
    this.isLeftExpanded = !this.isLeftExpanded;
    this.isLeftExpandedChange.emit(this.isLeftExpanded);
  }
}
