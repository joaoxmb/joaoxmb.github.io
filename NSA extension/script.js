function print(element){
    html2canvas(document.querySelector(element), {
        scale: 1
    }).then(canvas => {
    
        canvas.toBlob(function(blob) {
            var formData = new FormData();
            formData.append("image", blob);
          
             $.ajax({
              url: "https://api.imgur.com/3/image",
              type: "POST",
              datatype: "json",
              headers: {
                "Authorization": "Client-ID aca6d2502f5bfd8"
              },
              data: formData,
              success: function(response) {
                // console.log(response);
                var photo = response.data.link;
                var photo_hash = response.data.deletehash;
          
                // console.log(photo);
    
                $.getJSON(scriptGoogle+`?action=upload&url=${photo}&desc=${document.querySelectorAll('header')[1].querySelectorAll('span')[0].innerText}`)
    
              },
              cache: false,
              contentType: false,
              processData: false
            });
    
        });
    
    
    
    });
}

let scriptGoogle = 'https://script.google.com/macros/s/AKfycbw3ay8hWXZw8ar3jJkVI2le1FuUZKylqYvQZf6WI9Uy4HsKWkqekQcFT-aQTNelmKqe-w/exec';

// let time;
let time2;

let tamanho = 0;

let intervalo;

if(window.location.href == 'https://web.whatsapp.com/'){

    intervalo = setInterval(()=>{

        if(document.querySelector('#pane-side') == null){
            //nulo
        }else{
            clearInterval(intervalo);
            
            $('div#side').click(()=>{
   
                // clearInterval(time);
                // time = setInterval(()=>{
                //     print('div[aria-label="Lista de mensagens. Pressione a seta para direita em uma mensagem para abrir o menu da mensagem."]');
                //     clearInterval(time);
                // },3000);


                let $scrollEl = $('div[data-testid="conversation-panel-messages"]')

                $scrollEl.off();
                $scrollEl.scroll(()=>{
                    
                    let height = document.querySelector('div[aria-label="Lista de mensagens. Pressione a seta para direita em uma mensagem para abrir o menu da mensagem."]').offsetHeight;

                    clearInterval(time2);
                    time2 = setInterval(()=>{

                        if(height == tamanho){

                            tamanho = height;

                        }else{
                            
                            tamanho = height;
                            print('div[aria-label="Lista de mensagens. Pressione a seta para direita em uma mensagem para abrir o menu da mensagem."]');

                        }

                        clearInterval(time2);
                    },2000);

                });


            });

        }

    }, 1000);


}

