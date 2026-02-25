import React from 'react';
import { ItemList } from './ItemList';
import { StatsCard } from './StatsCard';
import { RealTimeIndicator } from './RealTimeIndicator';

// ============================================
// COMPONENTE: Dashboard - Tienda de Equipamiento Deportivo
// Panel de control principal de la tienda
// ============================================

export const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      {/* Header de la tienda */}
      <header className="dashboard-header">
        <div className="header-brand">
          <span className="header-logo">🏆</span>
          <div>
            <h1>SPORTYK RETAIL Dashboard</h1>
            <p className="header-subtitle">Panel de Control  Tienda de Equipamiento Deportivo</p>
          </div>
        </div>
        <div className="header-actions">
          <span className="header-date">
            {new Date().toLocaleDateString('es-CO', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
          <button
            className="refresh-btn"
            onClick={() => window.location.reload()}
            title="Refrescar dashboard"
          >
            🔄 Refrescar
          </button>
        </div>
      </header>

      {/* Layout principal */}
      <main className="dashboard-main">
        {/* Sección de estadísticas - 8 columnas */}
        <section className="dashboard-section section-stats">
          <StatsCard />
        </section>

        {/* Sección en tiempo real - 4 columnas */}
        <section className="dashboard-section section-realtime">
          <RealTimeIndicator />
        </section>

        {/* Sección de lista principal - 12 columnas (ancho completo) */}
        <section className="dashboard-section section-list">
          <ItemList />
        </section>
      </main>

      {/* Footer */}
      <footer className="dashboard-footer">
        <p>
          🏋️ SportZone Dashboard · Semana 03 · {new Date().getFullYear()} · Erik Samuel Crespo Duarte
        </p>
      </footer>
    </div>
  );
};