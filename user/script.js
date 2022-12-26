let USER; 
const userLocalStorage = () => {
  const userData = localStorage.getItem('user-cnpj-infos');
  if( userData != null ){
    window.location.href = `/`;
  }else{

    const pegarUser = ( cnpj, funcao ) => {
      $.ajax({
        async: true,
        url: 'https://www.receitaws.com.br/v1/cnpj/' + cnpj + '',
        type: 'GET',
        dataType: 'jsonp',
        success: ( user ) => {

          const consultarCep = ( cep ) => {
            $.ajax({
              async: true,
              url: 'https://viacep.com.br/ws/'+cep+'/json/',
              type: 'GET',
              dataType: 'jsonp',
              success: ( cep ) => {
                user.bairro = cep.bairro;
                user.logradouro = cep.logradouro;
                user.municipio = cep.localidade;

                funcao(user); // funcao obrigatória passando dados do cnpj como parametro
              },
              error: () => {
      
              }
            });
          };

          consultarCep(user.cep.replace(/[^\d]/g, ''));
          
        },
        error: () => {
          location.reload()
        }
      });
    }
    const userBotaoContinuar = ( boolean ) => {
      const html = `
      <div class="button-continuar" onclick="userContinuar();" cor="azul">Continuar</div>
      `;
      boolean ? $('#aba-user .cadastrar-user').append(html) : $('#aba-user .cadastrar-user .button-continuar').remove();
    };

    $('input#input_user').inputmask('99.999.999/0001-99',{
      autoUnmask: true,
      onUnMask: ( maskedValue ) => {
        return maskedValue.replace(/\D/g, '');
      },
      onKeyDown: () =>{
        $('#aba-user .user-resultado').text('');
        userBotaoContinuar(false);
      },
      allowMinus: false,
      unmaskAsNumber: true,
      oncomplete: () =>{
        pegarUser($('#aba-user input#input_user').val()*1,( userData ) => {
          const resultado = ( value, cor ) => {$('#aba-user .user-resultado').text(value).attr('cor', cor);}
    
          if( userData.status == 'ERROR' ){
            resultado('Cnpj não encontrado!', 'vermelho')
            userBotaoContinuar(false);
          }else if( userData.status == 'OK' ){
            resultado(userData.nome, 'verde')
            userBotaoContinuar(true);
            USER = userData;
          }
        });
      }
    });

  }
};
userLocalStorage();

const userContinuar = () => {
  const nome = $('#input_nome').val();
  const funcao = $('#input_funcao').val();
  const drt = $('#input_drt').val();

  if( nome.length != 0 && funcao.length != 0 ){
    const criandoUserData = {
      nome: nome,
      funcao: funcao,
      drt: drt,
      resultadoCnpj: USER
    }
    localStorage.setItem('user-cnpj-infos', btoa(JSON.stringify(criandoUserData)));
    window.location.href = '/';
    console.log(criandoUserData);
  }else{
    alert('Confira se todos os campos estão preenchidos corretamentes!');
  }
  
};

