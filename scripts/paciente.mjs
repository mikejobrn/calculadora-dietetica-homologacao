export class Paciente {
    pesoEstimado
    altura
    idade

    get imc() {
        return this.pesoEstimado / this.altura ** 2
    }

    get classificacaoImc() {
        // Adultos
        if (this.idade < 60) {
            if (this.imc < 18.4) return 'Desnutrição';
            if (this.imc < 24.9) return 'Eutrofia';
            if (this.imc < 29.9) return 'Sobrepeso';
            return 'Obesidade';
        }
        
        // Idosos
        if (this.imc < 22) return 'Desnutrição';
        if (this.imc < 27) return 'Eutrofia';
        return 'Sobrepeso';
    }

    get pesoIdeal() {
        let imcIdeal
        // Adultos
        if (this.idade < 60) {
            imcIdeal = (18.5 + 24.9) / 2
        } 
        // Idosos
        else {
            imcIdeal = (22 + 27) / 2
        }
        return imcIdeal * this.altura ** 2
    }

    get necessidadeHidricaPorKg() {
        if (this.idade < 20) return 40
        if (this.idade < 55) return 35
        if (this.idade < 75) return 30
        return 25
    }
    
    get necessidadeHidrica() {
        return this.necessidadeHidricaPorKg * this.pesoEstimado;
    }
}