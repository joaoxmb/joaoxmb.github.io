const minuta = {

  iniciar: () => {
  
    $('#job').val(data.job);
    $('#produtora').val(data.produtora);
    $('#solicitante').val(data.solicitante);
  
    $("#tipo").find("li[tipo="+data.tipo+"]").click();
    $('#observacao').val(data.observacao);
    $('#valorhora').val(data.valor.valorHora);
    $('#minhora').val(data.valor.minimoDeHoras);
  },

  load: {
    diarias: () => {

      $('#ct_diarias .conteudo').html('');
    
      data.diarias.sort((a,b)=> {return new Date(a.inicio)-new Date(b.inicio);}).forEach((a,b)=>{

        const object = $(`
          <div class="item" onclick="diaria.abrir(${b})">
          <div class="data-container">
            <p class="--dia">${moment(a.inicio).format('DD')} <br> <span class="--mes">${moment(a.inicio).format('MMM')}</span> </p>
          </div>
          <div class="desc-container">
            <div class="--textos">
              <h4>${a.ocorrencia}</h4>
              <p>${moment(a.inicio).format('HH:mm')} as ${moment(a.inicio).add(a.horas,'hours').format('HH:mm')}</p>

              <div class="cobranca-itens-motivo">
              </div>

            </div>
            <div class="--valores">
              <h4>${data.tipo == 'pacote' ? dinheiro(a.valor||0):dinheiro(calculadora.valorPorHora(a.horas))}</h4>
              <p>${a.horas} Horas</p>

              <div class="cobranca-itens-valor">
              </div>

            </div>
          </div>
        </div>
        `);

        a.cobranca.forEach(( item ) => {
          if( item.valor != 0){
            const htmlMotivo = `
            <p>
              ${item.motivo}
            </p>
          `;
          const htmlValor = `
            <p>
              ${dinheiro(item.valor)}
            </p>
          `;

          $(object).find('.cobranca-itens-motivo').append(htmlMotivo);
          $(object).find('.cobranca-itens-valor').append(htmlValor);
          }
        })

    
        $('#ct_diarias .conteudo').append(object);
    
      });
      
      minuta.load.descricao();

    },
  
    tabela: () => {
  
      $('#tabela').html('');
    
      tabela.forEach((e)=>{ 
        $('#tabela').append(`
            <option value="${e.id}">
              ${e.nome}
            </option>
        `);
      });
    
    },

    descricao: () => {

      const resultado = calculadora.valorTotal();

      $('#ct_resultados').html(`${data.tipo == 'corrida' || data.tipo == 'tabela' ? `${resultado.horas} Horas |` : ``}${data.tipo == 'tabela' ? ` ${resultado.horas_extra} Horas extra | ${dinheiro(resultado.total_extra)} Total extra |`: ``} ${dinheiro(resultado.total)} Total`);

    },
  },

  input: {

    texto: (value, type) => {
  
      data[type] = $(value).val();
  
    },
    tipo: (value, type) => {
      
      value = $(value);
      value.addClass("selecionado").siblings().removeClass("selecionado");
      $("#nav_indicator").css({left: ""+value.position().left+"px",width: ""+value.width()+"px"});
  
      data['tipo'] = type;

      minuta.load.diarias();
  
      const $valorHora = $('#valorhora').parent();
      const $minHora = $('#minhora').parent();
      const $tabela = $('#tabela').parent();
    
      if ( type == 'tabela' ) {
  
        $tabela.css({display: 'flex'});
        $valorHora.css({display: 'none'});
        $minHora.css({display: 'none'});
    
      }else if ( type == 'corrida' ) {
        
        $tabela.css({display: 'none'});
        $valorHora.css({display: 'flex'});
        $minHora.css({display: 'flex'});
    
      }else if ( type == 'pacote' ) {
    
        $valorHora.css({display: 'none'});
        $minHora.css({display: 'none'});
        $tabela.css({display: 'none'});
        
      }
      
    },
    valor: (value, type) => {
      
      data.valor[type] = $(value).val();
      minuta.load.diarias();
  
    }
    
  },

};