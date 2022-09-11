const app = {

    gerar: {
      jobs: function(){
          $('#ct_jobs').html('');

          const objeto = [];

          data.forEach((a,b)=>{
            console.log(moment(a.diarias[(a.diarias.length-1)].inicio).format('MM'));
          });
          
          data.sort((a,b)=> {return new Date(a.diarias[(a.diarias.length-1)].inicio)-new Date(b.diarias[(b.diarias.length-1)].inicio);}).forEach((a,b,c) => {

            let el = `<div class="item">

                        `+(a.pagamento == true ? '<input type="checkbox" data-estilo="dot" onclick="app.inputPagamento(this,'+a.id+');" checked/>' : '<input type="checkbox" data-estilo="dot" onclick="app.inputPagamento(this,'+a.id+');"/>')+`


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
    },

    inputPagamento: function(el, job){
      
      setTimeout(() => {
        data[job].pagamento = $(el).is(":checked");
        app.gerar.jobs();    
      }, 150);

    },      
    

}



