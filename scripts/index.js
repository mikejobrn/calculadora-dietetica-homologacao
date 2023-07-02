import { calcularNecessidadeCalorica, calcularNecessidadeProteica, calcularPesoIdeal } from './calculos.mjs';
import { dietas } from './data/dietas.mjs';
import { modulosProteina } from './data/modulo-proteina.mjs';
import { modulosFibra } from './data/modulo-fibra.mjs'
import { Dieta } from './dieta.mjs';
import { Etapa } from './etapa.mjs';
import { Paciente } from './paciente.mjs';

let pesoEstimado
let altura
let idade
let necessidadeCaloricaPorKg
let necessidadeProteicaPorKg
let pesoIdeal
let necessidadeCaloricaPorPesoIdeal
let necessidadeCaloricaPorPesoEstimado
let necessidadeProteicaPorPesoIdeal
let necessidadeProteicaPorPesoEstimado
let dieta

window.addEventListener('load', () => {
  carregarSelectDietas();
  carregarSelectModulosProteina();
  carregarSelectModulosFibra();
});

document
  .getElementById('calcular-imc')
  .addEventListener('click', (e) => {
    e.preventDefault();

    pesoEstimado = parseFloat(document.getElementById('peso').value);
    altura = parseFloat(document.getElementById('altura').value);
    idade = parseFloat(document.getElementById('idade').value)

    const paciente = new Paciente()
    paciente.pesoEstimado = pesoEstimado
    paciente.altura = altura
    paciente.idade = idade

    dieta = new Dieta(paciente)

    document.getElementById('imc').innerText = paciente.imc.toFixed(1);
    document.getElementById('imc-classificacao').innerText = paciente.classificacaoImc;

    document.getElementById('passo-2').className = ''
  });

document
  .getElementById('calcular-necessidades-nutricionais')
  .addEventListener('click', (e) => {
    e.preventDefault();

    necessidadeCaloricaPorKg = parseFloat(document.getElementById('necessidade-calorica-por-kg').value)
    necessidadeProteicaPorKg = parseFloat(document.getElementById('necessidade-proteica-por-kg').value)

    pesoIdeal = calcularPesoIdeal(altura, idade)

    necessidadeCaloricaPorPesoIdeal = calcularNecessidadeCalorica(pesoIdeal, necessidadeCaloricaPorKg)
    necessidadeCaloricaPorPesoEstimado = calcularNecessidadeCalorica(pesoEstimado, necessidadeCaloricaPorKg)

    necessidadeProteicaPorPesoIdeal = calcularNecessidadeProteica(pesoIdeal, necessidadeProteicaPorKg)
    necessidadeProteicaPorPesoEstimado = calcularNecessidadeProteica(pesoEstimado, necessidadeProteicaPorKg)

    document.getElementById('necessidade-calorica-peso-ideal').innerText = necessidadeCaloricaPorPesoIdeal.toFixed(0)
    document.getElementById('necessidade-calorica-por-peso-ideal').value = necessidadeCaloricaPorPesoIdeal
    document.getElementById('necessidade-calorica-peso-estimado').innerText = necessidadeCaloricaPorPesoEstimado.toFixed(0)
    document.getElementById('necessidade-calorica-por-peso-estimado').value = necessidadeCaloricaPorPesoEstimado
    document.getElementById('necessidade-proteica-peso-ideal').innerText = necessidadeProteicaPorPesoIdeal.toFixed(1)
    document.getElementById('necessidade-proteica-por-peso-ideal').value = necessidadeProteicaPorPesoIdeal
    document.getElementById('necessidade-proteica-peso-estimado').innerText = necessidadeProteicaPorPesoEstimado.toFixed(1)
    document.getElementById('necessidade-proteica-por-peso-estimado').value = necessidadeProteicaPorPesoEstimado

    document.getElementById('passo-3').className = ''
  })

