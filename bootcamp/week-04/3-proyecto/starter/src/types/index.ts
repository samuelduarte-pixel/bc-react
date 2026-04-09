// ============================================
// TIPOS E INTERFACES - Sportyk Retail
// ============================================

export interface Item {
  id: number;
  name: string;
  brand: string;
  category: Category;
  price: number;
  rating: number;
  isAvailable: boolean;
  createdAt: string;
  description: string;
  sport: string;
}

export type Category =
  | 'all'
  | 'running'
  | 'cycling'
  | 'swimming'
  | 'gym'
  | 'team_sports'
  | 'outdoor';

export type SortOption =
  | 'name-asc'
  | 'name-desc'
  | 'price-asc'
  | 'price-desc'
  | 'rating';

export interface FilterState {
  searchTerm: string;
  category: Category;
  showOnlyAvailable: boolean;
  sortBy: SortOption;
}