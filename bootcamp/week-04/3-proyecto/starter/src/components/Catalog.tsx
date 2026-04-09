import React, { useState, useMemo } from 'react';
import { Item, Category, SortOption } from '../types';
import { items as initialItems } from '../data/items';
import { useDebounce } from '../hooks/useDebounce';
import { SearchBar } from './SearchBar';
import { FilterPanel } from './FilterPanel';
import { SortSelector } from './SortSelector';
import { ItemList } from './ItemList';

export const Catalog: React.FC = () => {
  // ============================================
  // ESTADOS
  // ============================================
  const [items, setItems] = useState<Item[]>(initialItems);
  const [isLoading] = useState<boolean>(false);
  const [error] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [showOnlyAvailable, setShowOnlyAvailable] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<SortOption>('name-asc');

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // ============================================
  // PROCESAMIENTO CON useMemo
  // ============================================
  const processedItems = useMemo(() => {
    let result = [...items];

    // 1. Filtrar por búsqueda (nombre, marca, deporte)
    if (debouncedSearchTerm) {
      const term = debouncedSearchTerm.toLowerCase();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(term) ||
          item.brand.toLowerCase().includes(term) ||
          item.sport.toLowerCase().includes(term) ||
          item.description.toLowerCase().includes(term)
      );
    }

    // 2. Filtrar por categoría
    if (selectedCategory !== 'all') {
      result = result.filter((item) => item.category === selectedCategory);
    }

    // 3. Filtrar por disponibilidad
    if (showOnlyAvailable) {
      result = result.filter((item) => item.isAvailable);
    }

    // 4. Ordenar (sin mutar el array original)
    switch (sortBy) {
      case 'name-asc':
        result = [...result].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        result = [...result].sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'price-asc':
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
    }

    return result;
  }, [items, debouncedSearchTerm, selectedCategory, showOnlyAvailable, sortBy]);

  // ============================================
  // HANDLERS
  // ============================================
  const handleDelete = (id: number): void => {
    if (window.confirm('¿Eliminar este producto del catálogo?')) {
      setItems((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handleView = (id: number): void => {
    const item = items.find((i) => i.id === id);
    if (item) {
      alert(
        `📦 ${item.name}\n\n🏷️ Marca: ${item.brand}\n💰 Precio: $${item.price.toFixed(2)}\n⭐ Rating: ${item.rating}/5\n🏃 Deporte: ${item.sport}\n\n${item.description}`
      );
    }
  };

  const clearFilters = (): void => {
    setSearchTerm('');
    setSelectedCategory('all');
    setShowOnlyAvailable(false);
    setSortBy('name-asc');
  };

  // ============================================
  // RENDER
  // ============================================
  return (
    <div className="catalog">
      <header className="catalog-header">
        <div className="header-brand">
          <span className="logo-icon">⚡</span>
          <div>
            <h1 className="brand-name">SPORTYK</h1>
            <span className="brand-sub">RETAIL</span>
          </div>
        </div>
        <p className="header-tagline">Equipamiento deportivo de alto rendimiento</p>
      </header>

      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Buscar por producto, marca o deporte..."
      />

      <div className="controls">
        <FilterPanel
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          showOnlyAvailable={showOnlyAvailable}
          onAvailableChange={setShowOnlyAvailable}
          onClearFilters={clearFilters}
        />
        <SortSelector value={sortBy} onChange={setSortBy} />
      </div>

      <p className="results-count">
        <strong>{processedItems.length}</strong> de <strong>{items.length}</strong> productos
        {debouncedSearchTerm && (
          <span className="search-term"> · resultados para "{debouncedSearchTerm}"</span>
        )}
      </p>

      <ItemList
        items={processedItems}
        isLoading={isLoading}
        error={error}
        onDelete={handleDelete}
        onView={handleView}
        onClearFilters={clearFilters}
      />
    </div>
  );
};

export default Catalog;