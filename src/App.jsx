import React from 'react'
import ConverterForm from './components/ConverterForm'
import CurrencyChart from './components/CurrencyChart'

export default function App() {
  return (
    <div className="min-h-screen p-4 max-w-2xl mx-auto">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-cyan-400">💱 Conversor de Moedas</h1>
        <p className="text-gray-400 text-sm mt-1">Atualizado com gráfico e layout melhorado</p>
      </header>

      <ConverterForm />

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-2">📈 Histórico (últimos dias)</h2>
        <CurrencyChart />
      </section>

      <footer className="text-center text-gray-600 text-sm mt-10">
        Feito por Ítalo © {new Date().getFullYear()}
      </footer>
    </div>
  )
}
