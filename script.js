
const API_KEY = '9c09142e9c83be86bc4d13ac';
const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}`;


const elements = {
  valorInput: document.getElementById('valor'),
  moedaOrigemSelect: document.getElementById('moedaOrigem'),
  moedaDestinoSelect: document.getElementById('moedaDestino'),
  btnConverter: document.getElementById('converter'),
  resultadoDiv: document.getElementById('resultado'),
  chartCanvas: document.getElementById('historicoChart')
};


const moedasDisponiveis = {
  'BRL': 'Real Brasileiro',
  'USD': 'Dólar Americano',
  'EUR': 'Euro',
  'GBP': 'Libra Esterlina',
  'JPY': 'Iene Japonês'
};


let chartInstance = null;


document.addEventListener('DOMContentLoaded', () => {
  popularSelects();
  setupEventListeners();
  carregarCotacaoPadrao();
});

function popularSelects() {
  for (const [sigla, nome] of Object.entries(moedasDisponiveis)) {
    elements.moedaOrigemSelect.innerHTML += `<option value="${sigla}">${sigla} - ${nome}</option>`;
    elements.moedaDestinoSelect.innerHTML += `<option value="${sigla}">${sigla} - ${nome}</option>`;
  }
  

  elements.moedaOrigemSelect.value = 'BRL';
  elements.moedaDestinoSelect.value = 'USD';
}

function setupEventListeners() {
  elements.btnConverter.addEventListener('click', converterMoeda);
  elements.moedaDestinoSelect.addEventListener('change', () => {
    if (elements.valorInput.value) {
      converterMoeda();
    }
  });
}

async function converterMoeda() {
  const valor = parseFloat(elements.valorInput.value);
  const moedaOrigem = elements.moedaOrigemSelect.value;
  const moedaDestino = elements.moedaDestinoSelect.value;

  if (!valor || isNaN(valor)) {
    elements.resultadoDiv.textContent = '⚠️ Digite um valor válido!';
    return;
  }

  try {
    elements.resultadoDiv.textContent = 'Convertendo...';
    
    const response = await fetch(`${BASE_URL}/pair/${moedaOrigem}/${moedaDestino}/${valor}`);
    const data = await response.json();

    if (data.result === 'success') {
      const resultado = data.conversion_result.toFixed(2);
      elements.resultadoDiv.innerHTML = `
        <strong>${valor} ${moedaOrigem}</strong> = 
        <strong class="resultado-destaque">${resultado} ${moedaDestino}</strong>
      `;
      atualizarHistorico(moedaDestino);
    } else {
      throw new Error(data['error-type'] || 'Erro na conversão');
    }
  } catch (error) {
    elements.resultadoDiv.textContent = `❌ Erro: ${error.message}`;
    console.error("Erro na conversão:", error);
  }
}

async function carregarCotacaoPadrao() {
  try {
    const response = await fetch(`${BASE_URL}/latest/BRL`);
    const data = await response.json();
    
    if (data.result === 'success') {
      criarGraficoInicial(data.conversion_rates);
    }
  } catch (error) {
    console.error("Erro ao carregar cotações:", error);
  }
}

function criarGraficoInicial(rates) {
  const moedasSelecionadas = ['USD', 'EUR', 'GBP', 'JPY'];
  const dados = moedasSelecionadas.map(moeda => rates[moeda]);
  
  renderizarGrafico({
    labels: moedasSelecionadas,
    datasets: [{
      label: 'Cotações em BRL',
      data: dados,
      backgroundColor: ['#4CAF50', '#2196F3', '#FFC107', '#9C27B0']
    }]
  }, 'bar');
}

function atualizarHistorico(moeda) {
 
  const dias = ['1d', '3d', '5d', '7d'];
  const variacao = [1, 0.98, 1.02, 0.99]; // Valores fictícios
  
  renderizarGrafico({
    labels: dias,
    datasets: [{
      label: `Variação do ${moeda}`,
      data: variacao,
      borderColor: '#FF5722',
      tension: 0.1,
      fill: false
    }]
  }, 'line');
}

function renderizarGrafico(data, type) {
  if (chartInstance) {
    chartInstance.destroy();
  }
  
  chartInstance = new Chart(elements.chartCanvas, {
    type: type,
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        }
      }
    }
  });
}