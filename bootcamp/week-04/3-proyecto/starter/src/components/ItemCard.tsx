import React from 'react';
import { Item } from '../types';

interface ItemCardProps {
  item: Item;
  onDelete?: (id: number) => void;
  onView?: (id: number) => void;
}

const categoryColors: Record<string, string> = {
  running: '#ff6b35',
  cycling: '#4ecdc4',
  swimming: '#45b7d1',
  gym: '#96e6a1',
  team_sports: '#ffd93d',
  outdoor: '#a8e063',
};

const renderStars = (rating: number): string => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(5 - full - (half ? 1 : 0));
};

export const ItemCard: React.FC<ItemCardProps> = ({ item, onDelete, onView }) => {
  const badgeColor = categoryColors[item.category] ?? '#ccc';

  return (
    <div className={`item-card ${!item.isAvailable ? 'unavailable' : ''}`}>
      {/* Badge de categoría */}
      <span
        className="category-badge"
        style={{ backgroundColor: badgeColor }}
      >
        {item.sport}
      </span>

      {/* Estado de disponibilidad */}
      {item.isAvailable ? (
        <span className="status available">● En stock</span>
      ) : (
        <span className="status unavailable">● Agotado</span>
      )}

      {/* Contenido principal */}
      <div className="card-body">
        <p className="brand">{item.brand}</p>
        <h3 className="item-name">{item.name}</h3>
        <p className="description">{item.description}</p>

        {/* Rating */}
        <div className="rating-row">
          <span className="stars">{renderStars(item.rating)}</span>
          <span className="rating-value">{item.rating.toFixed(1)}</span>
        </div>

        {/* Precio */}
        <p className="price">${item.price.toFixed(2)}</p>
      </div>

      {/* Acciones */}
      <div className="card-actions">
        {onView && (
          <button className="btn-view" onClick={() => onView(item.id)}>
            Ver detalles
          </button>
        )}
        {onDelete && (
          <button className="btn-delete" onClick={() => onDelete(item.id)}>
            🗑
          </button>
        )}
      </div>
    </div>
  );
};