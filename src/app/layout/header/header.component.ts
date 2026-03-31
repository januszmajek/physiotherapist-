import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
  ],
  template: `
    <mat-toolbar class="header">
      <div class="header-content container">
        <a routerLink="/" class="logo">
          <mat-icon class="logo-icon">spa</mat-icon>
          <span class="logo-text">PhysioVita</span>
        </a>

        <nav class="desktop-nav">
          <a mat-button routerLink="/" routerLinkActive="active-link" [routerLinkActiveOptions]="{exact: true}">Home</a>
          <a mat-button routerLink="/team" routerLinkActive="active-link">Our Team</a>
          <a mat-button routerLink="/services" routerLinkActive="active-link">Services</a>
          <a mat-button routerLink="/contact" routerLinkActive="active-link">Contact</a>
          <a mat-flat-button routerLink="/contact" class="cta-button" color="primary">Book Appointment</a>
        </nav>

        <button mat-icon-button class="mobile-menu-btn" (click)="toggleMobileMenu()">
          <mat-icon>{{ mobileMenuOpen() ? 'close' : 'menu' }}</mat-icon>
        </button>
      </div>
    </mat-toolbar>

    @if (mobileMenuOpen()) {
      <div class="mobile-nav-overlay" (click)="closeMobileMenu()">
        <nav class="mobile-nav" (click)="$event.stopPropagation()">
          <a mat-button routerLink="/" routerLinkActive="active-link" [routerLinkActiveOptions]="{exact: true}" (click)="closeMobileMenu()">Home</a>
          <a mat-button routerLink="/team" routerLinkActive="active-link" (click)="closeMobileMenu()">Our Team</a>
          <a mat-button routerLink="/services" routerLinkActive="active-link" (click)="closeMobileMenu()">Services</a>
          <a mat-button routerLink="/contact" routerLinkActive="active-link" (click)="closeMobileMenu()">Contact</a>
          <a mat-flat-button routerLink="/contact" color="primary" (click)="closeMobileMenu()">Book Appointment</a>
        </nav>
      </div>
    }
  `,
  styles: [`
    .header {
      background: white;
      border-bottom: 1px solid var(--border-color);
      position: sticky;
      top: 0;
      z-index: 1000;
      height: 64px;
      padding: 0;
    }

    .header-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      max-width: var(--max-width);
      margin: 0 auto;
      padding: 0 24px;
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
    }

    .logo-icon {
      color: var(--primary);
      font-size: 28px;
      width: 28px;
      height: 28px;
    }

    .logo-text {
      font-size: 1.4rem;
      font-weight: 700;
      color: var(--primary-dark);
    }

    .desktop-nav {
      display: flex;
      align-items: center;
      gap: 4px;

      a {
        font-weight: 500;
        color: var(--text-secondary);
        letter-spacing: 0.02em;
      }
    }

    .active-link {
      color: var(--primary) !important;
    }

    .cta-button {
      background: var(--primary) !important;
      color: white !important;
      margin-left: 8px;
    }

    .mobile-menu-btn {
      display: none;
    }

    .mobile-nav-overlay {
      position: fixed;
      top: 64px;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.4);
      z-index: 999;
    }

    .mobile-nav {
      background: white;
      display: flex;
      flex-direction: column;
      padding: 16px;
      gap: 4px;
      box-shadow: var(--shadow-lg);

      a {
        justify-content: flex-start;
        font-weight: 500;
      }
    }

    @media (max-width: 768px) {
      .desktop-nav {
        display: none;
      }

      .mobile-menu-btn {
        display: flex;
      }
    }
  `],
})
export class HeaderComponent {
  mobileMenuOpen = signal(false);

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update(v => !v);
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }
}
