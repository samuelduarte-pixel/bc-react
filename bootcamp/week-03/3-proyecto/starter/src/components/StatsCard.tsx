import React, { useState, useEffect } from 'react';
import type { Stats } from '../types';
import { fetchStats } from '../utils/api';

// ============================================
// COMPONENTE: StatsCard  Estadísticas de la Tienda
// ============================================

export const StatsCard: React.FC = () => {
  // 1. Estado para estadísticas
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Estados independientes por métrica (carga progresiva)
  const [totalLoaded, setTotalLoaded] = useState(false);
  const [salesLoaded, setSalesLoaded] = useState(false);
  const [stockLoaded, setStockLoaded] = useState(false);

  // 2. useEffect principal para cargar stats
  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true);
        const data = await fetchStats();
        setStats(data);
      } catch (err) {
        console.error('Error cargando estadísticas:', err);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  // 3. Múltiples efectos independientes para animación de carga progresiva
  useEffect(() => {
    if (!stats) return;
    const t1 = setTimeout(() => setTotalLoaded(true), 100);
    return () => clearTimeout(t1);
  }, [stats]);

  useEffect(() => {
    if (!stats) return;
    const t2 = setTimeout(() => setSalesLoaded(true), 300);
    return () => clearTimeout(t2);
  }, [stats]);

  useEffect(() => {
    if (!stats) return;
    const t3 = setTimeout(() => setStockLoaded(true), 500);
    return () => clearTimeout(t3);
  }, [stats]);

  // 4. Renderizado condicional para loading
  if (loading || !stats) {
    return (
      <div className="stats-card">
        <h2>📊 Estadísticas de la Tienda</h2>
        <div className="stats-grid">
          {[1, 2, 3, 4, 5].map((n) => (
            <div key={n} className="stat stat-skeleton">
              <div className="skeleton-value" />
              <div className="skeleton-label" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="stats-card">
      <h2>📊 Estadísticas de la Tienda</h2>

      <div className="stats-grid">
        {/* Stat 1: Total de productos */}
        <div className={`stat stat-blue ${totalLoaded ? 'stat-visible' : ''}`}>
          <div className="stat-icon">📦</div>
          <div className="stat-value">{stats.total}</div>
          <div className="stat-label">Total Productos</div>
        </div>

        {/* Stat 2: Productos disponibles */}
        <div className={`stat stat-green ${totalLoaded ? 'stat-visible' : ''}`}>
          <div className="stat-icon">✅</div>
          <div className="stat-value">{stats.active}</div>
          <div className="stat-label">Disponibles</div>
        </div>

        {/* Stat 3: Porcentaje de disponibilidad */}
        <div className={`stat stat-purple ${salesLoaded ? 'stat-visible' : ''}`}>
          <div className="stat-icon">📈</div>
          <div className="stat-value">{stats.percentage}%</div>
          <div className="stat-label">Disponibilidad</div>
        </div>

        {/* Stat 4: Ventas del día */}
        <div className={`stat stat-orange ${salesLoaded ? 'stat-visible' : ''}`}>
          <div className="stat-icon">💰</div>
          <div className="stat-value">{stats.dailySales}</div>
          <div className="stat-label">Ventas Hoy</div>
        </div>

        {/* Stat 5: Productos con stock bajo */}
        <div className={`stat ${stats.lowStock > 0 ? 'stat-red' : 'stat-green'} ${stockLoaded ? 'stat-visible' : ''}`}>
          <div className="stat-icon">⚠️</div>
          <div className="stat-value">{stats.lowStock}</div>
          <div className="stat-label">Stock Bajo</div>
        </div>
      </div>
    </div>
  );
};