import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ClinicStore } from '../../store/clinic.store';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  template: `
    <!-- Page Header -->
    <section class="page-header">
      <div class="container">
        <h1>Contact Us</h1>
        <p>Get in touch to schedule your appointment or ask any questions</p>
      </div>
    </section>

    <section class="section">
      <div class="container contact-layout">
        <!-- Contact Form -->
        <mat-card class="contact-form-card" appearance="outlined">
          <mat-card-header>
            <mat-card-title>Book an Appointment</mat-card-title>
            <mat-card-subtitle>Fill out the form and we'll get back to you within 24 hours</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <form [formGroup]="contactForm" class="contact-form" (ngSubmit)="onSubmit()">
              <div class="form-row">
                <mat-form-field appearance="outline">
                  <mat-label>First Name</mat-label>
                  <input matInput formControlName="firstName" />
                </mat-form-field>
                <mat-form-field appearance="outline">
                  <mat-label>Last Name</mat-label>
                  <input matInput formControlName="lastName" />
                </mat-form-field>
              </div>

              <div class="form-row">
                <mat-form-field appearance="outline">
                  <mat-label>Email</mat-label>
                  <input matInput formControlName="email" type="email" />
                  <mat-icon matSuffix>email</mat-icon>
                </mat-form-field>
                <mat-form-field appearance="outline">
                  <mat-label>Phone</mat-label>
                  <input matInput formControlName="phone" />
                  <mat-icon matSuffix>phone</mat-icon>
                </mat-form-field>
              </div>

              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Service of Interest</mat-label>
                <mat-select formControlName="service">
                  @for (service of store.services(); track service.id) {
                    <mat-option [value]="service.id">{{ service.name }}</mat-option>
                  }
                </mat-select>
              </mat-form-field>

              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Your Message</mat-label>
                <textarea matInput formControlName="message" rows="5" placeholder="Describe your condition or any questions you have..."></textarea>
              </mat-form-field>

              <button mat-flat-button type="submit" class="submit-btn" [disabled]="contactForm.invalid">
                <mat-icon>send</mat-icon>
                Send Message
              </button>
            </form>
          </mat-card-content>
        </mat-card>

        <!-- Contact Info Sidebar -->
        <div class="contact-sidebar">
          <mat-card class="info-card" appearance="outlined">
            <mat-card-content>
              <div class="info-item">
                <div class="info-icon">
                  <mat-icon>location_on</mat-icon>
                </div>
                <div>
                  <h4>Address</h4>
                  <p>{{ store.contactInfo().address }}</p>
                  <p>{{ store.contactInfo().postalCode }} {{ store.contactInfo().city }}</p>
                </div>
              </div>

              <div class="info-item">
                <div class="info-icon">
                  <mat-icon>phone</mat-icon>
                </div>
                <div>
                  <h4>Phone</h4>
                  <p>{{ store.contactInfo().phone }}</p>
                </div>
              </div>

              <div class="info-item">
                <div class="info-icon">
                  <mat-icon>email</mat-icon>
                </div>
                <div>
                  <h4>Email</h4>
                  <p>{{ store.contactInfo().email }}</p>
                </div>
              </div>
            </mat-card-content>
          </mat-card>

          <mat-card class="hours-card" appearance="outlined">
            <mat-card-content>
              <h3>
                <mat-icon>schedule</mat-icon>
                Opening Hours
              </h3>
              <div class="hours-list">
                @for (h of store.contactInfo().openingHours; track h.day) {
                  <div class="hours-row" [class.closed]="h.hours === 'Closed'">
                    <span class="day">{{ h.day }}</span>
                    <span class="time">{{ h.hours }}</span>
                  </div>
                }
              </div>
            </mat-card-content>
          </mat-card>

          <mat-card class="social-card" appearance="outlined">
            <mat-card-content>
              <h3>Follow Us</h3>
              <div class="social-links">
                @if (store.contactInfo().socialMedia.facebook) {
                  <a class="social-link" aria-label="Facebook">
                    <mat-icon>group</mat-icon>
                    <span>Facebook</span>
                  </a>
                }
                @if (store.contactInfo().socialMedia.instagram) {
                  <a class="social-link" aria-label="Instagram">
                    <mat-icon>photo_camera</mat-icon>
                    <span>Instagram</span>
                  </a>
                }
                @if (store.contactInfo().socialMedia.linkedin) {
                  <a class="social-link" aria-label="LinkedIn">
                    <mat-icon>business</mat-icon>
                    <span>LinkedIn</span>
                  </a>
                }
              </div>
            </mat-card-content>
          </mat-card>
        </div>
      </div>
    </section>

    <!-- Map Section -->
    <section class="map-section">
      <div class="container">
        <h2 class="section-title">Find Us</h2>
        <p class="section-subtitle">We're located in the heart of Kraków, easily accessible by public transport</p>
        <mat-card class="map-card" appearance="outlined">
          <div class="map-placeholder placeholder-image">
            <div class="map-content">
              <mat-icon>map</mat-icon>
              <p>Interactive Map</p>
              <span>{{ store.contactInfo().address }}, {{ store.contactInfo().postalCode }} {{ store.contactInfo().city }}</span>
              <span class="coords">{{ store.contactInfo().latitude }}°N, {{ store.contactInfo().longitude }}°E</span>
            </div>
          </div>
        </mat-card>
      </div>
    </section>
  `,
  styles: [`
    .page-header {
      background: linear-gradient(135deg, var(--bg-light) 0%, #e8f5f2 100%);
      padding: 64px 0 48px;
      text-align: center;

      h1 {
        font-size: 2.5rem;
        font-weight: 800;
        color: var(--text-primary);
        margin-bottom: 12px;
      }

      p {
        font-size: 1.15rem;
        color: var(--text-secondary);
      }
    }

    .contact-layout {
      display: grid;
      grid-template-columns: 1.5fr 1fr;
      gap: 32px;
      align-items: start;
    }

    .contact-form-card {
      padding: 8px;
    }

    .contact-form {
      display: flex;
      flex-direction: column;
      gap: 4px;
      margin-top: 16px;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    .full-width {
      width: 100%;
    }

    .submit-btn {
      background: var(--primary) !important;
      color: white !important;
      height: 48px;
      font-size: 1rem;
      align-self: flex-start;
      padding: 0 32px !important;

      mat-icon {
        margin-right: 8px;
      }
    }

    .contact-sidebar {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .info-card mat-card-content {
      display: flex;
      flex-direction: column;
      gap: 20px;
      padding: 24px;
    }

    .info-item {
      display: flex;
      gap: 16px;
      align-items: flex-start;

      h4 {
        font-weight: 600;
        margin-bottom: 2px;
        font-size: 0.95rem;
      }

      p {
        color: var(--text-secondary);
        font-size: 0.9rem;
      }
    }

    .info-icon {
      width: 44px;
      height: 44px;
      background: var(--bg-light);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;

      mat-icon {
        color: var(--primary);
      }
    }

    .hours-card mat-card-content {
      padding: 24px;
    }

    .hours-card h3 {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 1.05rem;
      font-weight: 600;
      margin-bottom: 16px;

      mat-icon {
        color: var(--primary);
      }
    }

    .hours-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .hours-row {
      display: flex;
      justify-content: space-between;
      font-size: 0.9rem;
      padding: 4px 0;

      &.closed {
        opacity: 0.5;

        .time {
          color: #c62828;
        }
      }
    }

    .day {
      font-weight: 500;
    }

    .time {
      color: var(--text-secondary);
    }

    .social-card mat-card-content {
      padding: 24px;

      h3 {
        font-size: 1.05rem;
        font-weight: 600;
        margin-bottom: 16px;
      }
    }

    .social-links {
      display: flex;
      gap: 12px;
    }

    .social-link {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 8px 16px;
      background: var(--bg-light);
      border-radius: var(--radius-sm);
      color: var(--text-secondary);
      font-size: 0.9rem;
      transition: background 0.2s;
      cursor: pointer;

      &:hover {
        background: #e0f2ef;
        color: var(--primary);
      }

      mat-icon {
        font-size: 18px;
        width: 18px;
        height: 18px;
      }
    }

    .map-section {
      padding: 0 0 80px;
    }

    .map-card {
      overflow: hidden;
    }

    .map-placeholder {
      height: 400px;
      font-size: 1rem;
      border-radius: 0;
    }

    .map-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      text-align: center;

      mat-icon {
        font-size: 4rem;
        width: 64px;
        height: 64px;
        margin-bottom: 8px;
      }

      p {
        font-size: 1.3rem;
        font-weight: 600;
      }

      span {
        opacity: 0.9;
        font-size: 0.95rem;
      }

      .coords {
        font-size: 0.85rem;
        opacity: 0.7;
        font-family: monospace;
      }
    }

    @media (max-width: 768px) {
      .contact-layout {
        grid-template-columns: 1fr;
      }

      .form-row {
        grid-template-columns: 1fr;
      }

      .social-links {
        flex-direction: column;
      }

      .map-placeholder {
        height: 280px;
      }

      .page-header h1 {
        font-size: 1.8rem;
      }
    }
  `],
})
export class ContactComponent {
  store = inject(ClinicStore);
  private fb = inject(FormBuilder);

  contactForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    service: [''],
    message: ['', Validators.required],
  });

  onSubmit(): void {
    if (this.contactForm.valid) {
      console.log('Form submitted:', this.contactForm.value);
    }
  }
}
