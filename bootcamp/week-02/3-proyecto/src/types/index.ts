import { ProductoDeportivo } from './ProductoDeportivo';

console.log('Bienvenido a la Tienda Deportiva de Samuel Duarte\n');

// ============================================
// INVENTARIO DE PRUEBA
// ============================================

const inventario: ProductoDeportivo[] = [];

function agregarProducto(prod: ProductoDeportivo): void {
  inventario.push(prod);
  console.log(`✅ Producto agregado: ${prod.nombre}`);
}

function obtenerDisponibles(): ProductoDeportivo[] {
  return inventario.filter(p => p.stock > 0 && p.estado === 'Disponible');
}

// ============================================
// PRUEBAS CON DATOS
// ============================================

agregarProducto({
  id: 101,
  nombre: "Pesas Mancuernas 10kg",
  precio: 150000,
  categoria: 'Máquinas',
  stock: 15,
  marca: "SportMaster",
  estado: 'Disponible'
});

agregarProducto({
  id: 102,
  nombre: "Zapatillas Running Pro",
  precio: 320000,
  categoria: 'Calzado',
  stock: 0,
  marca: "Nike",
  estado: 'Agotado'
});

console.log('\n PRODUCTOS DISPONIBLES EN TIENDA:');
console.table(obtenerDisponibles());
