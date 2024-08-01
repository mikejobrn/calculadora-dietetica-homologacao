/**
 * Exibe uma mensagem como um alerta dentro de um elemento especificado.
 * 
 * @param {HTMLDivElement} placeholder Local onde o alerta deve aparecer
 * @param {string} message Mensagem de erro
 * @param {'success'|'warning'|'danger'|'info'} type Tipo de alerta de acordo com o Bootstrap
 */
export function exibirAlerta(placeholder, message, type) {
  const wrapper = document.createElement('div');

  wrapper.innerHTML = `<div class="alert alert-${type} alert-dismissible" role="alert">
       <div>${message}</div>
       <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`;

  placeholder.append(wrapper);
}
