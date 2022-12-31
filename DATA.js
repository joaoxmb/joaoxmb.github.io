let DATA = {
  "tipo": "tabela",
  "produtora": "",
  "solicitante": "",
  "job": "",
  "observacao": "",
  "valor": {
    "tabela": "3",
    "valorHora": 52,
    "minimoDeHoras": 10
  },
  "diarias": [
  ]
};
const pegarDataHash = () => {
  const hash = window.location.hash.replace('#', '');
  if( hash.length != 0 ){
    DATA = JSON.parse(atob(hash));
  }
}

let timeOutSetarHash;
const setarDataHash = () => {
  clearTimeout(timeOutSetarHash);
  timeOutSetarHash = setTimeout(() => {
    window.location.hash = btoa(JSON.stringify(DATA));
  }, 1000);
}

pegarDataHash();