import React from 'react';
import { Item } from '../types';
import { ItemCard } from './ItemCard';
import { EmptyState } from './EmptyState';

interface ItemListProps {
  items: Item[];
  isLoading?: boolean;
  error?: string | null;
  onDelete?: (id: number) => void;
  onView?: (id: number) => void;
  onClearFilters?: () => void;
}

export const ItemList: React.FC<ItemListProps> = ({
  items,
  isLoading = false,
  error = null,
  onDelete,
  onView,
  onClearFilters,
}) => {
  // 1. Estado de carga
  if (isLoading) {
    return (
      <div className="loading">
        <div className="spinner" />
        <p>Cargando productos...</p>
      </div>
    );
  }

  // 2. Estado de error
  if (error) {
    return (
      <div className="error-state">
        <span>⚠️</span>
        <p>{error}</p>
      </div>
    );
  }

  // 3. Lista vacía
  if (items.length === 0) {
    return (
      <EmptyState
        message="Prueba con otros filtros o términos de búsqueda."
        onClearFilters={onClearFilters}
      />
    );
  }

  // 4. Renderizar lista con .map() y keys únicas
  return (
    <div className="item-list">
      {items.map((item) => (
        <ItemCard
          key={item.id}
          item={item}
          onDelete={onDelete}
          onView={onView}
        />
      ))}
    </div>
  );
};