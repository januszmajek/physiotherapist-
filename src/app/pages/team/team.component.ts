import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { ClinicStore } from '../../store/clinic.store';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatChipsModule, MatExpansionModule, MatDividerModule],
  template: `
    <!-- Page Header -->
    <section class="page-header">
      <div class="container">
        <h1>Our Team</h1>
        <p>Meet the certified professionals behind PhysioVita</p>
      </div>
    </section>

    <!-- Specialists -->
    <section class="section">
      <div class="container">
        @for (specialist of store.specialists(); track specialist.id) {
          <mat-card class="specialist-detail" appearance="outlined">
            <div class="specialist-layout">
              <div class="specialist-photo placeholder-image">
                <mat-icon>person</mat-icon>
              </div>
              <div class="specialist-info">
                <h2>{{ specialist.name }}</h2>
                <p class="title">{{ specialist.title }}</p>
                <p class="experience">
                  <mat-icon>work_history</mat-icon>
                  {{ specialist.yearsOfExperience }} years of experience
                </p>

                <div class="specializations">
                  <h4>Specializations</h4>
                  <mat-chip-set>
                    @for (spec of specialist.specializations; track spec) {
                      <mat-chip highlighted>{{ spec }}</mat-chip>
                    }
                  </mat-chip-set>
                </div>

                <p class="bio">{{ specialist.bio }}</p>

                <mat-accordion>
                  <mat-expansion-panel>
                    <mat-expansion-panel-header>
                      <mat-panel-title>
                        <mat-icon>verified</mat-icon>
                        Certifications ({{ specialist.certificates.length }})
                      </mat-panel-title>
                    </mat-expansion-panel-header>

                    <div class="certificates-list">
                      @for (cert of specialist.certificates; track cert.name) {
                        <div class="certificate-item">
                          <div class="cert-icon">
                            <mat-icon>workspace_premium</mat-icon>
                          </div>
                          <div class="cert-details">
                            <strong>{{ cert.name }}</strong>
                            <span>{{ cert.issuedBy }} &middot; {{ cert.year }}</span>
                          </div>
                        </div>
                        @if (!$last) {
                          <mat-divider />
                        }
                      }
                    </div>
                  </mat-expansion-panel>
                </mat-accordion>
              </div>
            </div>
          </mat-card>
        }
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

    .specialist-detail {
      margin-bottom: 32px;
      overflow: hidden;
    }

    .specialist-layout {
      display: grid;
      grid-template-columns: 300px 1fr;
      gap: 40px;
    }

    .specialist-photo {
      height: 360px;
      font-size: 5rem;
      border-radius: 0;
    }

    .specialist-info {
      padding: 32px 32px 32px 0;

      h2 {
        font-size: 1.6rem;
        font-weight: 700;
        margin-bottom: 4px;
      }
    }

    .title {
      color: var(--primary);
      font-weight: 500;
      font-size: 1.05rem;
      margin-bottom: 8px;
    }

    .experience {
      display: flex;
      align-items: center;
      gap: 6px;
      color: var(--text-secondary);
      font-size: 0.95rem;
      margin-bottom: 20px;

      mat-icon {
        font-size: 18px;
        width: 18px;
        height: 18px;
        color: var(--primary);
      }
    }

    .specializations {
      margin-bottom: 20px;

      h4 {
        font-size: 0.85rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: var(--text-secondary);
        margin-bottom: 8px;
      }
    }

    .bio {
      color: var(--text-secondary);
      line-height: 1.7;
      margin-bottom: 24px;
    }

    .certificates-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .certificate-item {
      display: flex;
      gap: 12px;
      align-items: flex-start;
      padding: 8px 0;
    }

    .cert-icon {
      width: 40px;
      height: 40px;
      background: var(--bg-light);
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;

      mat-icon {
        color: var(--primary);
        font-size: 20px;
        width: 20px;
        height: 20px;
      }
    }

    .cert-details {
      display: flex;
      flex-direction: column;

      strong {
        font-size: 0.95rem;
        margin-bottom: 2px;
      }

      span {
        font-size: 0.85rem;
        color: var(--text-secondary);
      }
    }

    mat-expansion-panel-header mat-icon {
      margin-right: 8px;
      color: var(--primary);
    }

    @media (max-width: 768px) {
      .specialist-layout {
        grid-template-columns: 1fr;
        gap: 0;
      }

      .specialist-photo {
        height: 240px;
      }

      .specialist-info {
        padding: 24px;
      }

      .page-header h1 {
        font-size: 1.8rem;
      }
    }
  `],
})
export class TeamComponent {
  store = inject(ClinicStore);
}
