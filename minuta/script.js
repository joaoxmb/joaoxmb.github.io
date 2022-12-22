const converterParaMoeda = ( value ) => value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });

const formatarNome = ( name ) => {
  return (name.split(' ').map((i) => {
    return i.charAt(0).toUpperCase() + i.slice(1).toLowerCase()
  })).join(' ')
};


const user = () => {
  let USER;
  const userLocalStorage = () => {
    const userData = localStorage.getItem('user-cnpj-infos');
    if( userData != null ){
      USER = JSON.parse(atob(userData));
    }else{
      window.location.href = `/user/form.html`;
    }
  };
  userLocalStorage();
  const dataComMunicipio = ( ) => {
    const data = USER.resultadoCnpj;
    let date = moment(new Date()).locale('pt-br');
    return (data.municipio + ', ' + date.format('D') + ' DE ' + date.format('MMMM') + ' DE ' + date.format('YYYY')).toUpperCase();
  }

  $('#user-name').text(USER.nome);
  $('#user-info').html(`${USER.resultadoCnpj.cnpj} <br> ${USER.resultadoCnpj.email} <br> ${USER.resultadoCnpj.telefone} <br> ${USER.funcao}`);
  $('#fechamento-data').text(`${dataComMunicipio()}`);
};

const inserirDiarias = () => {
  DATA.diarias.forEach(element => {
    const dinheiro = ( value ) => value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    const periodo = () => {
      const inicio = moment(element.inicio);
      const termino = moment(inicio).add(element.horas, 'hours')
      return inicio.format('HH:mm') + ' as ' + termino.format('HH:mm')
    };
    const total = () => {
      return converterParaMoeda(calculadora.valorPorHora(element.horas));
    };
  //   const cobrancasValor = element.cobranca.map(( data ) => {
  //     return data.valor;
  //   }).reduce(function(soma, i) {
  //     return soma + i;
  // });

  //   console.log(cobrancasValor);

    $('table tbody').append(`
      <tr>
        <td rowspan="${element.cobranca.length+1}" class="border"><span>${moment(element.inicio).format('DD/MM/YYYY')}</span></td>
        <td>${element.ocorrencia}</td>
        <td>${periodo()}</td>
        <td>${element.horas}</td>
        <td>${total()}</td>
      </tr>
    `);

    element.cobranca.forEach(( data ) => {
      $('table tbody').append(`
        <tr class="cobranca-item">
          <td colspan="3">${ data.motivo }</td>
          <td>${ dinheiro(data.valor) }</td>
        </tr>
      `);
      console.log(data);
    });

  });
};

const inserirTotal = () => {
  const resultado = calculadora.valorTotal();

  $('#horas-total').text(resultado.horas)
  $('#valor-total').text(converterParaMoeda(resultado.total));
};

const inserirDescriminacao = () => {
  $('#produtora b').text(DATA.produtora);
  $('#job b').text(DATA.job);
};

// if (window.opener != null && !window.opener.closed) {
//   var txtName = window.opener.document.getElementById("teste");
//   txtName.src = 'https://www.aspsnippets.com/images/metro/author_icon.jpg';
// }
// // window.close();



