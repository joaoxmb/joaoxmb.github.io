const editorDiaria =  {

  dataUtilizada: {
    id: 0,
    diaria: 0,
    objeto: {},
    tipo: '',
  },

  abrir: function(id,diaria,tipo){

    this.dataUtilizada.id = id;
    this.dataUtilizada.objeto = structuredClone(data[id].diarias[diaria]);
    this.dataUtilizada.tipo = tipo;
    
    data[this.dataUtilizada.id].tipo != 2 ? $('#aba_diaria #in_valor').parent().attr('desativado', 'desativado') : null;

    if(tipo == 'criar'){

      $('#aba_diaria .nome-page').html('Nova diaria');
      this.dataUtilizada.objeto = {
                        inicio: '',
                        horas: data[this.dataUtilizada.id].minimoDeHoras,
                        ocorrencia: '', 
                      };
                      

    }else if(tipo == 'abrir'){

      $('#aba_diaria .nome-page').html('Editar diaria');
      this.dataUtilizada.diaria = diaria;
      editorDiaria.loadValor();
      editorDiaria.loadTermino();
      $('#in_inicio').val(this.dataUtilizada.objeto.inicio);
      $('#in_ocorrencia').val(this.dataUtilizada.objeto.ocorrencia);
    
    }


    // animation
    $('#aba_diaria').css({'top': '100%','display': 'block'});
    $('#aba_editor').css({transform: 'translate(-50%, -0%) scale(0.93)',filter: 'brightness(0.85)',top: '0'});
    setTimeout(function() {
      $('#aba_diaria').css({'top': 'calc(0% + 40px)','display': 'block'});
    }, 100);

  },

  fechar: function(){

    $('#aba_diaria').css({'top': '100%'});
    setTimeout(function() {
      $('#aba_diaria').css('display', 'none');
      $('#aba_editor').css({transform: 'translate(-50%, -0%)',filter: '','top': 'calc(0% + 40px)'});
    }, 200);

  },

  salvar: function(){

    if(this.dataUtilizada.tipo == 'criar'){

      data[this.dataUtilizada.id].diarias[data[this.dataUtilizada.id].diarias.length] = structuredClone(this.dataUtilizada.objeto);
      editorDiaria.fechar();
      editorMinuta.loadDiarias();

    }else{
      data[this.dataUtilizada.id].diarias[this.dataUtilizada.diaria] = structuredClone(this.dataUtilizada.objeto);
      editorDiaria.fechar();
      editorMinuta.loadDiarias();
    }

  },

  input: function(el,tipo){

    this.dataUtilizada.objeto[(tipo)] = tipo == 'horas' ? $(el).val()*1: $(el).val();

    if(tipo == 'horas'){
      editorDiaria.loadValor();
    }else if(tipo == 'inicio'){
      editorDiaria.loadTermino();
    }

  },

  loadValor: function(){

    let mHoras = data[this.dataUtilizada.id].minimoDeHoras,
        vHora = data[this.dataUtilizada.id].valorHora,
        xHora = this.dataUtilizada.objeto.horas;

    $('#aba_diaria #in_valor').val( 
      data[editorDiaria.dataUtilizada.id].tipo == 0 ? Math.max(0,xHora - mHoras)*(vHora*2)+(mHoras*vHora) : (xHora * vHora)
    );

  },

  loadTermino: function(){

    $('#aba_diaria #in_termino').html('');

    for(let i=0;i < 23;i++){

      let DATA = moment(editorDiaria.dataUtilizada.objeto.inicio).add(data[editorDiaria.dataUtilizada.id].minimoDeHoras, 'hours').add((i/2), 'hours');
      let HORAS = (data[editorDiaria.dataUtilizada.id].minimoDeHoras) + (i / 2);

      let el = `<option value="${HORAS}">
                  ${moment(DATA).format('HH:mm')} | ${HORAS.toFixed(1)} h
                </option>`;

      $('#aba_diaria #in_termino').append(el);

    }

    $('#aba_diaria #in_termino').val(editorDiaria.dataUtilizada.objeto.horas||data[editorDiaria.dataUtilizada.id].minimoDeHoras);
    editorDiaria.loadValor();

  }

}