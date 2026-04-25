import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGame } from '../context/GameContext';

const AnalyticsPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { state } = useGame();

  // Use production history from game state, or create default data if empty
  const data = state.productionHistory.length > 0
    ? state.productionHistory
    : [
        { time: '00:00', honey: 0, bees: 0 },
        { time: '06:00', honey: 0, bees: 0 },
        { time: '12:00', honey: 0, bees: 0 },
        { time: '18:00', honey: 0, bees: 0 },
      ];

  const stats = {
    totalHoney: data.reduce((sum, d) => sum + d.honey, 0),
    avgHoney: data.length > 0 ? Math.round(data.reduce((sum, d) => sum + d.honey, 0) / data.length) : 0,
    peakTime: data.length > 0 ? data.reduce((max, d) => d.honey > max.honey ? d : max, data[0]).time : '00:00',
    peakBees: data.length > 0 ? Math.max(...data.map(d => d.bees)) : 0,
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.page-title', {
        y: -50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });

      gsap.from('.stat-card', {
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.4)',
        delay: 0.2,
      });

      gsap.from('.chart-container', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.5,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || data.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const width = canvas.width;
    const height = canvas.height;
    const padding = 60;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Background
    ctx.fillStyle = '#FFF8E1';
    ctx.fillRect(0, 0, width, height);

    // Grid lines
    ctx.strokeStyle = '#D7CCC8';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
      const y = padding + (chartHeight / 5) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }

    // Find max values
    const maxHoney = Math.max(...data.map(d => d.honey), 1);
    const maxBees = Math.max(...data.map(d => d.bees), 1);

    // Draw honey production line
    ctx.strokeStyle = '#FFA000';
    ctx.lineWidth = 4;
    ctx.beginPath();
    data.forEach((point, i) => {
      const x = padding + (chartWidth / (data.length - 1)) * i;
      const y = padding + chartHeight - (point.honey / maxHoney) * chartHeight;
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();

    // Draw honey points
    ctx.fillStyle = '#FF6F00';
    data.forEach((point, i) => {
      const x = padding + (chartWidth / (data.length - 1)) * i;
      const y = padding + chartHeight - (point.honey / maxHoney) * chartHeight;
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#3E2723';
      ctx.lineWidth = 2;
      ctx.stroke();
    });

    // Draw bee activity line (lighter)
    ctx.strokeStyle = '#FFD54F';
    ctx.lineWidth = 3;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    data.forEach((point, i) => {
      const x = padding + (chartWidth / (data.length - 1)) * i;
      const y = padding + chartHeight - (point.bees / maxBees) * chartHeight;
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw bee activity points
    ctx.fillStyle = '#FBC02D';
    data.forEach((point, i) => {
      const x = padding + (chartWidth / (data.length - 1)) * i;
      const y = padding + chartHeight - (point.bees / maxBees) * chartHeight;
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();
    });

    // Draw X-axis labels
    ctx.fillStyle = '#3E2723';
    ctx.font = 'bold 12px monospace';
    ctx.textAlign = 'center';
    data.forEach((point, i) => {
      if (i % Math.max(1, Math.floor(data.length / 6)) === 0) {
        const x = padding + (chartWidth / (data.length - 1)) * i;
        ctx.fillText(point.time, x, height - padding + 20);
      }
    });

    // Draw Y-axis labels (honey)
    ctx.textAlign = 'right';
    for (let i = 0; i <= 5; i++) {
      const value = Math.round((maxHoney / 5) * (5 - i));
      const y = padding + (chartHeight / 5) * i;
      ctx.fillText(value.toString(), padding - 10, y + 5);
    }

    // Draw legend
    ctx.textAlign = 'left';
    ctx.font = 'bold 14px monospace';

    // Honey legend
    ctx.fillStyle = '#FF6F00';
    ctx.fillRect(padding, 20, 20, 4);
    ctx.fillStyle = '#3E2723';
    ctx.fillText('Honey Production', padding + 30, 25);

    // Bees legend
    ctx.fillStyle = '#FBC02D';
    ctx.fillRect(padding + 200, 20, 20, 4);
    ctx.fillStyle = '#3E2723';
    ctx.fillText('Bee Activity', padding + 230, 25);

  }, [data]);

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-honey-50 to-honey-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="page-title text-4xl font-minecraft text-comb-900 mb-2 text-center">
          📈 EFFICIENCY ANALYTICS
        </h1>
        <p className="page-title text-center text-comb-700 mb-8 font-bold">
          Production Statistics - Last 24 In-Game Hours
        </p>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="stat-card bg-gradient-to-br from-honey-300 to-honey-400 rounded-lg p-6 border-4 border-comb-900 shadow-xl">
            <div className="text-center">
              <div className="text-4xl mb-2">🍯</div>
              <h3 className="text-sm font-bold text-comb-900 mb-2">TOTAL HONEY</h3>
              <div className="text-3xl font-bold text-comb-900">{stats.totalHoney}</div>
              <div className="text-xs text-comb-800 font-bold">bottles</div>
            </div>
          </div>

          <div className="stat-card bg-gradient-to-br from-honey-400 to-honey-500 rounded-lg p-6 border-4 border-comb-900 shadow-xl">
            <div className="text-center">
              <div className="text-4xl mb-2">📊</div>
              <h3 className="text-sm font-bold text-comb-900 mb-2">AVG/HOUR</h3>
              <div className="text-3xl font-bold text-comb-900">{stats.avgHoney}</div>
              <div className="text-xs text-comb-800 font-bold">bottles</div>
            </div>
          </div>

          <div className="stat-card bg-gradient-to-br from-honey-500 to-honey-600 rounded-lg p-6 border-4 border-comb-900 shadow-xl">
            <div className="text-center">
              <div className="text-4xl mb-2">⏰</div>
              <h3 className="text-sm font-bold text-comb-900 mb-2">PEAK TIME</h3>
              <div className="text-3xl font-bold text-comb-900">{stats.peakTime}</div>
              <div className="text-xs text-comb-800 font-bold">highest production</div>
            </div>
          </div>

          <div className="stat-card bg-gradient-to-br from-honey-600 to-honey-700 rounded-lg p-6 border-4 border-comb-900 shadow-xl">
            <div className="text-center">
              <div className="text-4xl mb-2">🐝</div>
              <h3 className="text-sm font-bold text-comb-900 mb-2">PEAK BEES</h3>
              <div className="text-3xl font-bold text-comb-900">{stats.peakBees}</div>
              <div className="text-xs text-comb-800 font-bold">max active</div>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="chart-container bg-gradient-to-br from-honey-100 to-honey-200 rounded-lg p-6 border-4 border-comb-900 shadow-xl">
          <h2 className="text-2xl font-minecraft text-comb-900 mb-4 text-center">
            🗺️ PRODUCTION TIMELINE
          </h2>
          <div className="bg-white rounded-lg border-4 border-comb-900 overflow-hidden">
            <canvas
              ref={canvasRef}
              className="w-full"
              style={{ height: '400px' }}
            />
          </div>
          <div className="mt-4 text-center text-sm text-comb-800 font-bold">
            Orange line shows honey production rate. Yellow dashed line shows bee activity peaks.
          </div>
        </div>

        {/* Insights */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-green-400 to-green-500 rounded-lg p-6 border-4 border-green-700 shadow-xl">
            <div className="flex items-center gap-4">
              <span className="text-5xl">✓</span>
              <div>
                <h3 className="text-xl font-minecraft text-comb-900 mb-2">CURRENT STATUS</h3>
                <p className="text-sm text-comb-900 font-bold">
                  You have {state.hives.length} hives with {state.hives.reduce((sum, h) => sum + h.bees.length, 0)} total bees.
                  Current weather: {state.weather.toUpperCase()}. Time: {state.timeOfDay.toUpperCase()}.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-lg p-6 border-4 border-yellow-700 shadow-xl">
            <div className="flex items-center gap-4">
              <span className="text-5xl">💡</span>
              <div>
                <h3 className="text-xl font-minecraft text-comb-900 mb-2">OPTIMIZATION TIP</h3>
                <p className="text-sm text-comb-900 font-bold">
                  {state.timeOfDay === 'night'
                    ? 'Night-time production is slower. Consider adding more bees to compensate.'
                    : 'Daytime is optimal for production. Make sure all hives have maximum bees!'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
