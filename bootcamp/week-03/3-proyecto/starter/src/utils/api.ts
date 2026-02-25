// ============================================
// API  Tienda de Equipamiento Deportivo
// ============================================

import type { Item, Stats, RealTimeData } from '../types';

// Simula latencia de red
const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

// ============================================
// DATOS MOCK  Productos deportivos
// ============================================

const MOCK_PRODUCTS: Item[] = [
  {
    id: 1,
    name: 'Balón de Fútbol Pro',
    description: 'Balón oficial FIFA, cuero sintético premium, talla 5',
    category: 'futbol',
    price: 89900,
    stock: 23,
    brand: 'Nike',
    rating: 4.8,
    available: true,
    imageEmoji: '⚽',
  },
  {
    id: 2,
    name: 'Zapatillas Running X200',
    description: 'Suela de amortiguación máxima, transpirable, ideal maratón',
    category: 'running',
    price: 349900,
    stock: 12,
    brand: 'Adidas',
    rating: 4.9,
    available: true,
    imageEmoji: '👟',
  },
  {
    id: 3,
    name: 'Raqueta de Tenis Carbon',
    description: 'Marco de carbono ultraligero, encordado incluido, grip L3',
    category: 'tennis',
    price: 289000,
    stock: 8,
    brand: 'Wilson',
    rating: 4.7,
    available: true,
    imageEmoji: '🎾',
  },
  {
    id: 4,
    name: 'Balón de Basketball NBA',
    description: 'Cuero genuino, grip superior, oficial NBA',
    category: 'basketball',
    price: 179000,
    stock: 3,
    brand: 'Spalding',
    rating: 4.6,
    available: true,
    imageEmoji: '🏀',
  },
  {
    id: 5,
    name: 'Gafas de Natación Pro',
    description: 'Antivaho, UV400, correa ajustable, lente espejo',
    category: 'natacion',
    price: 45000,
    stock: 31,
    brand: 'Speedo',
    rating: 4.5,
    available: true,
    imageEmoji: '🥽',
  },
  {
    id: 6,
    name: 'Mancuernas Ajustables 20kg',
    description: 'Set completo 2-20kg, ajuste rápido, agarre antideslizante',
    category: 'gym',
    price: 520000,
    stock: 5,
    brand: 'PowerFlex',
    rating: 4.9,
    available: true,
    imageEmoji: '🏋️',
  },
  {
    id: 7,
    name: 'Guayos Fútbol Elite',
    description: 'Taco de aluminio, cuero canguro, suela TPU, talla 42',
    category: 'futbol',
    price: 259000,
    stock: 0,
    brand: 'Puma',
    rating: 4.4,
    available: false,
    imageEmoji: '⚽',
  },
  {
    id: 8,
    name: 'Cinta de Correr Pro',
    description: 'Motor 3HP, pantalla LED, 16 velocidades, plegable',
    category: 'gym',
    price: 2890000,
    stock: 2,
    brand: 'TechRun',
    rating: 4.7,
    available: true,
    imageEmoji: '🏃',
  },
  {
    id: 9,
    name: 'Short Deportivo Dry-Fit',
    description: 'Tela microfibra, secado rápido, bolsillos laterales',
    category: 'running',
    price: 79000,
    stock: 45,
    brand: 'Under Armour',
    rating: 4.3,
    available: true,
    imageEmoji: '🩳',
  },
  {
    id: 10,
    name: 'Tabla de Natación EVA',
    description: 'Espuma EVA de alta densidad, grip ergonómico, 45x30cm',
    category: 'natacion',
    price: 35000,
    stock: 18,
    brand: 'AquaMax',
    rating: 4.2,
    available: true,
    imageEmoji: '🏊',
  },
];

// ============================================
// FUNCIONES DE FETCH
// ============================================

/**
 * Obtiene lista de productos deportivos
 */
export const fetchItems = async (signal?: AbortSignal): Promise<Item[]> => {
  await delay(1000);

  // Verificar si fue cancelado
  if (signal?.aborted) {
    throw new DOMException('Request aborted', 'AbortError');
  }

  return MOCK_PRODUCTS;
};

/**
 * Obtiene estadísticas de la tienda
 */
export const fetchStats = async (): Promise<Stats> => {
  await delay(800);

  const total = MOCK_PRODUCTS.length;
  const available = MOCK_PRODUCTS.filter((p) => p.available).length;
  const percentage = Math.round((available / total) * 100);
  const lowStock = MOCK_PRODUCTS.filter((p) => p.stock > 0 && p.stock <= 5).length;

  return {
    total,
    active: available,
    percentage,
    dailySales: Math.floor(Math.random() * 20) + 15, // Simular ventas del día
    lowStock,
  };
};

/**
 * Obtiene pedidos activos en tiempo real (polling)
 */
export const fetchRealTimeData = async (): Promise<RealTimeData> => {
  await delay(300);

  const activeOrders = Math.floor(Math.random() * 30) + 5;
  const trends: Array<'up' | 'down' | 'stable'> = ['up', 'down', 'stable'];
  const trend = trends[Math.floor(Math.random() * trends.length)];

  return {
    value: activeOrders,
    label: 'Pedidos Activos',
    unit: 'pedidos',
    lastUpdated: new Date().toISOString(),
    trend,
  };
};

/**
 * Busca productos por query
 */
export const searchItems = async (query: string): Promise<Item[]> => {
  await delay(400);

  if (!query.trim()) {
    return MOCK_PRODUCTS;
  }

  return MOCK_PRODUCTS.filter(
    (item) =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.brand.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase()),
  );
};

/**
 * Formatea precio en pesos colombianos
 */
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(price);
};