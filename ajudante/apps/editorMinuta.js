const editorMinuta = {
    
  dataUtilizada: {
    id: 0,
    objeto: {},
  },

  abrir: function(id){

    this.dataUtilizada.id = id;
    this.dataUtilizada.objeto = data[id];

    $('#aba_editor').css({'top': '100%','display': 'block'});
    $('#aba_job').css({transform: 'translate(-50%, -0%) scale(0.93)',filter: 'brightness(0.85)',top: '0'});

    setTimeout(function() {

      $('#aba_editor').css({'top': 'calc(0% + 40px)','display': 'block'});
      $("#input_tipo li")[editorMinuta.dataUtilizada.objeto.tipo].click();
      $('#in_valorhora').val(editorMinuta.dataUtilizada.objeto.valorHora);
      $('#in_minhora').val(editorMinuta.dataUtilizada.objeto.minimoDeHoras);
      editorMinuta.loadDiarias();

    }, 100);
  },

  fechar: function(){

    $('#aba_editor').css({'top': '100%'});
    
    setTimeout(function() {
      $('#aba_job').css({transform: 'translate(-50%, -0%)',filter: '','top': 'calc(0% + 40px)','display': 'block'});
      $('#aba_editor').css('display', 'none');
    }, 200);

  },
  
  inputTipo: function(el){
      let $el = $(el)
      $el.addClass("selecionado").siblings().removeClass("selecionado");
      $("#nav_indicator").css({left: ""+$el.position().left+"px",width: ""+$el.width()+"px"});

      this.dataUtilizada.objeto.tipo = $el.attr('data-tipo')*1;
      this.loadDiarias();
  },

  loadDiarias: function(){

    $('#ct_diarias .conteudo').html('');

    let mHora = this.dataUtilizada.objeto.minimoDeHoras,
        vHora = this.dataUtilizada.objeto.valorHora,
        tipo = this.dataUtilizada.objeto.tipo;

    this.dataUtilizada.objeto.diarias.sort((a,b)=> {return new Date(a.inicio)-new Date(b.inicio);}).forEach((a,b)=>{

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

    $('#ct_diarias .conteudo').append(element);

    });

  },

  textArea: function (element){
    element.style.height = 'auto';
    element.style.height = (element.scrollHeight) + 'px';
  },

}