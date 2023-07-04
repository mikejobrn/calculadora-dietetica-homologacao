export class Etapa {
    id
    horario
    duracao
    dieta
    dietaMedida
    moduloProteina
    moduloProteinaMedida
    moduloFibra
    moduloFibraMedida

    get bi() {
        return this.dietaMedida / this.duracao
    }

    convertToHtml() {
        const cardDom = this.getCardDom()

        const cardHeaderDom = this.getCardHeaderDom()

        cardDom.appendChild(cardHeaderDom)

        const ulDom = this.getUlDom()
        const dietaLiDom = this.getLiDom(`${this.dieta.nome} - ${this.dietaMedida} ml`)
        ulDom.appendChild(dietaLiDom)

        if (this.moduloProteina) {
            const moduloProteinaLiDom = this.getLiDom(`${this.moduloProteina.nome} - ${this.moduloProteinaMedida} medida`)
            ulDom.appendChild(moduloProteinaLiDom)
        }

        if (this.moduloFibra) {
            const moduloFibraLiDom = this.getLiDom(`${this.moduloFibra.nome} - ${this.moduloFibraMedida} medida`)
            ulDom.appendChild(moduloFibraLiDom)
        }

        cardDom.appendChild(ulDom)

        return cardDom
    }

    getCardDom() {
        const cardDom = document.createElement('div')
        cardDom.classList.add('card')
        cardDom.classList.add('mb-3')
        return cardDom
    }

    getCardHeaderDom() {
        const cardHeaderDom = document.createElement('div')
        cardHeaderDom.classList.add('card-header', 'd-flex', 'justify-content-between')

        const textoDom = document.createElement('span')
        textoDom.innerText = `${this.horario} - BI: ${this.bi.toFixed(0)} ml/h`

        cardHeaderDom.appendChild(textoDom)

        const botaoRemocao = document.createElement('button')
        botaoRemocao.classList.add('btn', 'btn-sm', 'btn-danger', 'py-0', 'px-3', 'btn-remocao')
        botaoRemocao.dataset.horario = this.horario
        botaoRemocao.innerText = 'X'

        cardHeaderDom.appendChild(botaoRemocao)

        return cardHeaderDom
    }

    getUlDom() {
        const ulDom = document.createElement('ul')
        ulDom.classList.add('list-group')
        ulDom.classList.add('list-group-flush')
        return ulDom
    }

    getLiDom(texto) {
        const liDom = document.createElement('li')
        liDom.className = 'list-group-item'
        liDom.innerText = texto
        return liDom
    }
}