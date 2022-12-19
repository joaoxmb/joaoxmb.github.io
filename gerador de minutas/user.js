




const pegarUser = $.ajax({
  async: true,
  url: 'https://www.receitaws.com.br/v1/cnpj/' + 43717567000196 + '',
  type: 'GET',
  dataType: 'jsonp',
  success: ( user ) => {
    userData = user;
    alert(user)
  }
});

let userData = pegarUser;
