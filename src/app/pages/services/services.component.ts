import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { ClinicStore } from '../../store/clinic.store';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatChipsModule, MatDividerModule, RouterLink, MatButtonModule],
  template: `
    <!-- Page Header -->
    <section class="page-header">
      <div class="container">
        <h1>Our Services & Methods</h1>
        <p>Evidence-based treatments delivered by certified specialists</p>
      </div>
    </section>

    <!-- Services List -->
    <section class="section">
      <div class="container">
        @for (service of store.services(); track service.id; let i = $index) {
          <mat-card class="service-detail" appearance="outlined">
            <div class="service-layout" [class.reversed]="i % 2 !== 0">
              <div class="service-image placeholder-image">
                <mat-icon>{{ service.icon }}</mat-icon>
              </div>
              <div class="service-info">
                <div class="service-header">
                  <div class="service-icon-wrap">
                    <mat-icon>{{ service.icon }}</mat-icon>
                  </div>
                  <div>
                    <h2>{{ service.name }}</h2>
                    <span class="duration">
                      <mat-icon>schedule</mat-icon>
                      {{ service.duration }} session
                    </span>
                  </div>
                </div>

                <p class="description">{{ service.description }}</p>

                <div class="methods-section">
                  <h4>Methods & Techniques</h4>
                  <div class="methods-list">
                    @for (method of service.methods; track method) {
                      <div class="method-item">
                        <mat-icon>check_circle</mat-icon>
                        <span>{{ method }}</span>
                      </div>
                    }
                  </div>
                </div>
              </div>
            </div>
          </mat-card>
        }
      </div>
    </section>

    <!-- CTA -->
    <section class="cta-section">
      <div class="container cta-content">
        <h2>Not Sure Which Service Is Right for You?</h2>
        <p>Our specialists will assess your condition and recommend the best treatment approach during your initial consultation.</p>
        <a mat-flat-button routerLink="/contact" class="btn-cta">
          <mat-icon>calendar_today</mat-icon>
          Schedule a Consultation
        </a>
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

    .service-detail {
      margin-bottom: 32px;
      overflow: hidden;
    }

    .service-layout {
      display: grid;
      grid-template-columns: 380px 1fr;
      gap: 0;

      &.reversed {
        grid-template-columns: 1fr 380px;

        .service-image {
          order: 2;
        }

        .service-info {
          order: 1;
        }
      }
    }

    .service-image {
      height: 100%;
      min-height: 320px;
      font-size: 4rem;
      border-radius: 0;
    }

    .service-info {
      padding: 32px;
    }

    .service-header {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 20px;

      h2 {
        font-size: 1.5rem;
        font-weight: 700;
        margin-bottom: 4px;
      }
    }

    .service-icon-wrap {
      width: 56px;
      height: 56px;
      background: var(--bg-light);
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;

      mat-icon {
        color: var(--primary);
        font-size: 28px;
        width: 28px;
        height: 28px;
      }
    }

    .duration {
      display: flex;
      align-items: center;
      gap: 4px;
      color: var(--text-secondary);
      font-size: 0.9rem;

      mat-icon {
        font-size: 16px;
        width: 16px;
        height: 16px;
      }
    }

    .description {
      color: var(--text-secondary);
      line-height: 1.7;
      margin-bottom: 24px;
    }

    .methods-section {
      h4 {
        font-size: 0.85rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: var(--text-secondary);
        margin-bottom: 12px;
      }
    }

    .methods-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .method-item {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.95rem;

      mat-icon {
        color: var(--primary);
        font-size: 18px;
        width: 18px;
        height: 18px;
      }
    }

    .cta-section {
      background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
      padding: 64px 0;
      text-align: center;
      color: white;
    }

    .cta-content {
      h2 {
        font-size: 2rem;
        font-weight: 700;
        margin-bottom: 12px;
      }

      p {
        font-size: 1.05rem;
        opacity: 0.9;
        margin-bottom: 28px;
        max-width: 600px;
        margin-left: auto;
        margin-right: auto;
      }
    }

    .btn-cta {
      background: white !important;
      color: var(--primary-dark) !important;
      padding: 0 28px !important;
      height: 48px;
      font-size: 1rem;
      font-weight: 600;
    }

    @media (max-width: 768px) {
      .service-layout,
      .service-layout.reversed {
        grid-template-columns: 1fr;

        .service-image {
          order: 0;
          min-height: 200px;
        }

        .service-info {
          order: 1;
        }
      }

      .page-header h1 {
        font-size: 1.8rem;
      }
    }
  `],
})
export class ServicesComponent {
  store = inject(ClinicStore);
}
