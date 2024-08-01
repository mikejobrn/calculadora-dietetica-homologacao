/**
 * Estima a altura em m de um paciente de acordo com Chumlea et al. (1985).
 * 
 * @param {Object} parametros
 * @param {number} parametros.aj Altura do joelho em cm
 * @param {number} parametros.idade Idade em anos (número inteiro)
 * @param {'homem'|'mulher'} parametros.sexo Sexo
 * @param {'branco'|'negro'} parametros.raca Raça/Etnia
 * @returns {number} Altura estimada
 */
export function estimarAlturaChumleaEtAl1985({ aj, idade, sexo, raca }) {
    if (idade < 18) {
      throw new Error('No momento, não é possível estimar a altura de indivíduos menores de 18 anos.');
    }

    let k;
    let aj_k;
    let idd_k;

    if (idade <= 60) {
      if (sexo === 'homem') {
        if (raca === 'branco') {
          k = 71.85;
          aj_k = 1.88;
          idd_k = 0;
        } else {
          k = 73.42;
          aj_k = 1.79;
          idd_k = 0;
        }
      } else {
        if (raca === 'branco') {
          k = 70.25;
          aj_k = 1.87;
          idd_k = 0.06;
        } else {
          k = 68.10;
          aj_k = 1.87;
          idd_k = 0.06;
        }
      }
    } else {
      if (sexo === 'homem') {
        k = 64.19;
        aj_k = 2.04;
        idd_k = 0.04;
      } else {
        k = 84.88;
        aj_k = 1.83;
        idd_k = 0.24;
      }
    }

    let alturaEstimada = k + (aj * aj_k) - (idade * idd_k);

    alturaEstimada = Math.round(alturaEstimada + Number.EPSILON) / 100;
    
    return alturaEstimada;
}