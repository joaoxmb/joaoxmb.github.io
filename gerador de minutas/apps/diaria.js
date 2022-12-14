const diaria =  {

  open_diaria: 0,
  open_tipo: '',
  criar_diaria: {},

  abrir: (diariaNumber) => {

    diaria.open_diaria = diariaNumber;
    diaria.open_tipo = 'abrir';
  
    diaria.criar_diaria = structuredClone(data.diarias[diaria.open_diaria]);

    $('#aba-diaria .nome-page').html('Editar diaria');
    $('#inicio').val(diaria.criar_diaria.inicio);
    $('#ocorrencia').val(diaria.criar_diaria.ocorrencia);
    $('#aba-diaria #apagarDiaria').css({ display: 'block' });
    $('#aba-diaria #termino').css({ display: 'block' });
    
    $('#aba-diaria #valor').val(calculadora.valorPorHora(diaria.criar_diaria.horas));

    if (data.tipo == 'pacote') {
      $('#aba-diaria #termino').parent().css({ display: 'none' });
      $('#aba-diaria #valor').parent().removeAttr('desativado');
    } else {
      diaria.load_termino();
      $('#aba-diaria #valor').parent().attr('desativado', 'desativado');
    }

          $('#aba-diaria').css({ 'top': '100%', 'display': 'block' });
          $('#aba-inicio').css({ transform: 'translate(-50%, -0%) scale(0.93)', filter: 'brightness(0.85)' });
          $('body').css({ background: '#231f20' });

          setTimeout(function () {
            $('#aba-diaria').css({ 'top': 'calc(0% + 40px)', 'display': 'block' });
          }, 100);

  },

  criar: () => {

    diaria.open_tipo = 'criar';

    $('#aba-diaria .nome-page').html('Nova diaria');
    diaria.criar_diaria = {
      inicio: '',
      horas: data.tipo == 'tabela' ? tabela.find(e => e.id == data.valor.tabela).valores[0].horas: data.valor.minimoDeHoras,
      ocorrencia: '', 
    };
                    
    $('#ocorrencia,#inicio,#termino,#valor').val('');
    $('#aba-diaria #apagarDiaria').css({display: 'none'});
    $('#aba-diaria #termino').css({display: 'block'});
    $('#aba-diaria #valor').parent().attr('desativado', 'desativado');

    if(data.tipo == 'pacote'){
      $('#aba-diaria #termino').parent().css({display: 'none'});
      $('#aba-diaria #valor').parent().removeAttr('desativado');
    }
    
          $('#aba-diaria').css({ 'top': '100%', 'display': 'block' });
          $('#aba-inicio').css({ transform: 'translate(-50%, -0%) scale(0.93)', filter: 'brightness(0.85)' });
          $('body').css({ background: '#231f20' });

          setTimeout(function () {
            $('#aba-diaria').css({ 'top': 'calc(0% + 40px)', 'display': 'block' });
          }, 100);

  },

  fechar: function(){

    $('#aba-diaria').css({'top': '100%'});
    $('#aba-inicio').css({transform: 'translate(-50%, -0%) scale(1)',filter: 'brightness(1)'});
    $('body').css({background: ''});

    setTimeout(function() {
      $('#aba-diaria').css('display', 'none');
    }, 200);

  },

  salvar: function(){

    if(diaria.open_tipo == 'criar'){

      data.diarias.push(structuredClone(diaria.criar_diaria));
      diaria.fechar();
      minuta.load.diarias();

      console.log('teste');

    }else{
      data.diarias[diaria.open_diaria] = structuredClone(diaria.criar_diaria);
      diaria.fechar();
      minuta.load.diarias();    
    }

  },

  apagar: function(){
  
    var index = data.diarias.indexOf(data.diarias[diaria.open_diaria]);
    if (index > -1) {
      data.diarias.splice(index, 1);
    }

    diaria.fechar();
    minuta.load.diarias();

    console.log('execute');

  },

  input: {

    ocorrencia: ( value ) => {
      diaria.criar_diaria.ocorrencia = $(value).val();
    },
    inicio: ( value ) => {
      diaria.criar_diaria.inicio = $(value).val();
      diaria.load_termino();
    },
    termino: ( value ) => {
      value = $(value).val();
      diaria.criar_diaria.horas = value;
      $('#aba-diaria #valor').val(calculadora.valorPorHora(value));
    },
    valor: ( value ) => {
      diaria.criar_diaria.valor = $(value).val();
    },
    
  },

  load_termino: () => {

    $('#aba-diaria #termino').html('');

    if( data.tipo == 'tabela' ){

      const length = tabela.find(e => e.id == data.valor.tabela).valores.length;
      
      for(let i=0;i < length;i++){

        const DATA = moment(diaria.criar_diaria.inicio).add(data.valor.minimoDeHoras, 'hours').add(i, 'hours');
        const HORAS = (data.valor.minimoDeHoras) + i;
  
        $('#aba-diaria #termino').append(`
          <option value="${HORAS}">
            ${moment(DATA).format('HH:mm')} | ${HORAS.toFixed(1)} h
          </option>
        `);

      }

    }else if( data.tipo == 'corrida' ){

      for(let i=0;i < 21;i++){

        let DATA = moment(diaria.criar_diaria.inicio).add(data.valor.minimoDeHoras, 'hours').add((i/2), 'hours');
        let HORAS = (data.valor.minimoDeHoras) + (i / 2);
  
        let el = `<option value="${HORAS}">
                    ${moment(DATA).format('HH:mm')} | ${HORAS.toFixed(1)} h
                  </option>`;
  
        $('#aba-diaria #termino').append(el);
  
      }

    }

    $('#aba-diaria #termino').val(diaria.criar_diaria.horas||data.valor.minimoDeHoras||tabela.find(e => e.id == data.valor.tabela).valores[0].horas);
    $('#aba-diaria #valor').val(calculadora.valorPorHora(diaria.criar_diaria.horas));

  }

}