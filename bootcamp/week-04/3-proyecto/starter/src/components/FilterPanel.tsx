import React from 'react';
import { Category } from '../types';
import { categories } from '../data/items';

interface FilterPanelProps {
  selectedCategory: Category;
  onCategoryChange: (category: Category) => void;
  showOnlyAvailable: boolean;
  onAvailableChange: (value: boolean) => void;
  onClearFilters: () => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  selectedCategory,
  onCategoryChange,
  showOnlyAvailable,
  onAvailableChange,
  onClearFilters,
}) => {
  return (
    <div className="filter-panel">
      <div className="filter-group">
        <label htmlFor="category">Categoría</label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value as Category)}
        >
          {categories.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group checkbox-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={showOnlyAvailable}
            onChange={(e) => onAvailableChange(e.target.checked)}
          />
          <span>Solo disponibles</span>
        </label>
      </div>

      <button onClick={onClearFilters} className="btn-clear">
        🔄 Limpiar filtros
      </button>
    </div>
  );
};