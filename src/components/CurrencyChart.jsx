import { useEffect, useRef, useState } from 'react';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default function CurrencyChart({ moedaOrigem, moedaDestino }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [dados, setDados] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    if (!moedaOrigem || !moedaDestino) return;

    const fetchData = async () => {
      const url = `https://api.coingecko.com/api/v3/coins/${moedaOrigem.toLowerCase()}/market_chart?vs_currency=${moedaDestino.toLowerCase()}&days=30`;

      try {
        const res = await fetch(url);
        const data = await res.json();

        const cotacoes = data.prices.map((item) => item[1]);
        const datas = data.prices.map((item) =>
          new Date(item[0]).toLocaleDateString('pt-BR')
        );

        setDados(cotacoes);
        setLabels(datas);
      } catch (error) {
        console.error('Erro ao carregar dados do gráfico:', error);
      }
    };

    fetchData();
  }, [moedaOrigem, moedaDestino]);

  useEffect(() => {
    if (!chartRef.current || dados.length === 0) return;

    const ctx = chartRef.current.getContext('2d');

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: `${moedaOrigem} para ${moedaDestino}`,
            data: dados,
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59, 130, 246, 0.2)',
            fill: true,
            tension: 0.4
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true },
          tooltip: {
            callbacks: {
              label: (ctx) => `1 ${moedaOrigem} = ${ctx.raw?.toFixed(2)} ${moedaDestino}`
            }
          }
        },
        scales: {
          x: { display: true },
          y: {
            beginAtZero: false,
            ticks: { color: '#333' }
          }
        }
      }
    });

    return () => chartInstance.current?.destroy();
  }, [dados, labels, moedaOrigem, moedaDestino]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-xl font-semibold mb-4 text-blue-600">📉 Histórico de Cotações</h2>
      <canvas ref={chartRef} className="w-full h-64" />
      <p className="text-xs text-gray-400 mt-2">Dados fornecidos pela CoinGecko (últimos 30 dias)</p>
    </div>
  );
}