/**
 * Estima o peso em kg de um paciente de acordo com Chumlea et al. (1988).
 * 
 * @param {Object} parametros
 * @param {number} parametros.aj Altura do joelho em cm
 * @param {number} parametros.cb Circunferência do branço em cm
 * @param {number} parametros.idade Idade em anos (número inteiro)
 * @param {'homem'|'mulher'} parametros.sexo Sexo
 * @param {'branco'|'negro'} parametros.raca Raça/Etnia
 * @returns {number} Peso estimado
 */
export function estimarPesoChumleaEtAl1988({ aj, cb, idade, sexo, raca }) {
    if (idade < 18) {
      throw new Error('No momento, não é possível estimar o peso de indivíduos menores de 18 anos.');
    }

    let aj_k;
    let cb_k;
    let k;

    if (idade <= 60) {
      if (sexo === 'homem') {
        if (raca === 'branco') {
          aj_k = 1.19;
          cb_k = 3.21;
          k = 86.82;
        } else {
          aj_k = 1.09;
          cb_k = 3.14;
          k = 83.72;
        }
      } else {
        if (raca === 'branco') {
          aj_k = 1.01;
          cb_k = 2.81;
          k = 60.04;
        } else {
          aj_k = 1.24;
          cb_k = 2.97;
          k = 82.48;
        }
      }
    } else {
      if (sexo === 'homem') {
        if (raca === 'branco') {
          aj_k = 1.10;
          cb_k = 3.07;
          k = 75.81;          
        } else {
          aj_k = 0.44;
          cb_k = 2.86;
          k = 39.21;
        }
      } else {
        if (raca === 'branco') {
          aj_k = 1.09;
          cb_k = 2.68;
          k = 65.51;
        } else {
          aj_k = 1.50;
          cb_k = 2.58;
          k = 84.22;
        }
      }
    }

    let pesoEstimado = (aj * aj_k) + (cb * cb_k) - k;

    pesoEstimado = Math.round((pesoEstimado + Number.EPSILON) * 100) / 100;
    
    return pesoEstimado;
}