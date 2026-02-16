import { ProductoDeportivo } from "../types";

/**
 * PROPS: ItemCard
 */
interface ItemCardProps {
  item: ProductoDeportivo;
  onDelete: (id: number) => void;
  onEdit?: (id: number) => void; // Lo dejamos opcional si no vas a editar aún
}

/**
 * COMPONENTE: ItemCard
 *
 * Tarjeta individual para mostrar un producto deportivo.
 */
const ItemCard: React.FC<ItemCardProps> = ({ item, onDelete, onEdit }) => {
  // CONFIRMAR ELIMINACIÓN
  const handleDelete = () => {
    if (window.confirm(`¿Eliminar "${item.nombre}"?`)) {
      onDelete(item.id);
    }
  };

  return (
    <div
      className="item-card"
      style={{
        border: "1px solid #ccc",
        padding: "12px",
        marginBottom: "12px",
        borderRadius: "6px",
      }}
    >
      {/* Información principal */}
      <div className="item-card__header">
        <h3>{item.nombre}</h3>
        <span
          style={{
            padding: "2px 6px",
            backgroundColor: item.estado === "Disponible" ? "green" : "red",
            color: "white",
            borderRadius: "4px",
            fontSize: "12px",
            marginLeft: "8px",
          }}
        >
          {item.estado}
        </span>
      </div>

      {/* Información detallada */}
      <div className="item-card__body">
        <p><strong>Precio:</strong> ${item.precio}</p>
        <p><strong>Marca:</strong> {item.marca}</p>
        <p><strong>Categoría:</strong> {item.categoria}</p>
        <p><strong>Stock:</strong> {item.stock} unidades</p>
      </div>

      {/* Acciones */}
      <div className="item-card__actions" style={{ marginTop: "8px" }}>
        {onEdit && (
          <button
            onClick={() => onEdit(item.id)}
            style={{ marginRight: "8px" }}
          >
             Editar
          </button>
        )}
        <button onClick={handleDelete}> Eliminar</button>
      </div>
    </div>
  );
};

export default ItemCard;
