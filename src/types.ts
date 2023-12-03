export interface Testimonial {
  id?: number;
  type?: string;
  name: string;
  quote: string;
  image: string;
  tagline?: string;
}

export interface Service {
  id?: number;
  type: string;
  longDescription?: string;
  description?: string;
  image: string;
}

export interface Question {
  id: number;
  category: string;
  question: string;
  answer: string;
}