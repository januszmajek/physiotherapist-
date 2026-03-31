export interface Specialist {
  id: string;
  name: string;
  title: string;
  specializations: string[];
  bio: string;
  photoUrl: string;
  certificates: Certificate[];
  yearsOfExperience: number;
}

export interface Certificate {
  name: string;
  issuedBy: string;
  year: number;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
  duration: string;
  methods: string[];
  imageUrl: string;
}

export interface Testimonial {
  id: string;
  author: string;
  text: string;
  rating: number;
  date: string;
}

export interface ContactInfo {
  address: string;
  city: string;
  postalCode: string;
  phone: string;
  email: string;
  latitude: number;
  longitude: number;
  openingHours: OpeningHours[];
  socialMedia: SocialMedia;
}

export interface OpeningHours {
  day: string;
  hours: string;
}

export interface SocialMedia {
  facebook?: string;
  instagram?: string;
  linkedin?: string;
}
