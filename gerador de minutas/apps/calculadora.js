const calculadora = {

  valorPorHora: ( horas ) =>{
    if( data.tipo == 'tabela' ) {
  
      const use_tabela = tabela.find(e => e.id == data.valor.tabela);
  
      horas = Math.max(horas, use_tabela.valores[0].horas);
      return use_tabela.valores.find(e => e.horas == horas).valor;
  
    }else if( data.tipo == 'corrida' ){
  
      horas = Math.max(horas, data.valor.minimoDeHoras);
      return horas * data.valor.valorHora;
  
    }
  },

  valorTotal: () => {

    let horas = 0;
    let horas_extra = 0;
    let total_extra = 0;
    let total = 0;

    data.diarias.forEach((value) => {

      horas += value.horas; // total horas

      if( data.tipo == 'tabela' ){

        const use_tabela = tabela.find(e => e.id == data.valor.tabela);

        horas_extra += value.horas - use_tabela.valores[0].horas;
        total_extra += calculadora.valorPorHora(value.horas) - use_tabela.valores[0].valor;

      }
      if( data.tipo != 'pacote'){

        total += calculadora.valorPorHora(value.horas);

      }else{
        total += value.valor||0;
      }

    });

    return {horas,horas_extra,total_extra,total}
  },

};