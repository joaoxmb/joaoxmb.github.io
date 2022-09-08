const data = [
  
  {
    id: 0,
    vencimento: '20/08/2003',
    pagamento: true,
    notaFiscal: false,
    tipo: 1, // 0 = progressiva, 1 = corrida, 2 = pacote
    produtora: 'Santeria',
    solicitante: 'Manuela Tossi',
    job: 'Samsung',
    valorHora: 45,
    minimoDeHoras: 10,
    diarias: [
        {
          inicio: '2022-09-21T10:00',
          horas: 15,
          ocorrencia: 'Montagem',
        },
        {
          inicio: '2022-09-07T07:00',
          horas: 10,
          ocorrencia: 'Retiradaa',
        },
    ],
  },
  {
    id: 1,
    vencimento: '20/08/2003',
    pagamento: false,
    notaFiscal: true,
    tipo: 0, // 0 = progressiva, 1 = corrida, 2 = pacote
    produtora: 'O2 Filmes',
    solicitante: 'Débora Branco',
    job: 'Bradesco',
    valorHora: 45,
    minimoDeHoras: 10,
    diarias: [
        {},
        {},
        {},          
      ],
  },

];