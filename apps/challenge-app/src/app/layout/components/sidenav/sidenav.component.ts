import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  SidenavNode,
  SIDENAV_CONFIG,
} from '../../../core/navigation/sidenav.config';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

const matModules = [
  MatIconModule,
  MatButtonModule,
  MatTooltipModule,
  MatDividerModule,
];

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  standalone: true,
  imports: [matModules, CommonModule, RouterModule],
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent {
  readonly ACCESS_LIST = ['M', 'S', 'T'];

  data: SidenavNode[] = SIDENAV_CONFIG;
  @Input() mobileQuery!: MediaQueryList;
  @Input() isLeftExpanded = false;
  @Output() isLeftExpandedChange = new EventEmitter<boolean>();

  toggleLeftExpansion() {
    this.isLeftExpanded = !this.isLeftExpanded;
    this.isLeftExpandedChange.emit(this.isLeftExpanded);
  }
}
