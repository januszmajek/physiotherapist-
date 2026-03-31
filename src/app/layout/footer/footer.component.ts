import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ClinicStore } from '../../store/clinic.store';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, MatIconModule, MatButtonModule],
  template: `
    <footer class="footer">
      <div class="container footer-content">
        <div class="footer-section brand">
          <div class="footer-logo">
            <mat-icon class="logo-icon">spa</mat-icon>
            <span class="logo-text">PhysioVita</span>
          </div>
          <p class="footer-description">
            Evidence-based physiotherapy for a healthier, more active life.
            Our expert team is dedicated to your recovery and well-being.
          </p>
        </div>

        <div class="footer-section">
          <h4>Quick Links</h4>
          <nav class="footer-nav">
            <a routerLink="/">Home</a>
            <a routerLink="/team">Our Team</a>
            <a routerLink="/services">Services</a>
            <a routerLink="/contact">Contact</a>
          </nav>
        </div>

        <div class="footer-section">
          <h4>Contact</h4>
          <div class="contact-lines">
            <p><mat-icon>location_on</mat-icon> {{ store.contactInfo().address }}, {{ store.contactInfo().city }}</p>
            <p><mat-icon>phone</mat-icon> {{ store.contactInfo().phone }}</p>
            <p><mat-icon>email</mat-icon> {{ store.contactInfo().email }}</p>
          </div>
        </div>

        <div class="footer-section">
          <h4>Hours</h4>
          <div class="hours-list">
            @for (h of store.contactInfo().openingHours; track h.day) {
              <div class="hours-row">
                <span class="day">{{ h.day }}</span>
                <span class="time">{{ h.hours }}</span>
              </div>
            }
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <div class="container footer-bottom-content">
          <p>&copy; 2026 PhysioVita. All rights reserved.</p>
          <p class="footer-tagline">Designed with care for your well-being.</p>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: var(--bg-dark);
      color: #cfd8dc;
      padding-top: 64px;
    }

    .footer-content {
      display: grid;
      grid-template-columns: 1.5fr 1fr 1fr 1fr;
      gap: 40px;
      padding-bottom: 48px;
    }

    .footer-logo {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 16px;
    }

    .logo-icon {
      color: var(--primary-light);
      font-size: 24px;
    }

    .logo-text {
      font-size: 1.3rem;
      font-weight: 700;
      color: white;
    }

    .footer-description {
      font-size: 0.9rem;
      line-height: 1.7;
      opacity: 0.8;
    }

    h4 {
      color: white;
      font-weight: 600;
      margin-bottom: 16px;
      font-size: 1rem;
    }

    .footer-nav {
      display: flex;
      flex-direction: column;
      gap: 10px;

      a {
        opacity: 0.8;
        transition: opacity 0.2s;
        font-size: 0.9rem;

        &:hover {
          opacity: 1;
          color: var(--primary-light);
        }
      }
    }

    .contact-lines {
      display: flex;
      flex-direction: column;
      gap: 10px;

      p {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 0.9rem;
        opacity: 0.8;

        mat-icon {
          font-size: 18px;
          width: 18px;
          height: 18px;
          color: var(--primary-light);
        }
      }
    }

    .hours-list {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .hours-row {
      display: flex;
      justify-content: space-between;
      font-size: 0.85rem;
      opacity: 0.8;
      gap: 12px;
    }

    .day {
      min-width: 80px;
    }

    .footer-bottom {
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      padding: 20px 0;
    }

    .footer-bottom-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.85rem;
      opacity: 0.6;
    }

    @media (max-width: 768px) {
      .footer-content {
        grid-template-columns: 1fr;
        gap: 32px;
      }

      .footer-bottom-content {
        flex-direction: column;
        gap: 8px;
        text-align: center;
      }
    }
  `],
})
export class FooterComponent {
  store = inject(ClinicStore);
}
