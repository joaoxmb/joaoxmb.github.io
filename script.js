const dinheiro = ( value ) => value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
const abrirMinuta = () => {
  let popUp = window.open(`/minuta/index.html?${btoa(JSON.stringify(DATA))}`, "teste", "left=100,top=100,width=320,height=600");
      try {
          popUp.focus();
      }catch (e) {
          alert("Pop-up Blocker is enabled! Please disable your pop-up blocker.");
      }
};
const inserirCabecalho = () => {
  $('#user_nome').text(USER.nome);
  $('#user_cnpj').text(USER.empresa.cnpj);
};

inserirCabecalho();
minuta.iniciar();
minuta.load.diarias();
minuta.load.tabela();

const dinheiroConfig = {
  autoUnmask: true,
  radixPoint: ",",
  groupSeparator: ".",
  allowMinus: false,
  prefix: 'R$ ',
  digits: 2,
  digitsOptional: false,
  unmaskAsNumber: true,
};

$('input[type="dinheiro"]').inputmask('currency', dinheiroConfig);

$('input[type="numero"]').inputmask('decimal', {
  autoUnmask: true,
  allowMinus: false,
  unmaskAsNumber: true,
});

$('.input').click(function (event) {
  $(this).find('input,textarea,select').focus();
});

$('textarea').on('input', element =>{
  element.target.style.height = 'auto';
  element.target.style.height = (element.target.scrollHeight) + 'px';
});
