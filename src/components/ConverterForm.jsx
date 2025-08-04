import React, { useEffect, useState } from 'react'

export default function ConverterForm() {
  const [amount, setAmount] = useState(1)
  const [fromCurrency, setFromCurrency] = useState('USD')
  const [toCurrency, setToCurrency] = useState('BRL')
  const [converted, setConverted] = useState(null)

  useEffect(() => {
    fetch(`https://api.exchangerate.host/convert?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`)
      .then(res => res.json())
      .then(data => setConverted(data.result.toFixed(2)))
  }, [amount, fromCurrency, toCurrency])

  return (
    <div className="bg-gray-800 p-6 rounded-xl space-y-4 shadow-md">
      <div className="flex gap-4">
        <input type="number" value={amount} onChange={e => setAmount(e.target.value)} className="flex-1 p-2 rounded bg-gray-900 border border-gray-700" />
        <select value={fromCurrency} onChange={e => setFromCurrency(e.target.value)} className="p-2 rounded bg-gray-900 border border-gray-700">
          <option value="USD">🇺🇸 USD</option>
          <option value="EUR">🇪🇺 EUR</option>
          <option value="BTC">₿ BTC</option>
        </select>
        <select value={toCurrency} onChange={e => setToCurrency(e.target.value)} className="p-2 rounded bg-gray-900 border border-gray-700">
          <option value="BRL">🇧🇷 BRL</option>
          <option value="USD">🇺🇸 USD</option>
          <option value="EUR">🇪🇺 EUR</option>
        </select>
      </div>
      <p className="text-lg">Resultado: <strong>{converted} {toCurrency}</strong></p>
    </div>
  )
}
