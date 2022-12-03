const app = {

  categorias: [
  {
    "nome": "Geografia",
    "foto": "https://i.imgur.com/VOupnR8.png",
    "items": [
      {
        "nome": "Filtro grafico 1",
        "foto": "https://i.imgur.com/iF3I4rk.png",
        "video": "",
        "descricao": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi euismod iaculis fermentum. Donec eget nulla nunc. Maecenas nec posuere lectus, sed ullamcorper eros. Pellentesque tincidunt nisi risus, eget condimentum lorem commodo vel. Ut massa risus, volutpat vel nisl a, mattis vehicula turpis. Morbi dictum justo nisi, ut placerat neque sollicitudin quis. Donec aliquam dictum interdum. Donec ante diam, scelerisque nec orci vitae, finibus euismod quam."
      },
      {
        "nome": "geografia filtro 2",
        "foto": "https://i.imgur.com/I3Vprlo.png",
        "video": "",
        "descricao": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi euismod iaculis fermentum. Donec eget nulla nunc. Maecenas nec posuere lectus, sed ullamcorper eros. Pellentesque tincidunt nisi risus, eget condimentum lorem commodo vel. Ut massa risus, volutpat vel nisl a, mattis vehicula turpis. Morbi dictum justo nisi, ut placerat neque sollicitudin quis. Donec aliquam dictum interdum. Donec ante diam, scelerisque nec orci vitae, finibus euismod quam."
      }
    ]
  },
  {
    "nome": "Matemática",
    "foto": "https://i.imgur.com/tzAtzmY.png",
    "items": [
      {
        "nome": "Mate filtro 1",
        "foto": "https://i.imgur.com/QuOdbEc.png",
        "video": "",
        "descricao": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi euismod iaculis fermentum. Donec eget nulla nunc. Maecenas nec posuere lectus, sed ullamcorper eros. Pellentesque tincidunt nisi risus, eget condimentum lorem commodo vel. Ut massa risus, volutpat vel nisl a, mattis vehicula turpis. Morbi dictum justo nisi, ut placerat neque sollicitudin quis. Donec aliquam dictum interdum. Donec ante diam, scelerisque nec orci vitae, finibus euismod quam."
      },
      {
        "nome": "matematica filtro 2",
        "foto": "https://i.imgur.com/Kaa9LDk.png",
        "video": "",
        "descricao": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi euismod iaculis fermentum. Donec eget nulla nunc. Maecenas nec posuere lectus, sed ullamcorper eros. Pellentesque tincidunt nisi risus, eget condimentum lorem commodo vel. Ut massa risus, volutpat vel nisl a, mattis vehicula turpis. Morbi dictum justo nisi, ut placerat neque sollicitudin quis. Donec aliquam dictum interdum. Donec ante diam, scelerisque nec orci vitae, finibus euismod quam."
      }
    ]
  },
  {
    "nome": "Automação",
    "foto": "https://i.imgur.com/0K5W9Ew.jpg",
    "items": [
      {
        "nome": "Filtro macao 1",
        "foto": "https://i.imgur.com/eimti6s.png",
        "video": "",
        "descricao": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi euismod iaculis fermentum. Donec eget nulla nunc. Maecenas nec posuere lectus, sed ullamcorper eros. Pellentesque tincidunt nisi risus, eget condimentum lorem commodo vel. Ut massa risus, volutpat vel nisl a, mattis vehicula turpis. Morbi dictum justo nisi, ut placerat neque sollicitudin quis. Donec aliquam dictum interdum. Donec ante diam, scelerisque nec orci vitae, finibus euismod quam."
      },
      {
        "nome": "Filtro automacao 2",
        "foto": "https://i.imgur.com/ydwAQAY.png",
        "video": "",
        "descricao": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi euismod iaculis fermentum. Donec eget nulla nunc. Maecenas nec posuere lectus, sed ullamcorper eros. Pellentesque tincidunt nisi risus, eget condimentum lorem commodo vel. Ut massa risus, volutpat vel nisl a, mattis vehicula turpis. Morbi dictum justo nisi, ut placerat neque sollicitudin quis. Donec aliquam dictum interdum. Donec ante diam, scelerisque nec orci vitae, finibus euismod quam."
      }
    ]
  }
],

  slide: {

    criar: function(element, config){

      let normalConfig = {center: false,loop: false,startPosition: 0,autoWidth: false,margin: 22,items: 1,dots: false,};
      $(element).owlCarousel(config != '' ?  Object.assign(normalConfig, config) : normalConfig);

    },

    destruir: function(element){
      $(element).owlCarousel('destroy');
    },

  },

  hash: {

    setar: function(string){
      window.location.hash = string;
    },

    remover: function(){
      window.location.hash = '';
    },

    abrir: function(){

      const hash  = window.location.hash.replace('#', ''),
            acao  = hash.split('=')[0],
            valor = hash.split('=')[1];

      if(acao == 'efeito'){
        const categoria = (valor.split(',')[0]*1),
              efeito    = (valor.split(',')[1]*1);
        app.abaFiltro.abrir(categoria,efeito);
      }

      if(acao == 'buscar'){
        app.abaBuscar.abrir();
        app.abaBuscar.procurar(valor);
        $('#abaBuscar #buscador').val(valor);
      }

      if(acao == 'categoria'){
        app.abaInicio.abrirCategorias(valor);
      }

    }

  },

  abaInicio: {

    gerarCategorias: function(){

      $('#abainicio #categorias .slide').html('');
      app.categorias.forEach(function (a,b,c){

        let el = '<div onclick="app.abaInicio.abrirCategorias('+b+')" style="display: flex;align-items: center;padding: 20px 20px;background: white;border-radius: 30px;">'+
                    '<div style="width: 55px;height: 55px;position: relative;">'+
                        '<div style="background: url('+a.foto+');background-position: center;background-size: cover;width: 100%;height: 100%;filter: blur(25px);transform: translate3d(0, 0, 0);position: absolute;border-radius: 20px;top: 10px;opacity: 0.4;"></div>'+
                        '<div style="background: url('+a.foto+');background-position: center;background-size: cover;width: 100%;height: 100%;position: absolute;border-radius: 20px;"></div>'+
                    '</div>'+
                    '<div style="margin-left: 20px;">'+
                      '<h4 style="font-weight: bold;">'+a.nome+'</h4>'+
                      '<p>'+a.items.length+' itens.</p>'+
                    '</div>'+
                  '</div>';
        $('#abainicio #categorias .slide').append(el);

      });

      app.slide.criar($('#abainicio #categorias .slide'));

    },

    gerarDestaque: function(){

      let items = [];

      app.slide.destruir($('#abainicio #destaque .slide'));

      app.categorias.forEach(function (a,b,c){
        a.items.forEach(function (x,y,z){

          x.categoria = b;
          x.id = y;
          items.push(x);

        });
      });

      items.forEach(a => {

        let el = '<div style="background: white;border-radius: 30px;padding: 20px;" onclick="app.abaFiltro.abrir('+a.categoria+','+a.id+')">'+
                    '<div style="width: 100%;height: 15em;position: relative;">'+
                        '<div style="background: url('+a.foto+');background-position: center;background-size: cover;width: 100%;height: 100%;filter: blur(25px);transform: translate3d(0, 0, 0);position: absolute;border-radius: 30px;top: 10px;opacity: 0.4;"></div>'+
                        '<div style="background: url('+a.foto+');background-position: center;background-size: cover;width: 100%;height: 100%;position: absolute;border-radius: 30px;"></div>'+
                    '</div>'+
                    '<div style="padding: 20px 5px 0 5px"> <h3 style="font-weight: bold;">'+a.nome+'</h3> <p>'+app.categorias[a.categoria].nome+'</p> </div>'+
                 '</div>';


        $('#abainicio #destaque .slide').append(el);

      });

      app.slide.criar($('#abainicio #destaque .slide'));

    },

    abrirCategorias: function(cat){
      app.abaBuscar.abrir();
      app.hash.setar('categoria='+cat);
      setTimeout(()=>{app.abaBuscar.itemsCategoria(cat);},300);
    },

  },

  abaFiltro: {

    abrir: function(cat, id){

      let item = app.categorias[cat].items[id];

      $('#abafiltro').css({'top': '100%','transition': 'all 0.3s','display': 'block','opacity': '0'});

      setTimeout(function() {
        $('#abafiltro').css({'top': '0%','transition': 'all 0.3s','display': 'block','opacity': '1'});
      }, 100);

      console.log(item);

      app.hash.setar('efeito='+cat+','+id+'');

      $('#abafiltro #foto .image').css('background', 'url('+item.foto+')');
      $('#abafiltro #foto .blur').css('background', 'url('+item.foto+')');
      $('#abafiltro #nome').text(item.nome);
      $('#abafiltro #categoria').text(app.categorias[item.categoria].nome);
      $('#abafiltro #descricao').text(item.descricao);


    },

    fechar: function(){

      app.hash.remover();

      $('#abafiltro').css({'top': '100%','transition': 'all 0.3s','opacity': '0'});
      setTimeout(function() {
        $('#abafiltro').css('display', 'none');
      }, 200);

    },

  },

  abaBuscar: {

    abrir: function(){

      $('#abaBuscar').css({top: '100%',transition: 'all 0.3s',display: 'block',opacity: '0'});
      setTimeout(function() {
        $('#abaBuscar').css({top: '0%',transition: 'all 0.3s',display: 'block',opacity: '1'});
      }, 100);



    },

    fechar: function(){

      app.hash.remover();
      
      $('#abaBuscar').css({'top': '100%','transition': 'all 0.5s','opacity': '0'});
      setTimeout(function() {
        $('#abaBuscar').css('display', 'none');
        $('#abaBuscar .conteudo').html('');
      }, 200);

    },

    time: null,
    procurar: function(string){

      clearTimeout(app.abaBuscar.time);
      app.abaBuscar.time = setTimeout(() =>{

        app.hash.setar('buscar='+string);
        app.abaBuscar.pesquisaDados(string);
      }, 400)
      
    },

    pesquisaDados: function(string){

      let chave = string.toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s/g, "");
      let items = [];

      app.categorias.forEach(function(a,x){
          if(chave.length > 0 ){
            if (a.nome.toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s/g, "").search(chave) > -1) {
                items.push({tipo: 'categoria',nome: (a.nome), foto: (a.foto), items: (a.items), categoria: (x)});
              }
              a.items.forEach(function(b,c){
                if (b.nome.toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s/g, "").search(chave) > -1) {
                  items.push({...b, tipo: 'item', categoria: (x), id: (c)});
                }
              });
          }
      });



      $('#abaBuscar .conteudo').html('');
      items.forEach(function (a,b){

        if(a.tipo == 'item'){


          let html = '<div onclick="app.abaFiltro.abrir('+a.categoria+','+a.id+')" style="transform: translateY(-15px);opacity: 0;transition: 0.3s all;background: white;border-radius: 30px;padding: 20px;margin-bottom: 15px;display: flex;align-items: center;">'+
                        '<div style="width: 90px;height: 120px;position: relative;margin-right: 15px;">'+
                          '<div style="background: url('+a.foto+');background-position: center;background-size: cover;width: 100%;height: 100%;filter: blur(25px);transform: translate3d(0, 0, 0);position: absolute;border-radius: 20px;top: 10px;opacity: 0.4;"></div>'+
                          '<div style="background: url('+a.foto+');background-position: center;background-size: cover;width: 100%;height: 100%;position: absolute;border-radius: 20px;"></div>'+
                        '</div>'+
                        '<div style="width: calc(100% - 105px);">'+
                          '<h4 style="font-weight: bold;">'+a.nome+'</h4>'+
                          '<p style="margin-bottom: 10px;">'+app.categorias[a.categoria].nome+'</p>'+
                          '<p>'+a.descricao.substring(0,80)+'</p>'+
                        '</div>'+
                     '</div>';
          $('#abaBuscar .conteudo').append(html);


        }
        if(a.tipo == 'categoria'){


          let items = [];
          a.items.forEach(function(x,y,z){
            items.push(
              '<div style="background: white;border-radius: 30px;padding: 20px;" onclick="app.abaFiltro.abrir('+x.categoria+','+x.id+')">'+
                    '<div style="width: 100%;height: 15em;position: relative;">'+
                        '<div style="background: url('+x.foto+');background-position: center;background-size: cover;width: 100%;height: 100%;filter: blur(25px);transform: translate3d(0, 0, 0);position: absolute;border-radius: 30px;top: 10px;opacity: 0.4;"></div>'+
                        '<div style="background: url('+x.foto+');background-position: center;background-size: cover;width: 100%;height: 100%;position: absolute;border-radius: 30px;"></div>'+
                    '</div>'+
                    '<div style="padding: 20px 5px 0 5px;"> <h3 style="font-weight: bold;">'+x.nome+'</h3> </div>'+
                 '</div>'
              );
          });

          let html = '<div class="'+a.nome+'" style="transform: translateY(-15px);opacity: 0;transition: 0.3s all;margin-bottom: 30px;">'+
                        '<div style="margin: 0 0 15px 20px;">'+
                          '<h2 style="font-weight: bold;">'+a.nome+'</h2>'+
                          '<h4 style="color: #949398;">'+a.items.length+' itens</h4>'+
                        '</div>'+
                        '<div class="slide owl-carousel" style="width: 60%;">'+items.join('')+'</div>'+
                     '</div>';
          $('#abaBuscar .conteudo').append(html);

          app.slide.criar($('#abaBuscar .conteudo').find('.'+a.nome).find('.slide'));


        }

      });
      
      app.abaBuscar.animation();
    },

    itemsIniciais: function (){

      $('#abaBuscar .conteudo').html('');

      app.categorias.forEach((a,b) => {

        let title = '<div style="transform: translateY(-15px);opacity: 0;transition: 0.3s all;"><h2 style="margin: 0 0 0 20px;font-weight: bold;">'+a.nome+'</h2><h4 style="color: #949398;margin: 0 0 15px 20px;">'+a.items.length+' itens</h4></div>';
        $('#abaBuscar .conteudo').append(title);

        a.items.forEach((c,d) =>{
            let html = '<div onclick="app.abaFiltro.abrir('+b+','+d+')" style="transform: translateY(-15px);opacity: 0;transition: 0.3s all;background: white;border-radius: 30px;padding: 20px;margin-bottom: 15px;display: flex;align-items: center;">'+
                        '<div style="width: 90px;height: 120px;position: relative;margin-right: 15px;">'+
                          '<div style="background: url('+c.foto+');background-position: center;background-size: cover;width: 100%;height: 100%;filter: blur(25px);transform: translate3d(0, 0, 0);position: absolute;border-radius: 20px;top: 10px;opacity: 0.4;"></div>'+
                          '<div style="background: url('+c.foto+');background-position: center;background-size: cover;width: 100%;height: 100%;position: absolute;border-radius: 20px;"></div>'+
                        '</div>'+
                        '<div style="width: calc(100% - 105px);">'+
                          '<h4 style="font-weight: bold;">'+c.nome+'</h4>'+
                          '<p style="margin-bottom: 10px;">'+a.nome+'</p>'+
                          '<p>'+c.descricao.substring(0,80)+'</p>'+
                        '</div>'+
                     '</div>';
          
             $('#abaBuscar .conteudo').append(html);
        });

      });

      app.abaBuscar.animation();

    },

    itemsCategoria: function(cat){

      $('#abaBuscar .conteudo').html('');

      let title = '<div style="transform: translateY(-15px);opacity: 0;transition: 0.3s all;"><h2 style="margin: 0 0 0 20px;font-weight: bold;">'+app.categorias[cat].nome+'</h2><h4 style="color: #949398;margin: 0 0 15px 20px;">'+app.categorias[cat].items.length+' itens</h4></div>';
      $('#abaBuscar .conteudo').append(title);

      app.categorias[cat].items.forEach((c,d) =>{
            let html = '<div onclick="app.abaFiltro.abrir('+cat+','+d+')" style="transform: translateY(-15px);opacity: 0;transition: 0.3s all;background: white;border-radius: 30px;padding: 20px;margin-bottom: 15px;display: flex;align-items: center;">'+
                        '<div style="width: 90px;height: 120px;position: relative;margin-right: 15px;">'+
                          '<div style="background: url('+c.foto+');background-position: center;background-size: cover;width: 100%;height: 100%;filter: blur(25px);transform: translate3d(0, 0, 0);position: absolute;border-radius: 20px;top: 10px;opacity: 0.4;"></div>'+
                          '<div style="background: url('+c.foto+');background-position: center;background-size: cover;width: 100%;height: 100%;position: absolute;border-radius: 20px;"></div>'+
                        '</div>'+
                        '<div style="width: calc(100% - 105px);">'+
                          '<h4 style="font-weight: bold;">'+c.nome+'</h4>'+
                          '<p style="margin-bottom: 10px;">'+app.categorias[cat].nome+'</p>'+
                          '<p>'+c.descricao.substring(0,80)+'</p>'+
                        '</div>'+
                     '</div>';
          
             $('#abaBuscar .conteudo').append(html);
        });

        app.abaBuscar.animation();

    },

    animation: function(){
      let count = 0;

      let animation = setInterval(() =>{
        if(count < $('#abaBuscar .conteudo > div').length){
          $($('#abaBuscar .conteudo > div')[count]).css({opacity: 1, transform: ''});

          console.log('teste');
          count++;
        }else{
          clearInterval(animation);
        }
      }, 80);
    },

  },

};

