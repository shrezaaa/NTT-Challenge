import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { TopNavbarComponent } from '../top-navbar/top-navbar.component';

const matModules = [MatSidenavModule, MatIconModule, MatButtonModule];

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  standalone: true,
  imports: [
    matModules,
    CommonModule,
    RouterModule,
    SidenavComponent,
    TopNavbarComponent,
  ],
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  isLeftExpanded = false;
  mobileQuery: MediaQueryList;

  constructor(private media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 768px)'); //md support
  }

  ngOnInit(): void {
    this.isLeftExpanded =
      localStorage.getItem('FOLDED') == 'true' ? true : false;
  }

  saveLeftState() {
    localStorage.setItem('FOLDED', this.isLeftExpanded.toString());
  }

  onOpenedChange(event: any) {
    if (this.mobileQuery.matches) this.isLeftExpanded = event;
  }
}
