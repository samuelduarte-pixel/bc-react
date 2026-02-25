import React, { useState, useEffect } from 'react';
import type { Item } from '../types';
import { fetchItems, searchItems, formatPrice } from '../utils/api';

// ============================================
// COMPONENTE: ItemList - Catálogo de Productos Deportivos
// ============================================

const CATEGORY_LABELS: Record<string, string> = {
  futbol: '⚽ Fútbol',
  basketball: '🏀 Basketball',
  tennis: '🎾 Tenis',
  running: '🏃 Running',
  natacion: '🏊 Natación',
  gym: '🏋️ Gym',
};

const CATEGORY_COLORS: Record<string, string> = {
  futbol: '#22c55e',
  basketball: '#f97316',
  tennis: '#eab308',
  running: '#3b82f6',
  natacion: '#06b6d4',
  gym: '#8b5cf6',
};

export const ItemList: React.FC = () => {
  // 1. Estados para data, loading, error y búsqueda
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);

  // 2. useEffect para fetch inicial con AbortController
  useEffect(() => {
    const controller = new AbortController();

    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchItems(controller.signal);
        setItems(data);
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          setError(
            err instanceof Error ? err.message : 'Error desconocido al cargar productos',
          );
        }
      } finally {
        setLoading(false);
      }
    };

    loadProducts();

    // Cleanup: cancelar petición al desmontar
    return () => {
      controller.abort();
    };
  }, []);

  // 3. useEffect para búsqueda con debounce
  useEffect(() => {
    if (!searchQuery) return;

    setIsSearching(true);
    const timeoutId = setTimeout(async () => {
      try {
        const results = await searchItems(searchQuery);
        setItems(results);
      } catch (err) {
        console.error('Error en búsqueda:', err);
      } finally {
        setIsSearching(false);
      }
    }, 400); // Debounce 400ms

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // Handler para limpiar búsqueda
  const handleClearSearch = async () => {
    setSearchQuery('');
    setLoading(true);
    try {
      const data = await fetchItems();
      setItems(data);
    } finally {
      setLoading(false);
    }
  };

  // 4. Renderizado condicional: loading inicial
  if (loading) {
    return (
      <div className="item-list">
        <div className="loading-container">
          <div className="loading-spinner" />
          <p>Cargando catálogo de productos...</p>
        </div>
      </div>
    );
  }

  // 5. Renderizado condicional: error
  if (error) {
    return (
      <div className="item-list error">
        <h2>⚠️ Error al cargar productos</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()} className="retry-btn">
          🔄 Reintentar
        </button>
      </div>
    );
  }

  const availableCount = items.filter((i) => i.available).length;
  const lowStockCount = items.filter((i) => i.stock > 0 && i.stock <= 5).length;

  return (
    <div className="item-list">
      {/* Header de la sección */}
      <div className="item-list-header">
        <div>
          <h2>🛒 Catálogo de Productos</h2>
          <p className="item-count">
            <span className="badge badge-green">{availableCount} disponibles</span>
            {lowStockCount > 0 && (
              <span className="badge badge-orange">⚠️ {lowStockCount} stock bajo</span>
            )}
          </p>
        </div>

        {/* Búsqueda */}
        <div className="search-box">
          <input
            type="text"
            placeholder="🔍 Buscar productos, marcas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          {searchQuery && (
            <button onClick={handleClearSearch} className="clear-btn">
              ✕
            </button>
          )}
          {isSearching && <span className="searching-indicator">Buscando...</span>}
        </div>
      </div>

      {/* Lista de productos */}
      {items.length === 0 ? (
        <div className="empty-state">
          <p>😕 No se encontraron productos para "{searchQuery}"</p>
          <button onClick={handleClearSearch} className="retry-btn">
            Ver todos los productos
          </button>
        </div>
      ) : (
        <ul className="items">
          {items.map((item) => (
            <li key={item.id} className={`item-card ${!item.available ? 'item-unavailable' : ''}`}>
              {/* Emoji / imagen */}
              <div
                className="item-emoji"
                style={{ backgroundColor: CATEGORY_COLORS[item.category] + '22' }}
              >
                <span>{item.imageEmoji}</span>
              </div>

              {/* Info del producto */}
              <div className="item-info">
                <div className="item-top">
                  <h3>{item.name}</h3>
                  <span
                    className="category-tag"
                    style={{
                      color: CATEGORY_COLORS[item.category],
                      backgroundColor: CATEGORY_COLORS[item.category] + '20',
                    }}
                  >
                    {CATEGORY_LABELS[item.category]}
                  </span>
                </div>

                <p className="item-description">{item.description}</p>

                <div className="item-bottom">
                  <div className="item-meta">
                    <span className="item-brand">🏷️ {item.brand}</span>
                    <span className="item-rating">⭐ {item.rating}</span>
                    <span
                      className={`item-stock ${item.stock === 0 ? 'stock-out' : item.stock <= 5 ? 'stock-low' : 'stock-ok'}`}
                    >
                      {item.stock === 0
                        ? '❌ Agotado'
                        : item.stock <= 5
                        ? `⚠️ Solo ${item.stock} uds`
                        : `✅ ${item.stock} en stock`}
                    </span>
                  </div>
                  <div className="item-price">{formatPrice(item.price)}</div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};