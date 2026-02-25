// ============================================
// TIPOS E INTERFACES - Tienda de Equipamiento Deportivo
// ============================================

/**
 * Producto de la tienda deportiva
 */
export interface Item {
  id: number;
  name: string;
  description: string;
  category: 'futbol' | 'basketball' | 'tennis' | 'running' | 'natacion' | 'gym';
  price: number;
  stock: number;
  brand: string;
  rating: number;
  available: boolean;
  imageEmoji: string;
}

/**
 * Estadísticas del dashboard de la tienda
 */
export interface Stats {
  total: number;        // Total de productos
  active: number;       // Productos disponibles
  percentage: number;   // Porcentaje de disponibilidad
  dailySales: number;   // Ventas del día
  lowStock: number;     // Productos con stock bajo
}

/**
 * Datos en tiempo real - pedidos activos
 */
export interface RealTimeData {
  value: number;
  label: string;
  unit: string;
  lastUpdated: string;
  trend: 'up' | 'down' | 'stable';
}

/**
 * Estado genérico para peticiones asíncronas
 */
export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

/**
 * Filtros de búsqueda de productos
 */
export interface SearchFilters {
  query: string;
  category: string;
  available: boolean;
}