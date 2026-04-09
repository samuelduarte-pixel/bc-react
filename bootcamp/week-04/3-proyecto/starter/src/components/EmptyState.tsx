import React from 'react';

interface EmptyStateProps {
  message?: string;
  onClearFilters?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  message = 'No se encontraron productos',
  onClearFilters,
}) => {
  return (
    <div className="empty-state">
      <span className="icon">🏋️</span>
      <h3>Sin resultados</h3>
      <p>{message}</p>
      {onClearFilters && (
        <button onClick={onClearFilters} className="btn-clear">
          Limpiar filtros
        </button>
      )}
    </div>
  );
};