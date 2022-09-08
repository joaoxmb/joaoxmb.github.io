const editorJob = {

  dataUtilizada: {
    id: 0,
    objeto: {},
  },

  abrir: function(id){

     this.dataUtilizada.id = id;
     this.dataUtilizada.objeto = structuredClone(data[id]);

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
    
}
