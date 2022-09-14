const app = {

  data:{

    obj: [],

    script: 'https://script.google.com/macros/s/AKfycbw3ay8hWXZw8ar3jJkVI2le1FuUZKylqYvQZf6WI9Uy4HsKWkqekQcFT-aQTNelmKqe-w/exec',
    
    load: () =>{

      $.getJSON((app.data.script+'?action=read'), (json) => {
        
        app.data.obj = json;
        app.loadImages();
        
      });

    },

  },

  loadImages: () =>{

    $('#list').html('');

    app.data.obj.forEach((a,b) => {
      
      let el = `<div class="item">
                  <div class="item-body">
                    <div class="infos">
                      <div>
                        <h4 class="desc">${a['2']}</h4>
                        <p class="data">${moment(new Date(a['3'])).format('DD/MM/YYYY')}</p>
                      </div>

                      <div>
                        
                      </div>
                    </div>

                    <img class="image" src="${a['1']}"/>
                  </div>
                </div>`;
      $('#list').append(el);

    });


  },



}