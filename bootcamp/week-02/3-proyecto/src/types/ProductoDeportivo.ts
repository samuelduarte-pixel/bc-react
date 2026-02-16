// ============================================
// MODELO: ProductoDeportivo
// ============================================

export type CategoriaDeportiva = 'Calzado' | 'Máquinas' | 'Accesorios' | 'Ropa';

export type EstadoProducto = 'Disponible' | 'Agotado' | 'Descontinuado';

/**
 * Interfaz principal de un producto deportivo
 */
export interface ProductoDeportivo {
  id: number;              // ID único del producto
  nombre: string;          // Nombre del producto
  precio: number;          // Precio en pesos
  categoria: CategoriaDeportiva; // Categoría
  stock: number;           // Cantidad disponible
  marca: string;           // Marca del producto
  estado: EstadoProducto;  // Estado del producto
}
