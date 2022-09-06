let app = {

  data: [
  
    {
      id: 0,
      vencimento: '20/08/2003',
      pagamento: true,
      notaFiscal: false,
      tipo: 0, // 0 = progressiva, 1 = corrida, 2 = pacote
      produtora: 'Santeria',
      solicitante: 'Manuela Tossi',
      job: 'Samsung',
      valorHora: 45,
      minimoDeHoras: 10,
      diarias: [
          {},
          {},
      ],
    },
    {
      id: 1,
      vencimento: '20/08/2003',
      pagamento: false,
      notaFiscal: true,
      tipo: 0, // 0 = progressiva, 1 = corrida, 2 = pacote
      produtora: 'O2 Filmes',
      solicitante: 'Débora Branco',
      job: 'Bradesco',
      valorHora: 45,
      minimoDeHoras: 10,
      diarias: [
          {},
          {},
          {},          
        ],
    },

  ],
  
  abaInicio: {

    gerar: {
      jobs: function(){
          $('#ct_jobs').html('');

          let array = [];

          app.data.forEach((element) => {
            if(element.pagamento == false){
              array.push(element);
            }
          });

          
          array.forEach((a,b,c) => {

            let el = `<div class="item">

                        `+(a.pagamento == true ? '<input type="checkbox" onclick="app.abaInicio.inputPagamento(this,'+a.id+');" checked/>' : '<input type="checkbox" onclick="app.abaInicio.inputPagamento(this,'+a.id+');"/>')+`


                      <div style="margin-left: 10px;">
                        <h4>`+a.job+`</h4>
                        
                        <div style="display: flex;align-items: center;">
                          <div style="background: url(./images/pessoa-icon.svg) no-repeat;width: 15px;height: 15px;background-size: cover;"></div>
                          <p style="margin-left: 5px;">`+a.solicitante+`</p> 
                        </div>
                        
                      </div>
                      <div style="position: absolute;right: 20px;text-align: center;">
                        <h4>R$ 100,00</h4>
                        <p>`+a.diarias.length+` Diarias</p>
                      </div>
                    </div>`;

            $('#ct_jobs').append(el);

          });
      },

      completos: function(){
        $('#ct_completos').html('');

        let array = [];

        app.data.forEach((element) => {
          if(element.pagamento == true){
            array.push(element);
          }
        });

        
        array.forEach((a,b,c) => {

          let el = `<div class="item">

                      `+(a.pagamento == true ? '<input type="checkbox" onclick="app.abaInicio.inputPagamento(this,'+a.id+');" checked/>' : '<input type="checkbox" onclick="app.abaInicio.inputPagamento(this,'+a.id+');"/>')+`

                    <div style="margin-left: 10px;">
                      <h4>`+a.job+`</h4>
                      <p>Produtora: `+a.produtora+`</p> 
                    </div>
                    <div style="position: absolute;right: 20px;text-align: center;">
                      <h4>R$ 100,00</h4>
                      <p>`+a.diarias.length+` Diarias</p>
                    </div>
                  </div>`;

          $('#ct_completos').append(el);

        });
      },
    },

    inputPagamento: function(el, job){
      app.data[job].pagamento = $(el).is(":checked");
      app.abaInicio.gerar.jobs();
      app.abaInicio.gerar.completos();
    },      
    
    inputNotaFiscal: function(el, job){
      app.data[job].notaFiscal = $(el).is(":checked");
      app.abaInicio.gerar.notaFiscal(false);
    }

  },

  abaEditor: {
    
    data: null,

    abrir: function(id){

     this.data = app.data[id];

      $('#aba_editor').css({'top': '100%','display': 'block'});
      $('#aba_job').css({transform: 'translate(-50%, -0%) scale(0.93)',filter: 'brightness(0.85)',top: 'calc(0% + 30px)'});
      $('#aba_inicio').css({transform: 'translate(-50%, -0%) scale(0.87)',filter: 'brightness(0.8)'});

      setTimeout(function() {
        $('#aba_editor').css({'top': 'calc(0% + 70px)','display': 'block'});
      }, 100);
    },

    fechar: function(){

      $('#aba_editor').css({'top': '100%'});
      $('#aba_inicio').css({transform: 'translate(-50%, -0%) scale(0.93)',filter: 'brightness(0.85)'});
      $('#aba_job').css({'top': 'calc(0% + 40px)','display': 'block',transform: 'translate(-50%, -0%)',filter: 'none'});

      setTimeout(function() {
        $('#aba_editor').css('display', 'none');
      }, 200);

    },
    
    inputTipo: function(el){
        let $el = $(el)
        $el.addClass("selecionado").siblings().removeClass("selecionado");
        $("#nav_indicator").css({left: ""+$el.position().left+"px",width: ""+$el.width()+"px"});

        app.data.tipo = $el.attr('data-tipo')*1;
    },

  },

  abaJob: {

    data: null,

    abrir: function(id){

     this.data = app.data[id];

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

  },

}



