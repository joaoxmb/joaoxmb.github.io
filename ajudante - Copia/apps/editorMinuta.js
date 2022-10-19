const editorMinuta = {
    
  dataUtilizada: {
    id: 0,
  },

  abrir: function(id){

    this.dataUtilizada.id = id;


    $('#aba_editor').css({'top': '100%','display': 'block'});
    $('#aba_job').css({transform: 'translate(-50%, -0%) scale(0.93)',filter: 'brightness(0.85)',top: '0'});

    setTimeout(function() {

      $('#aba_editor').css({'top': 'calc(0% + 40px)','display': 'block'});
      $("#input_tipo li")[data[editorMinuta.dataUtilizada.id].tipo].click();
      $('#in_valorhora').val(data[editorMinuta.dataUtilizada.id].valorHora);
      $('#in_minhora').val(data[editorMinuta.dataUtilizada.id].minimoDeHoras);
      $('#in_observacao').val(data[editorMinuta.dataUtilizada.id].obs);
      editorMinuta.loadDiarias();

    }, 100);
  },

  fechar: function(){

    $('#aba_editor').css({'top': '100%'});

    editorJob.loadMinuta();
    
    setTimeout(function() {
      $('#aba_job').css({transform: 'translate(-50%, -0%)',filter: '','top': 'calc(0% + 40px)','display': 'block'});
      $('#aba_editor').css('display', 'none');
    }, 200);

  },
  
  salvar: function(){
      this.fechar();
  },

  input: function(el,tipo){

      if(tipo == 'tipo'){
        let $el = $(el)
        $el.addClass("selecionado").siblings().removeClass("selecionado");
        $("#nav_indicator").css({left: ""+$el.position().left+"px",width: ""+$el.width()+"px"});
  
        data[this.dataUtilizada.id].tipo = $el.attr('data-tipo')*1;
        this.loadDiarias();
      }else if(tipo != 'obs'){

        data[this.dataUtilizada.id][(tipo)] = $(el).val();
        this.loadDiarias();

      }
      if(tipo == 'obs'){
        data[this.dataUtilizada.id][(tipo)] = $(el).val();
      }

  },

  loadDiarias: function(){

    $('#aba_editor #ct_diarias .conteudo').html('');

    let mHora = data[this.dataUtilizada.id].minimoDeHoras,
        vHora = data[this.dataUtilizada.id].valorHora,
        tipo = data[this.dataUtilizada.id].tipo;

    data[this.dataUtilizada.id].diarias.sort((a,b)=> {return new Date(a.inicio)-new Date(b.inicio);}).forEach((a,b)=>{

      let element = `<div class="item" onclick="editorDiaria.abrir(${editorMinuta.dataUtilizada.id},${b}, 'abrir')">
                      <div>
                        <div>${moment(a.inicio).format('DD')}</div>
                        <div>${moment(a.inicio).format('MMM')}</div>
                      </div>
                      <div>
                        <div>
                          <h4>${a.ocorrencia}</h4>
                          <p>${moment(a.inicio).format('HH:mm')} as ${moment(a.inicio).add(a.horas,'hours').format('HH:mm')}</p>
                        </div>
                        <div>
                          <h4>${(tipo == 0 ? Math.max(0,a.horas - mHora)*(vHora*2)+(mHora*vHora) : tipo == 1 ? (a.horas * vHora) : a.valor||0).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</h4>
                          <p>${a.horas} Horas</p>
                        </div>
                      </div>
                    </div>`;

    $('#aba_editor #ct_diarias .conteudo').append(element);

    });


    const resultados = {
      horas:0,
      horasExtra:0,
      total:0,
      totalExtra:0,
    };

    data[this.dataUtilizada.id].diarias.forEach((a,b)=>{

      resultados.horas += a.horas;
      resultados.horasExtra += a.horas - mHora; 
      resultados.total += (tipo == 0 ? Math.max(0,a.horas - mHora)*(vHora*2)+(mHora*vHora) : tipo == 1 ? (a.horas * vHora) : a.valor||0);
      resultados.totalExtra += Math.max(0,a.horas - mHora)*(vHora*2);
    
    });

    $('#aba_editor #ct_resultados').text(
      tipo == 0 ? `

        ${resultados.horas} Horas | 
        ${resultados.horasExtra} Horas Extra |
        ${resultados.totalExtra.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})} Total Extra |
        ${resultados.total.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})} Total

      `: tipo == 1 ? `
      
      ${resultados.horas} Horas | 
      ${resultados.total.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})} Total

      ` : `
      
      ${resultados.total.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})} Total

      `
    );


  },

  textArea: function (element){
    element.style.height = 'auto';
    element.style.height = (element.scrollHeight) + 'px';
  },

}