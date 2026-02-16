import { useState } from "react";
import Header from "./components/Header";
import ItemForm from "./components/ItemForm";
import ItemList from "./components/ItemList";
import { ProductoDeportivo } from "./ProductoDeportivo";

/**
 * COMPONENTE PRINCIPAL: App
 */
const App: React.FC = () => {
  // ============================================
  // ESTADO: lista de productos y edición
  // ============================================
  const [productos, setProductos] = useState<ProductoDeportivo[]>([
    {
      id: 101,
      nombre: "Pesas Mancuernas 10kg",
      precio: 150000,
      categoria: "Máquinas",
      stock: 15,
      marca: "SportMaster",
      estado: "Disponible",
    },
    {
      id: 102,
      nombre: "Zapatillas Running Pro",
      precio: 320000,
      categoria: "Calzado",
      stock: 0,
      marca: "Nike",
      estado: "Agotado",
    },
  ]);

  const [editingProducto, setEditingProducto] = useState<ProductoDeportivo | null>(null);

  // ============================================
  // FUNCIONES: agregar, actualizar y eliminar
  // ============================================

  const agregarProducto = (producto: Omit<ProductoDeportivo, "id">) => {
    const nuevoProducto: ProductoDeportivo = {
      ...producto,
      id: Date.now(), // ID único
    };
    setProductos([...productos, nuevoProducto]);
  };

  const actualizarProducto = (id: number, updates: Partial<ProductoDeportivo>) => {
    setProductos(
      productos.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
    setEditingProducto(null);
  };

  const eliminarProducto = (id: number) => {
    if (window.confirm("¿Seguro que quieres eliminar este producto?")) {
      setProductos(productos.filter((p) => p.id !== id));
    }
  };

  const editarProducto = (id: number) => {
    const prod = productos.find((p) => p.id === id);
    if (prod) setEditingProducto(prod);
  };

  const cancelarEdicion = () => {
    setEditingProducto(null);
  };

  // ============================================
  // RENDER
  // ============================================
  return (
    <div className="app">
      <Header />
      <div className="container">
        <ItemForm
          onAdd={agregarProducto}
          onUpdate={actualizarProducto}
          editingItem={editingProducto}
          onCancelEdit={cancelarEdicion}
        />
        <ItemList
          productos={productos}
          onDelete={eliminarProducto}
          onEdit={editarProducto}
        />
      </div>
    </div>
  );
};

export default App;
