import { Injectable, computed, signal } from '@angular/core';
import { Specialist, Service, Testimonial, ContactInfo } from '../models/clinic.models';
import { SPECIALISTS, SERVICES, TESTIMONIALS, CONTACT_INFO } from '../data/clinic.data';

@Injectable({ providedIn: 'root' })
export class ClinicStore {
  private readonly _specialists = signal<Specialist[]>(SPECIALISTS);
  private readonly _services = signal<Service[]>(SERVICES);
  private readonly _testimonials = signal<Testimonial[]>(TESTIMONIALS);
  private readonly _contactInfo = signal<ContactInfo>(CONTACT_INFO);
  private readonly _selectedSpecialistId = signal<string | null>(null);
  private readonly _selectedServiceId = signal<string | null>(null);

  readonly specialists = this._specialists.asReadonly();
  readonly services = this._services.asReadonly();
  readonly testimonials = this._testimonials.asReadonly();
  readonly contactInfo = this._contactInfo.asReadonly();

  readonly selectedSpecialist = computed(() => {
    const id = this._selectedSpecialistId();
    return this._specialists().find(s => s.id === id) ?? null;
  });

  readonly selectedService = computed(() => {
    const id = this._selectedServiceId();
    return this._services().find(s => s.id === id) ?? null;
  });

  readonly featuredSpecialists = computed(() =>
    this._specialists().slice(0, 3)
  );

  readonly featuredServices = computed(() =>
    this._services().slice(0, 4)
  );

  readonly allCertificates = computed(() =>
    this._specialists().flatMap(s =>
      s.certificates.map(c => ({ ...c, specialistName: s.name }))
    )
  );

  selectSpecialist(id: string | null): void {
    this._selectedSpecialistId.set(id);
  }

  selectService(id: string | null): void {
    this._selectedServiceId.set(id);
  }
}
