export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: 'Performance' | 'Lifestyle'; 
  gender: 'Homme' | 'Femme' | 'Unisexe';
  imageUrl: string;
  isNew?: boolean;
}