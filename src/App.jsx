import React, { useState } from 'react';
import ConverterForm from './components/ConverterForm';
import CurrencyChart from './components/CurrencyChart';

export default function App() {
  const [moedaOrigem, setMoedaOrigem] = useState('USD');
  const [moedaDestino, setMoedaDestino] = useState('BRL');

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-8 border-b pb-6">
          <div className="flex justify-center items-center gap-3 mb-2">
            <span className="text-3xl">🌍</span>
            <h1 className="text-3xl font-bold text-gray-800">GlobalCurrency</h1>
          </div>
          <p className="text-gray-600">
            Conversor oficial de moedas com cotações em tempo real
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-blue-600">Conversor de Moedas</h2>
            <ConverterForm
              moedaOrigem={moedaOrigem}
              moedaDestino={moedaDestino}
              setMoedaOrigem={setMoedaOrigem}
              setMoedaDestino={setMoedaDestino}
            />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-blue-600">📈 Mercado Financeiro</h2>
            <ul className="space-y-2">
              <li>USD/BRL <span className="text-green-600">+0.2%</span></li>
              <li>EUR/BRL <span className="text-red-600">-0.1%</span></li>
              <li>BTC/USD <span className="text-green-600">+1.8%</span></li>
            </ul>
          </div>
        </div>

        <CurrencyChart moedaOrigem={moedaOrigem} moedaDestino={moedaDestino} />

        <footer className="mt-10 text-center text-gray-500 text-sm border-t pt-6">
          <p>© {new Date().getFullYear()} GlobalCurrency - Todos os direitos reservados</p>
        </footer>
      </div>
    </div>
  );
}