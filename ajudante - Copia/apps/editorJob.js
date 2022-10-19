const editorJob = {

  dataUtilizada: {
    id: 0,
    objeto: {},
    tipo: '',
  },

  abrir: function(id,tipo){

    this.dataUtilizada.id = id;
    this.dataUtilizada.tipo = tipo;



    if(tipo == 'criar'){

      this.dataUtilizada.objeto = {
        id: (data.length),
        diarias: [],
        job: '',
        minimoDeHoras: 10,
        notaFiscal: false,
        obs: '',
        pagamento: false,
        produtora: '',
        solicitante: '',
        tipo: 0,
        valorHora: 45,
        vencimento: '',
      }

      $('#in_job,#in_produtora,#in_solicitante').val('');

    }else if(tipo == 'abrir'){

      this.dataUtilizada.objeto = structuredClone(data[id]);

      $('#in_job').val(this.dataUtilizada.objeto.job);
      $('#in_produtora').val(this.dataUtilizada.objeto.produtora);
      $('#in_solicitante').val(this.dataUtilizada.objeto.solicitante);
      this.loadMinuta();

    }

                    $('#aba_job').css({'top': '100%','display': 'block'});
                    $('#aba_inicio').css({transform: 'translate(-50%, -0%) scale(0.93)',filter: 'brightness(0.85)'});
                    $('body').css({background: '#231f20'});

                    setTimeout(function() {
                      $('#aba_job').css({'top': 'calc(0% + 40px)','display': 'block'});
                    }, 100);
    
    },

  fechar: function(){

    $('#aba_job').css({'top': '100%'});
    $('#aba_inicio').css({transform: 'translate(-50%, -0%) scale(1)',filter: 'brightness(1)'});
    $('body').css({background: ''});

    setTimeout(function() {
      $('#aba_job').css('display', 'none');
    }, 200);

  },

  loadMinuta: function(){

    $('#aba_job #ct_minuta .conteudo').html('');

    let mHora = data[this.dataUtilizada.id].minimoDeHoras,
        vHora = data[this.dataUtilizada.id].valorHora,
        tipo = data[this.dataUtilizada.id].tipo;

    data[this.dataUtilizada.id].diarias.sort((a,b)=> {return new Date(a.inicio)-new Date(b.inicio);}).forEach((a,b)=>{

      let element = `<div class="item">
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

    $('#aba_job #ct_minuta .conteudo').append(element);

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

    // $('#aba_editor #ct_resultados').text(
    //   tipo == 0 ? `

    //     ${resultados.horas} Horas | 
    //     ${resultados.horasExtra} Horas Extra |
    //     ${resultados.totalExtra.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})} Total Extra |
    //     ${resultados.total.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})} Total

    //   `: tipo == 1 ? `
      
    //   ${resultados.horas} Horas | 
    //   ${resultados.total.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})} Total

    //   ` : `
      
    //   ${resultados.total.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})} Total

    //   `
    // );

  },
    
}
