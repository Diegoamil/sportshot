export interface PhotographerType {
  id: string;
  name: string;
  avatar: string;
  bio?: string;
  location?: string;
  specialties?: string[];
  contactEmail?: string;
  socialMedia?: {
    instagram?: string;
    facebook?: string;
    website?: string;
  };
  coverImage?: string;
  events?: string[];
}

export interface EventType {
  id: string;
  name: string;
  date: string;
  location: string;
  coverImage: string;
  totalPhotos: number;
  participants: number;
  description: string;
  photosReleaseDate?: string; // Data ISO quando as fotos serão liberadas
  uploadProgress?: number; // Progresso do upload em porcentagem (0-100)
  category?: string; // Categoria do evento (ex: Corrida, Ciclismo, Futebol)
  photographers?: PhotographerType[]; // Fotógrafos que cobriram o evento
}

export interface PhotoType {
  id: string;
  url: string;
  caption?: string;
  price: number;
  date: string;
  eventId: string;
}