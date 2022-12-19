const dinheiro = ( value ) => value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
const abrirMinuta = () => {
  let popUp = window.open(`/minuta/index.html`, "teste", "left=100,top=100,width=320,height=600");
      try {
          popUp.focus();
      }catch (e) {
          alert("Pop-up Blocker is enabled! Please disable your pop-up blocker.");
      }
};

minuta.iniciar();
minuta.load.diarias();
minuta.load.tabela();

const dinheiroConfig = {
  "autoUnmask": true,
  radixPoint: ",",
  groupSeparator: ".",
  allowMinus: false,
  prefix: 'R$ ',
  digits: 2,
  digitsOptional: false,
  rightAlign: true,
  unmaskAsNumber: true,
};

$('input[type="dinheiro"]').inputmask('currency', dinheiroConfig);

$('input[type="numero"]').inputmask('decimal', {
  "autoUnmask": true,
  allowMinus: false,
  rightAlign: true,
  unmaskAsNumber: true,
});

$('.input').click(function (event) {
  $(this).find('input,textarea,select').focus();
});

$('textarea').on('input', data =>{
  data.target.style.height = 'auto';
  data.target.style.height = (data.target.scrollHeight) + 'px';
});

alert(userData)