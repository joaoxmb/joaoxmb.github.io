const converterParaMoeda = ( value ) => value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });


const formatarNome = ( name ) => {
  return (name.split(' ').map((i) => {
    return i.charAt(0).toUpperCase() + i.slice(1).toLowerCase()
  })).join(' ')
};


const dataComMunicipio = ( data ) => {
  let date = moment(new Date()).locale('pt-br');
  return (data.municipio + ', ' + date.format('D') + ' DE ' + date.format('MMMM') + ' DE ' + date.format('YYYY')).toUpperCase();
}
const user = () => {
    $.ajax({
    async: true,
    url: 'https://www.receitaws.com.br/v1/cnpj/' + data.user + '',
    type: 'GET',
    dataType: 'jsonp',
    success: ( userData ) => {
      $('#user-name').text(formatarNome(userData.fantasia));
      $('#user-info').html(`${userData.cnpj} <br> ${userData.email} <br> ${userData.telefone}`);

      // inserindo data com municipio
      $('#fechamento-data').text(`${dataComMunicipio(userData)}`);
    },
  });
};

const inserirDiarias = () => {
  data.diarias.forEach(element => {
    const periodo = () => {
      const inicio = moment(element.inicio);
      const termino = moment(inicio).add(element.horas, 'hours')

      return inicio.format('HH:mm') + ' as ' + termino.format('HH:mm')
    };

    const total = () => {
      return converterParaMoeda(calculadora.valorPorHora(element.horas));
    };


    let html = `
        <tr>
            <td>${moment(element.inicio).format('DD/MM/YYYY')}</td>
            <td>${element.ocorrencia}</td>
            <td>${periodo()}</td>
            <td>${element.horas}</td>
            <td>${total()}</td>
        </tr>
      `;

    $('table tbody').append(html);
  });
};

const inserirTotal = () => {
  const resultado = calculadora.valorTotal();

  $('#horas-total').text(resultado.horas)
  $('#valor-total').text(converterParaMoeda(resultado.total));
};

const inserirDescriminacao = () => {
  $('#produtora b').text(data.produtora);
  $('#job b').text(data.job);
};

// if (window.opener != null && !window.opener.closed) {
//   var txtName = window.opener.document.getElementById("teste");
//   txtName.src = 'https://www.aspsnippets.com/images/metro/author_icon.jpg';
// }
// // window.close();