document
  .getElementById('adicionar-etapa')
  .addEventListener('click', (e) => {
    e.preventDefault();

    const etapa = new Etapa()
    etapa.horario = document.getElementById('horario').value

    const dietaSelecionadaNome = document.getElementById('dietas').value
    const dietaSelecionada = dietaSelecionadaNome !== '' ? dietas.find(dieta => dieta.nome === dietaSelecionadaNome) : undefined
    etapa.dieta = dietaSelecionada
    etapa.dietaMedida = parseFloat(document.getElementById('volume-dieta').value)

    const moduloProteinaSelecionadaNome = document.getElementById('modulo-proteina').value
    const moduloProteinaSelecionada = moduloProteinaSelecionadaNome !== '' ? modulosProteina.find(mp => mp.nome === moduloProteinaSelecionadaNome) : undefined
    etapa.moduloProteina = moduloProteinaSelecionada
    etapa.moduloProteinaMedida = parseFloat(document.getElementById('medida-modulo-proteina').value)

    dieta.etapas.push(etapa)

    document.getElementById('passo-4').className = ''

    // limpar
    document.getElementById('horario').value = ''
    document.getElementById('dietas').value = ''
    document.getElementById('volume-dieta').value = ''
    document.getElementById('modulo-proteina').value = ''
    document.getElementById('medida-modulo-proteina').value = ''

    mostrarEtapas();
    atualizarResumo();
})

function mostrarEtapas() {
  const etapasDom = document.getElementById('etapas')
  etapasDom.innerHTML = ''
  dieta.etapas.forEach(etapa => {
    etapasDom.appendChild(etapa.convertToHtml())
  })
}

function atualizarResumo() {
  const necessidadeCalorica = parseFloat(document.querySelector('input[name="necessidade-calorica-por-peso"]:checked').value)
  const necessidadeProteica = parseFloat(document.querySelector('input[name="necessidade-proteica-por-peso"]:checked').value)

  document.getElementById('res-vct').innerText = dieta.vct.toFixed(0)
  document.getElementById('res-cho').innerText = dieta.cho.toFixed(0)
  document.getElementById('res-ptn').innerText = dieta.ptn.toFixed(1)
  document.getElementById('res-mp').innerText = dieta.mp.toFixed(1)
  document.getElementById('res-total-proteina').innerText = dieta.totalProteinas.toFixed(1)
  document.getElementById('res-lip').innerText = dieta.lip.toFixed(1)
  document.getElementById('res-fibras').innerText = dieta.fibras.toFixed(1)
  document.getElementById('res-mf').innerText = dieta.mf.toFixed(1)
  document.getElementById('res-total-fibras').innerText = dieta.totalFibras.toFixed(1)
  document.getElementById('res-necessidade-calorica-total').innerText = necessidadeCalorica.toFixed(0)
  document.getElementById('res-necessidade-calorica-por-peso').innerText = necessidadeCaloricaPorKg.toFixed(0)
  document.getElementById('res-percentual-adequacao-vct').innerText = dieta.adequacaoVct(necessidadeCalorica).toFixed(0)
  document.getElementById('res-necessidade-proteica-total').innerText = necessidadeProteica.toFixed(1)
  document.getElementById('res-necessidade-proteica-por-peso').innerText = necessidadeProteicaPorKg.toFixed(1)
  document.getElementById('res-percentual-adequacao-ptn').innerText = dieta.adequacaoPtn(necessidadeProteica).toFixed(0)
  document.getElementById('res-necessidade-hidrica').innerText = dieta.paciente.necessidadeHidrica.toFixed(0)
}

function carregarSelectDietas() {
  const dietasOptionsDom = dietas.map((dieta) => {
    const option = document.createElement('option');
    option.value = dieta.nome;
    option.text = dieta.nome;
    return option;
  });

  const dietasSelectDom = document.getElementById('dietas');
  dietasOptionsDom.forEach((dietaOptionDom) => dietasSelectDom.appendChild(dietaOptionDom));
}

function carregarSelectModulosProteina() {
  const modulosProteinaOptionsDom = modulosProteina.map((moduloProteina) => {
    const option = document.createElement('option');
    option.value = moduloProteina.nome;
    option.text = moduloProteina.nome;
    return option;
  });

  const modulosProteinaSelectDom = document.getElementById('modulo-proteina');
  modulosProteinaOptionsDom.forEach((moduloProteinaDom) =>
    modulosProteinaSelectDom.appendChild(moduloProteinaDom)
  );
}

function carregarSelectModulosFibra() {
  const modulosFibraOptionsDom = modulosFibra.map((moduloFibra) => {
    const option = document.createElement('option');
    option.value = moduloFibra.nome;
    option.text = moduloFibra.nome;
    return option;
  });

  const modulosFibraSelectDom = document.getElementById('modulo-fibra');
  modulosFibraOptionsDom.forEach((moduloFibraDom) =>
    modulosFibraSelectDom.appendChild(moduloFibraDom)
  );
}
