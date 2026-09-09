export interface SneakerItem {
  id: string;
  name: string;
  subName: string;
  edition: string;
  price: number;
  currency: string;
  primaryColor: string;
  accentColor: string;
  secondaryColor: string;
  textColor: string;
  bgColorClass: string;
  image: string;
  altImage?: string;
  description: string;
  sizes: number[];
  rating: number;
}
