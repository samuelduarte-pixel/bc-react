import { ProductoDeportivo } from "../types";
import ItemCard from "./ItemCard";

/**
 * PROPS: ItemList
 */
interface ItemListProps {
  productos: ProductoDeportivo[];
  onDelete: (id: number) => void;
  onEdit?: (id: number) => void; // opcional si aún no editas
}

/**
 * COMPONENTE: ItemList
 *
 * Renderiza la lista de productos deportivos usando .map()
 */
const ItemList: React.FC<ItemListProps> = ({ productos, onDelete, onEdit }) => {
  if (productos.length === 0) {
    return (
      <div className="empty-state" style={{ textAlign: "center", marginTop: "20px" }}>
        <p> No hay productos para mostrar</p>
        <p>Agrega tu primer producto usando el formulario de arriba</p>
      </div>
    );
  }

  return (
    <div className="item-list">
      {productos.map((producto) => (
        <ItemCard
          key={producto.id}
          item={producto}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default ItemList;
