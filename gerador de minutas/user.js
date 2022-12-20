let USER;
const userLocalStorage = () => {
  const userData = localStorage.getItem('user-cnpj-infos');
  if( userData != null ){
    USER = JSON.parse(atob(userData));
  }else{
    window.location.href = `/user/form.html`;
  }
};
userLocalStorage();










