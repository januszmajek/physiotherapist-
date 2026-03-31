import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SlicePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { ClinicStore } from '../../store/clinic.store';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, SlicePipe, MatButtonModule, MatCardModule, MatIconModule, MatChipsModule],
  template: `
    <!-- Hero Section -->
    <section class="hero">
      <div class="container hero-content">
        <div class="hero-text">
          <h1 class="hero-title">Expert Physiotherapy<br>for Your Recovery</h1>
          <p class="hero-subtitle">
            At PhysioVita, our team of certified specialists combines proven methods
            with personalized care to help you move better, feel stronger, and live without pain.
          </p>
          <div class="hero-actions">
            <a mat-flat-button routerLink="/contact" class="btn-primary">Book Appointment</a>
            <a mat-stroked-button routerLink="/services" class="btn-secondary">Explore Services</a>
          </div>
          <div class="hero-stats">
            <div class="stat">
              <span class="stat-number">5</span>
              <span class="stat-label">Expert Specialists</span>
            </div>
            <div class="stat">
              <span class="stat-number">8+</span>
              <span class="stat-label">Therapy Methods</span>
            </div>
            <div class="stat">
              <span class="stat-number">15+</span>
              <span class="stat-label">Years Experience</span>
            </div>
            <div class="stat">
              <span class="stat-number">2000+</span>
              <span class="stat-label">Happy Patients</span>
            </div>
          </div>
        </div>
        <div class="hero-image placeholder-image">
          <mat-icon>self_improvement</mat-icon>
        </div>
      </div>
    </section>

    <!-- Services Preview -->
    <section class="section services-preview">
      <div class="container">
        <h2 class="section-title">Our Services</h2>
        <p class="section-subtitle">Comprehensive physiotherapy solutions tailored to your needs</p>
        <div class="services-grid">
          @for (service of store.featuredServices(); track service.id) {
            <mat-card class="service-card" appearance="outlined">
              <mat-card-content>
                <div class="service-icon-wrap">
                  <mat-icon>{{ service.icon }}</mat-icon>
                </div>
                <h3>{{ service.name }}</h3>
                <p>{{ service.description | slice:0:120 }}...</p>
                <div class="service-meta">
                  <mat-icon>schedule</mat-icon>
                  <span>{{ service.duration }}</span>
                </div>
              </mat-card-content>
            </mat-card>
          }
        </div>
        <div class="section-cta">
          <a mat-stroked-button routerLink="/services">
            View All Services
            <mat-icon>arrow_forward</mat-icon>
          </a>
        </div>
      </div>
    </section>

    <!-- Team Preview -->
    <section class="section team-preview">
      <div class="container">
        <h2 class="section-title">Meet Our Specialists</h2>
        <p class="section-subtitle">Certified professionals dedicated to your recovery</p>
        <div class="team-grid">
          @for (specialist of store.featuredSpecialists(); track specialist.id) {
            <mat-card class="specialist-card" appearance="outlined">
              <div class="specialist-photo placeholder-image">
                <mat-icon>person</mat-icon>
              </div>
              <mat-card-content>
                <h3>{{ specialist.name }}</h3>
                <p class="specialist-title">{{ specialist.title }}</p>
                <div class="specialist-chips">
                  @for (spec of specialist.specializations; track spec) {
                    <mat-chip-set>
                      <mat-chip>{{ spec }}</mat-chip>
                    </mat-chip-set>
                  }
                </div>
                <div class="specialist-meta">
                  <span><mat-icon>verified</mat-icon> {{ specialist.certificates.length }} Certifications</span>
                  <span><mat-icon>work_history</mat-icon> {{ specialist.yearsOfExperience }} years exp.</span>
                </div>
              </mat-card-content>
            </mat-card>
          }
        </div>
        <div class="section-cta">
          <a mat-stroked-button routerLink="/team">
            Meet the Full Team
            <mat-icon>arrow_forward</mat-icon>
          </a>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="section testimonials-section">
      <div class="container">
        <h2 class="section-title">What Our Patients Say</h2>
        <p class="section-subtitle">Real experiences from people we've helped</p>
        <div class="testimonials-grid">
          @for (testimonial of store.testimonials(); track testimonial.id) {
            <mat-card class="testimonial-card" appearance="outlined">
              <mat-card-content>
                <div class="stars">
                  @for (star of [1,2,3,4,5]; track star) {
                    <mat-icon [class.filled]="star <= testimonial.rating">star</mat-icon>
                  }
                </div>
                <p class="testimonial-text">"{{ testimonial.text }}"</p>
                <p class="testimonial-author">— {{ testimonial.author }}</p>
              </mat-card-content>
            </mat-card>
          }
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container cta-content">
        <h2>Ready to Start Your Recovery Journey?</h2>
        <p>Book your first consultation and let our experts create a personalized treatment plan just for you.</p>
        <div class="cta-actions">
          <a mat-flat-button routerLink="/contact" class="btn-cta">
            <mat-icon>calendar_today</mat-icon>
            Book Your Appointment
          </a>
          <a mat-stroked-button href="tel:+48123456789" class="btn-cta-secondary">
            <mat-icon>phone</mat-icon>
            Call Us Now
          </a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      background: linear-gradient(135deg, var(--bg-light) 0%, #e8f5f2 100%);
      padding: 80px 0;
    }

    .hero-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 60px;
      align-items: center;
    }

    .hero-title {
      font-size: 3rem;
      font-weight: 800;
      line-height: 1.15;
      color: var(--text-primary);
      margin-bottom: 20px;
    }

    .hero-subtitle {
      font-size: 1.15rem;
      color: var(--text-secondary);
      line-height: 1.7;
      margin-bottom: 32px;
    }

    .hero-actions {
      display: flex;
      gap: 12px;
      margin-bottom: 48px;
    }

    .btn-primary {
      background: var(--primary) !important;
      color: white !important;
      padding: 0 28px !important;
      height: 48px;
      font-size: 1rem;
    }

    .btn-secondary {
      border-color: var(--primary) !important;
      color: var(--primary) !important;
      padding: 0 28px !important;
      height: 48px;
      font-size: 1rem;
    }

    .hero-stats {
      display: flex;
      gap: 32px;
    }

    .stat {
      display: flex;
      flex-direction: column;
    }

    .stat-number {
      font-size: 1.8rem;
      font-weight: 800;
      color: var(--primary);
    }

    .stat-label {
      font-size: 0.85rem;
      color: var(--text-secondary);
    }

    .hero-image {
      height: 420px;
      font-size: 6rem;
    }

    .services-preview {
      background: white;
    }

    .services-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 24px;
      margin-bottom: 32px;
    }

    .service-card {
      padding: 24px;
      transition: transform 0.2s, box-shadow 0.2s;

      &:hover {
        transform: translateY(-4px);
        box-shadow: var(--shadow-md);
      }

      h3 {
        font-size: 1.1rem;
        font-weight: 600;
        margin-bottom: 8px;
      }

      p {
        font-size: 0.9rem;
        color: var(--text-secondary);
        line-height: 1.6;
        margin-bottom: 12px;
      }
    }

    .service-icon-wrap {
      width: 48px;
      height: 48px;
      background: var(--bg-light);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 16px;

      mat-icon {
        color: var(--primary);
      }
    }

    .service-meta {
      display: flex;
      align-items: center;
      gap: 4px;
      color: var(--text-secondary);
      font-size: 0.85rem;

      mat-icon {
        font-size: 16px;
        width: 16px;
        height: 16px;
      }
    }

    .section-cta {
      text-align: center;

      a {
        color: var(--primary) !important;
        border-color: var(--primary) !important;

        mat-icon {
          margin-left: 4px;
        }
      }
    }

    .team-preview {
      background: var(--bg-light);
    }

    .team-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
      margin-bottom: 32px;
    }

    .specialist-card {
      overflow: hidden;
      transition: transform 0.2s, box-shadow 0.2s;

      &:hover {
        transform: translateY(-4px);
        box-shadow: var(--shadow-md);
      }
    }

    .specialist-photo {
      height: 220px;
      font-size: 4rem;
      border-radius: 0;
    }

    .specialist-card mat-card-content {
      padding: 20px;

      h3 {
        font-size: 1.15rem;
        font-weight: 600;
        margin-bottom: 4px;
      }
    }

    .specialist-title {
      color: var(--primary);
      font-size: 0.9rem;
      font-weight: 500;
      margin-bottom: 12px;
    }

    .specialist-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      margin-bottom: 12px;
    }

    .specialist-meta {
      display: flex;
      gap: 16px;
      font-size: 0.85rem;
      color: var(--text-secondary);

      span {
        display: flex;
        align-items: center;
        gap: 4px;
      }

      mat-icon {
        font-size: 16px;
        width: 16px;
        height: 16px;
        color: var(--primary);
      }
    }

    .testimonials-section {
      background: white;
    }

    .testimonials-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 24px;
    }

    .testimonial-card {
      padding: 8px;
    }

    .stars {
      display: flex;
      gap: 2px;
      margin-bottom: 12px;

      mat-icon {
        font-size: 20px;
        width: 20px;
        height: 20px;
        color: #ccc;

        &.filled {
          color: var(--accent);
        }
      }
    }

    .testimonial-text {
      font-style: italic;
      line-height: 1.7;
      color: var(--text-secondary);
      margin-bottom: 12px;
    }

    .testimonial-author {
      font-weight: 600;
      color: var(--text-primary);
    }

    .cta-section {
      background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
      padding: 80px 0;
      text-align: center;
      color: white;
    }

    .cta-content {
      h2 {
        font-size: 2.2rem;
        font-weight: 700;
        margin-bottom: 16px;
      }

      p {
        font-size: 1.1rem;
        opacity: 0.9;
        margin-bottom: 32px;
        max-width: 600px;
        margin-left: auto;
        margin-right: auto;
      }
    }

    .cta-actions {
      display: flex;
      gap: 16px;
      justify-content: center;
    }

    .btn-cta {
      background: white !important;
      color: var(--primary-dark) !important;
      padding: 0 28px !important;
      height: 48px;
      font-size: 1rem;
      font-weight: 600;
    }

    .btn-cta-secondary {
      border-color: white !important;
      color: white !important;
      padding: 0 28px !important;
      height: 48px;
      font-size: 1rem;
    }

    @media (max-width: 1024px) {
      .services-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 768px) {
      .hero {
        padding: 48px 0;
      }

      .hero-content {
        grid-template-columns: 1fr;
        gap: 40px;
      }

      .hero-title {
        font-size: 2.2rem;
      }

      .hero-image {
        height: 280px;
        font-size: 4rem;
      }

      .hero-stats {
        flex-wrap: wrap;
        gap: 24px;
      }

      .hero-actions {
        flex-direction: column;
      }

      .services-grid {
        grid-template-columns: 1fr;
      }

      .team-grid {
        grid-template-columns: 1fr;
      }

      .testimonials-grid {
        grid-template-columns: 1fr;
      }

      .cta-content h2 {
        font-size: 1.6rem;
      }

      .cta-actions {
        flex-direction: column;
        align-items: center;
      }
    }
  `],
})
export class HomeComponent {
  store = inject(ClinicStore);
}
