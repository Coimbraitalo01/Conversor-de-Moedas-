import { useState } from 'react';

export default function ConverterForm({ moedaOrigem, setMoedaOrigem, moedaDestino, setMoedaDestino }) {
  const [valor, setValor] = useState('');
  const [resultado, setResultado] = useState('');

  const moedasDisponiveis = [
    { sigla: 'BRL', nome: 'Real Brasileiro' },
    { sigla: 'USD', nome: 'Dólar Americano' },
    { sigla: 'EUR', nome: 'Euro' },
    { sigla: 'GBP', nome: 'Libra Esterlina' },
    { sigla: 'JPY', nome: 'Iene Japonês' }
  ];

  const taxas = {
    BRL: { USD: 0.19, EUR: 0.17, GBP: 0.15, JPY: 28.0 },
    USD: { BRL: 5.20, EUR: 0.92, GBP: 0.82, JPY: 145.0 },
    EUR: { BRL: 5.65, USD: 1.09, GBP: 0.90, JPY: 158.0 }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!valor || isNaN(valor)) {
      setResultado('Digite um valor válido');
      return;
    }

    const taxa = taxas[moedaOrigem]?.[moedaDestino] || 1;
    const valorConvertido = (parseFloat(valor) * taxa).toFixed(2);
    setResultado(`${valor} ${moedaOrigem} = ${valorConvertido} ${moedaDestino}`);
  };

  const inverterMoedas = () => {
    const temp = moedaOrigem;
    setMoedaOrigem(moedaDestino);
    setMoedaDestino(temp);
    setResultado('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="w-full mb-3 p-2 border rounded text-gray-800"
        placeholder="Digite o valor"
        value={valor}
        onChange={(e) => setValor(e.target.value)}
      />

      <div className="flex gap-2 mb-3">
        <select
          className="w-1/2 p-2 border rounded text-gray-800"
          value={moedaOrigem}
          onChange={(e) => setMoedaOrigem(e.target.value)}
        >
          {moedasDisponiveis.map((moeda) => (
            <option key={moeda.sigla} value={moeda.sigla}>
              {moeda.sigla} - {moeda.nome}
            </option>
          ))}
        </select>

        <select
          className="w-1/2 p-2 border rounded text-gray-800"
          value={moedaDestino}
          onChange={(e) => setMoedaDestino(e.target.value)}
        >
          {moedasDisponiveis.map((moeda) => (
            <option key={moeda.sigla} value={moeda.sigla}>
              {moeda.sigla} - {moeda.nome}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-2 mb-3">
        <button
          type="button"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          onClick={inverterMoedas}
        >
          ⬍ Inverter Moedas
        </button>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Converter
        </button>
      </div>

      {resultado && (
        <div className="bg-gray-100 p-3 rounded border text-gray-800">
          <p className="font-semibold">💱 {resultado}</p>
          <p className="text-sm text-gray-500">{new Date().toLocaleString('pt-BR')}</p>
        </div>
      )}
    </form>
  );
}