import { PhotoType } from '../types';

// Dados de exemplo para simular fotos encontradas
const MOCK_PHOTOS: PhotoType[] = Array.from({ length: 12 }, (_, i) => ({
  id: `photo-${i + 1}`,
  url: `https://images.pexels.com/photos/${2000000 + i * 11}/pexels-photo-${2000000 + i * 11}.jpeg`,
  caption: `Foto esportiva ${i + 1}`,
  price: 9.99,
  date: new Date().toISOString(),
  eventId: i % 4 === 0 ? '1' : i % 4 === 1 ? '2' : i % 4 === 2 ? '3' : '4',
}));

// Simula o processo de reconhecimento facial
export const recognizeFace = async (imageData: string): Promise<PhotoType[]> => {
  // Em uma implementação real, você enviaria a imagem para uma API de reconhecimento facial
  console.log('Processando reconhecimento facial...');
  
  // Simular um atraso de rede
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simular resultados aleatórios
      const numberOfPhotos = Math.floor(Math.random() * 8) + 4; // Entre 4 e 12 fotos
      const results = MOCK_PHOTOS.slice(0, numberOfPhotos);
      resolve(results);
    }, 2000);
  });
};

// Converte uma imagem de File para base64
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};
