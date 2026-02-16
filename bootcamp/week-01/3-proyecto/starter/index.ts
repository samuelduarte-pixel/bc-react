// ============================================
// PROYECTO SEMANAL: MODELADO DE ENTIDADES - TIENDA DEPORTIVA
// ============================================

console.log(' BIENVENIDO A LA TIENDA DE SAMUEL DUARTE SPORTYK RETAIL\n');

// ============================================
// 1. Define las entidades principales
// ============================================

// QUÉ: Interface para el Producto Deportivo.
// PARA: Estandarizar las propiedades que cada artículo debe tener.
interface ProductoDeportivo {
    id: number;
    nombre: string;
    precio: number;
    categoria: CategoriaDeportiva; 
    stock: number;
    marca: string;
    estado: EstadoProducto;
}

// QUÉ: Interface para el Cliente (Member).
// PARA: Gestionar la información de los usuarios de la tienda.
interface Cliente {
    id: number;
    nombre: string;
    email: string;
    esPremium: boolean;
}

// ============================================
// 2. Type Unions y Literales
// ============================================

// QUÉ: Type union para categorías de deporte.
// IMPACTO: Evita que se ingresen categorías que no vendemos.
type CategoriaDeportiva = 'Calzado' | 'Máquinas' | 'Accesorios' | 'Ropa';

// QUÉ: Type literal para el estado del producto.
type EstadoProducto = 'Disponible' | 'Agotado' | 'Descontinuado';

// ============================================
// 3. Funciones Tipadas
// ============================================

const inventario: ProductoDeportivo[] = [];

// Función para registrar nuevos productos
function agregarProducto(prod: ProductoDeportivo): void {
    inventario.push(prod);
    console.log(`✅ Producto agregado: ${prod.nombre}`);
}

// Función para listar productos que sí tienen stock
function obtenerDisponibles(): ProductoDeportivo[] {
    return inventario.filter(p => p.stock > 0 && p.estado === 'Disponible');
}

// ============================================
// 4. Pruebas con datos de tu dominio
// ============================================

// Creamos ejemplos reales de una tienda de deportes
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

console.log('\n🔍 PRODUCTOS DISPONIBLES EN TIENDA:');
console.table(obtenerDisponibles());

// ============================================
// 5. Comenta tu código explicando qué/para/impacto
// ============================================

// QUÉ: Modelado de una tienda de E-commerce deportivo usando TypeScript.
// PARA: Organizar el catálogo de productos y asegurar la integridad de los datos.
// IMPACTO: Facilita el desarrollo del Frontend en React al tener tipos de datos claros y predecibles.

console.log('\n🚀 Modelado completado con éxito.');