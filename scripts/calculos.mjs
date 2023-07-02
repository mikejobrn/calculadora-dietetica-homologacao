export function calcularImc(peso, altura) {
    return peso / altura ** 2
}

export function calcularClassificacaoImc(imc, idade) {
    // Adultos
    if (idade < 60) {
        if (imc < 18.4) return 'Desnutrição';
        if (imc < 24.9) return 'Eutrofia';
        if (imc < 29.9) return 'Sobrepeso';
        return 'Obesidade';
    }
    
    // Idosos
    if (imc < 22) return 'Desnutrição';
    if (imc < 27) return 'Eutrofia';
    return 'Sobrepeso';
}

export function calcularPesoIdeal(altura, idade) {
    let imcIdeal
    // Adultos
    if (idade < 60) {
        imcIdeal = (18.5 + 24.9) / 2
    } 
    // Idosos
    else {
        imcIdeal = (22 + 27) / 2
    }
    return imcIdeal * altura ** 2
}

export function calcularNecessidadeCalorica(peso, caloriasPorKg) {
    return peso * caloriasPorKg
}

export function calcularNecessidadeProteica(peso, proteinasPorKg) {
    return peso * proteinasPorKg
}