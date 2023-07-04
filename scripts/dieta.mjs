export class Dieta {
    paciente
    etapas
    
    constructor(paciente) {
        this.paciente = paciente
        this.etapas = []
    }

    get volume() {
        return this.etapas.reduce((resultado, etapa) => {
            if (etapa.dieta) {
                return resultado + etapa.dietaMedida
            }
            return resultado
        }, 0)
    }
    
    get tempo() {
        return this.etapas.reduce((resultado, etapa) => {
            if (etapa.dieta) {
                return resultado + etapa.duracao
            }
            return resultado
        }, 0)
    }

    get biMedia() {
        return this.volume / this.tempo
    }

    get ptn() {
        return this.etapas.reduce((resultado, etapa) => {
            if (etapa.dieta) {
                return resultado + etapa.dieta.proteinas * etapa.dietaMedida / etapa.dieta.volume
            }
            return resultado
        }, 0)
    }

    get mp() {
        return this.etapas.reduce((resultado, etapa) => {
            if (etapa.moduloProteina) {
                return resultado + etapa.moduloProteina?.qtd * etapa.moduloProteinaMedida
            }
            return resultado
        }, 0)
    }

    get totalProteinas() {
        return this.ptn + this.mp
    }

    get fibras() {
        return this.etapas.reduce((resultado, etapa) => {
            if (etapa.dieta) {
                return resultado + etapa.dieta.fibras * etapa.dietaMedida / etapa.dieta.volume
            }
            return resultado
        }, 0)
    }

    get mf() {
        return this.etapas.reduce((resultado, etapa) => {
            if (etapa.moduloFibra) {
                return resultado + etapa.moduloFibra.qtd * etapa.moduloFibraMedida
            }
            return resultado
        }, 0)
    }

    get totalFibras() {
        return this.fibras + this.mf
    }

    get lip() {
        return this.etapas.reduce((resultado, etapa) => {
            if (etapa.dieta) {
                return resultado + etapa.dieta.gorduras * etapa.dietaMedida / etapa.dieta.volume
            }
            return resultado
        }, 0)
    }

    get vct() {
        const caloriasDieta = this.etapas.reduce((resultado, etapa) => {
            if (etapa.dieta) {
                return resultado + etapa.dieta.calorias * etapa.dietaMedida / etapa.dieta.volume
            }
            return resultado
        }, 0)

        const caloriasModulosProteinas = this.mp * 4

        return caloriasDieta + caloriasModulosProteinas
    }

    get cho() {
        return this.etapas.reduce((resultado, etapa) => {
            if (etapa.dieta) {
                return resultado + etapa.dieta.carboidratos * etapa.dietaMedida / etapa.dieta.volume
            }
            return resultado
        }, 0)
    }

    adequacaoVct(necessidadeCalorica) {
        return this.vct / necessidadeCalorica * 100
    }

    adequacaoPtn(necessidadeProteica) {
        return this.totalProteinas / necessidadeProteica * 100
    }

    adicionarEtapa(etapa) {
        this.etapas.push(etapa)
        this.etapas.sort((etapaA, etapaB) => etapaA.horario.localeCompare(etapaB.horario))
    }

    removerEtapa(horario) {
        this.etapas = this.etapas.filter(etapa => etapa.horario !== horario)
        this.etapas.sort((etapaA, etapaB) => etapaA.horario - etapaB.horario)
    }
}