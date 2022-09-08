const app = {

    gerar: {
      jobs: function(){
          $('#ct_jobs').html('');

          let array = [];

          data.forEach((element) => {
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
                      <div style="position: absolute;right: 20px;text-align: right;">
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

        data.forEach((element) => {
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
                    <div style="position: absolute;right: 20px;text-align: right;">
                      <h4>R$ 100,00</h4>
                      <p>`+a.diarias.length+` Diarias</p>
                    </div>
                  </div>`;

          $('#ct_completos').append(el);

        });
      },
    },

    inputPagamento: function(el, job){
      data[job].pagamento = $(el).is(":checked");
      app.abaInicio.gerar.jobs();
      app.abaInicio.gerar.completos();
    },      
    
    inputNotaFiscal: function(el, job){
      data[job].notaFiscal = $(el).is(":checked");
      app.abaInicio.gerar.notaFiscal(false);
    }

}



