import React, { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export default function CurrencyChart() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`https://api.exchangerate.host/timeseries?start_date=2024-07-27&end_date=2024-08-03&base=USD&symbols=BRL`)
      .then(res => res.json())
      .then(data => {
        const formatted = Object.entries(data.rates).map(([date, rate]) => ({
          date,
          value: rate.BRL
        }))
        setData(formatted)
        setLoading(false)
      })
  }, [])

  if (loading) return <p>Carregando gráfico...</p>

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow">
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis domain={['auto', 'auto']} />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#22d3ee" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
