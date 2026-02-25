import React, { useState, useEffect } from 'react';
import type { RealTimeData } from '../types';
import { fetchRealTimeData } from '../utils/api';

// ============================================
// COMPONENTE: RealTimeIndicator - Pedidos Activos en Tiempo Real
// ============================================

const POLLING_INTERVAL = 5000; // 5 segundos

export const RealTimeIndicator: React.FC = () => {
  // 1. Estados
  const [data, setData] = useState<RealTimeData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [secondsLeft, setSecondsLeft] = useState<number>(POLLING_INTERVAL / 1000);

  // 2. useEffect con setInterval para polling de pedidos activos
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsUpdating(true);
        const newData = await fetchRealTimeData();
        setData(newData);
        setLoading(false);
        setSecondsLeft(POLLING_INTERVAL / 1000); // Reiniciar cuenta regresiva
      } catch (err) {
        console.error('Error cargando datos en tiempo real:', err);
      } finally {
        setIsUpdating(false);
      }
    };

    // Llamada inicial (no esperar el intervalo)
    loadData();

    // Polling cada 5 segundos
    const intervalId = setInterval(() => {
      console.log('🔄 Actualizando pedidos activos...');
      loadData();
    }, POLLING_INTERVAL);

    // Cleanup: limpiar interval al desmontar
    return () => {
      clearInterval(intervalId);
      console.log('🧹 Polling de pedidos detenido');
    };
  }, []);

  // 3. Cuenta regresiva visual hasta próxima actualización
  useEffect(() => {
    if (loading) return;

    const countdown = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) return POLLING_INTERVAL / 1000;
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [loading]);

  // Helper para formatear timestamp
  const formatTimestamp = (isoString: string): string => {
    const date = new Date(isoString);
    return date.toLocaleTimeString('es-CO');
  };

  // Icono según tendencia
  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return '📈';
    if (trend === 'down') return '📉';
    return '➡️';
  };

  // Color según tendencia
  const getTrendColor = (trend: string) => {
    if (trend === 'up') return '#22c55e';
    if (trend === 'down') return '#ef4444';
    return '#94a3b8';
  };

  // 4. Loading inicial
  if (loading) {
    return (
      <div className="realtime-indicator">
        <div className="realtime-header">
          <h2>🚀 Pedidos en Tiempo Real</h2>
        </div>
        <div className="realtime-content">
          <div className="realtime-loading">
            <div className="loading-spinner white" />
            <p>Conectando...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="realtime-indicator">
      <div className="realtime-header">
        <h2>🚀 Pedidos en Tiempo Real</h2>
        {isUpdating && (
          <span className="updating-badge">
            <span className="pulse-dot" />
            Actualizando...
          </span>
        )}
      </div>

      <div className="realtime-content">
        {/* Valor principal */}
        <div className="realtime-value">
          <span className="value-number">{data.value}</span>
          <span className="value-trend" style={{ color: getTrendColor(data.trend) }}>
            {getTrendIcon(data.trend)}
          </span>
        </div>

        {/* Label */}
        <div className="realtime-label">{data.label}</div>

        {/* Unidad */}
        <div className="realtime-unit">{data.unit} pendientes de despacho</div>

        {/* Timestamp */}
        <div className="realtime-timestamp">
          🕐 Última actualización: {formatTimestamp(data.lastUpdated)}
        </div>

        {/* Próxima actualización */}
        <div className="next-update">
          ⏱️ Próxima en {secondsLeft}s
        </div>
      </div>

      {/* Barra de progreso */}
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{
            animation: `progressCountdown ${POLLING_INTERVAL}ms linear infinite`,
          }}
        />
      </div>
    </div>
  );
};