export class Etapa {
    id
    horario
    dieta
    dietaMedida
    moduloProteina
    moduloProteinaMedida
    moduloFibra
    moduloFibraMedida

    convertToHtml() {
        const cardDom = this.getCardDom()

        const cardHeaderDom = this.getCardHeaderDom()
        cardHeaderDom.innerText = this.horario

        cardDom.appendChild(cardHeaderDom)

        const ulDom = this.getUlDom()
        const dietaLiDom = this.getLiDom(`${this.dieta.nome} - ${this.dietaMedida} ml`)
        ulDom.appendChild(dietaLiDom)

        if (this.moduloProteina) {
            const moduloProteinaLiDom = this.getLiDom(`${this.moduloProteina.nome} - ${this.moduloProteinaMedida} medida`)
            ulDom.appendChild(moduloProteinaLiDom)
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
        cardHeaderDom.className = 'card-header'
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