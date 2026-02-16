import { useState, useEffect } from "react";
import { ProductoDeportivo, CategoriaDeportiva, EstadoProducto } from "../types";

interface ItemFormProps {
  onAdd: (producto: Omit<ProductoDeportivo, "id">) => void;
  editingItem?: ProductoDeportivo;
  onUpdate?: (id: number, updates: Partial<ProductoDeportivo>) => void;
  onCancelEdit?: () => void;
}

const ItemForm: React.FC<ItemFormProps> = ({
  onAdd,
  editingItem,
  onUpdate,
  onCancelEdit,
}) => {
  const initialState = {
    nombre: "",
    precio: 0,
    categoria: "Calzado" as CategoriaDeportiva,
    stock: 0,
    marca: "",
    estado: "Disponible" as EstadoProducto,
  };

  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (editingItem) {
      const { id, ...rest } = editingItem;
      setFormData(rest);
    } else {
      setFormData(initialState);
    }
  }, [editingItem]);

  // Handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === "precio" || name === "stock" ? Number(value) : value });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validación
  const validate = (): boolean => {
    if (!formData.nombre.trim()) {
      alert("El nombre es requerido");
      return false;
    }
    if (formData.precio <= 0) {
      alert("El precio debe ser mayor a 0");
      return false;
    }
    if (!formData.marca.trim()) {
      alert("La marca es requerida");
      return false;
    }
    if (formData.stock < 0) {
      alert("El stock no puede ser negativo");
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (editingItem && onUpdate && onCancelEdit) {
      onUpdate(editingItem.id, formData);
      onCancelEdit();
    } else {
      onAdd(formData);
    }

    setFormData(initialState);
  };

  return (
    <div className="form-container" style={{ marginBottom: "20px" }}>
      <h2>{editingItem ? "✏️ Editar Producto" : "➕ Agregar Producto"}</h2>
      <form onSubmit={handleSubmit} className="item-form">
        {/* Nombre */}
        <div className="form-group">
          <label htmlFor="nombre">Nombre *</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Nombre del producto"
            required
          />
        </div>

        {/* Precio */}
        <div className="form-group">
          <label htmlFor="precio">Precio *</label>
          <input
            type="number"
            id="precio"
            name="precio"
            value={formData.precio}
            onChange={handleChange}
            min={0}
            required
          />
        </div>

        {/* Marca */}
        <div className="form-group">
          <label htmlFor="marca">Marca *</label>
          <input
            type="text"
            id="marca"
            name="marca"
            value={formData.marca}
            onChange={handleChange}
            required
          />
        </div>

        {/* Categoría */}
        <div className="form-group">
          <label htmlFor="categoria">Categoría</label>
          <select
            id="categoria"
            name="categoria"
            value={formData.categoria}
            onChange={handleSelectChange}
          >
            <option value="Calzado">Calzado</option>
            <option value="Máquinas">Máquinas</option>
            <option value="Accesorios">Accesorios</option>
            <option value="Ropa">Ropa</option>
          </select>
        </div>

        {/* Stock */}
        <div className="form-group">
          <label htmlFor="stock">Stock</label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            min={0}
          />
        </div>

        {/* Estado */}
        <div className="form-group">
          <label htmlFor="estado">Estado</label>
          <select
            id="estado"
            name="estado"
            value={formData.estado}
            onChange={handleSelectChange}
          >
            <option value="Disponible">Disponible</option>
            <option value="Agotado">Agotado</option>
            <option value="Descontinuado">Descontinuado</option>
          </select>
        </div>

        {/* Botones */}
        <div className="form-actions" style={{ marginTop: "12px" }}>
          <button type="submit" className="btn btn-primary">
            {editingItem ? "Actualizar" : "Agregar"}
          </button>

          {editingItem && onCancelEdit && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                onCancelEdit();
                setFormData(initialState);
              }}
              style={{ marginLeft: "8px" }}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ItemForm;
