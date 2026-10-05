// Dados fornecidos pelo responsável e pelos materiais enviados. Não coloque senhas aqui.
window.ACADEMIA = {
  nome: 'Center Fitness',
  abertura: {
    video: 'assets/hero-clean-deadlift.mp4',
    videoCelular: 'assets/hero-clean-deadlift.mp4',
    imagemReserva: 'assets/hero-clean-deadlift-poster.jpg',
    imagemCelular: 'assets/hero-clean-deadlift-poster.jpg',
    posicao: 'center',
    intensidade: 1
  },
  animacoes: true,
  whatsapp: '5575988972274',
  telefone: '(75) 98897-2274',
  endereco: 'Rua Rosendo Lopes, 74 — Centro, Santa Luz',
  cep: '48880-000',
  crefPF: '017519-G/BA',
  crefPJ: '003231-G/BA',
  horarios: [['Segunda a sexta', '05h às 22h'], ['Sábado', '06h às 12h'], ['Domingo', '09h às 12h']],
  planos: [
    { nome:'Mensal', frase:'Seu treino como parte da rotina.', valor:85, periodo:'Um mês · segunda a sábado', grupo:'rotina', beneficios:['Aulas coletivas', 'Avaliação e treino personalizado', 'Ambiente climatizado', 'Massagem e eventos gratuitos'], destaque:true },
    { nome:'3x na semana', frase:'Três encontros com a sua evolução.', valor:75, periodo:'Três dias na semana · consulte a vigência', grupo:'rotina', beneficios:['Acesso em três dias na semana', 'Avaliação e treino personalizado', 'Aulas coletivas nos dias escolhidos', 'Massagem conforme programação'], destaque:false },
    { nome:'2x na semana', frase:'O começo que cabe no seu dia.', valor:70, periodo:'Dois dias na semana · consulte a vigência', grupo:'rotina', beneficios:['Acesso em dois dias na semana', 'Avaliação e treino personalizado', 'Aulas coletivas nos dias escolhidos', 'Massagem conforme programação'], destaque:false },
    { nome:'Trimestral', frase:'Três meses para construir constância.', valor:195, periodo:'Valor total · três meses', grupo:'longo', beneficios:['Treino de segunda a sábado', 'Aulas coletivas', 'Avaliação e treino personalizado', 'Climatização, massagem e eventos'], destaque:false },
    { nome:'Semestral', frase:'Seis meses para seguir em frente.', valor:375, periodo:'Valor total · seis meses', grupo:'longo', beneficios:['Treino de segunda a sábado', 'Aulas coletivas', 'Avaliação e treino personalizado', 'Climatização, massagem e eventos'], destaque:false },
    { nome:'Anual', frase:'Um ano de compromisso com você.', valor:735, periodo:'Valor total · um ano', grupo:'longo', beneficios:['Treino de segunda a sábado', 'Aulas coletivas', 'Avaliação e treino personalizado', 'Climatização, massagem e eventos'], destaque:true },
    { nome:'Diária', frase:'Um dia para sentir a energia Center.', valor:15, periodo:'Um dia de acesso', grupo:'avulso', beneficios:['Aulas coletivas se houver no dia', 'Ambiente climatizado', 'Massagem conforme programação'], destaque:false },
    { nome:'Semanal', frase:'Uma semana para entrar no ritmo.', valor:35, periodo:'Uma semana · segunda a sábado', grupo:'avulso', beneficios:['Aulas coletivas', 'Avaliação e treino personalizado', 'Ambiente climatizado', 'Massagem e eventos gratuitos'], destaque:false },
    { nome:'Quinzenal', frase:'Quinze dias para dar o primeiro passo.', valor:45, periodo:'Quinze dias · segunda a sábado', grupo:'avulso', beneficios:['Aulas coletivas', 'Avaliação e treino personalizado', 'Ambiente climatizado', 'Massagem e eventos gratuitos'], destaque:false }
  ],
  varzea: {
    nome: 'Várzea da Pedra',
    endereco: 'Rua Largo do Ginásio, 1 — Santaluz — Bahia',
    referencia: 'Estr. Várzea da Pedra — Santaluz, BA',
    cep: '48880-000',
    horarios: [['Segunda a sexta', '05h às 11h · 14h às 21h'], ['Sábado e domingo', 'Fechado']],
    planos: [
      {nome:'Mensal',valor:70,periodo:'Um mês',grupo:'rotina',destaque:true},
      {nome:'3x na semana',valor:60,periodo:'Três dias na semana · consulte a vigência',grupo:'rotina'},
      {nome:'Trimestral',valor:195,periodo:'Valor total · três meses',grupo:'longo'},
      {nome:'Semestral',valor:375,periodo:'Valor total · seis meses',grupo:'longo'},
      {nome:'Anual',valor:735,periodo:'Valor total · um ano',grupo:'longo',destaque:true},
      {nome:'Diária',valor:10,periodo:'Um dia de acesso',grupo:'avulso'},
      {nome:'Semanal',valor:30,periodo:'Uma semana',grupo:'avulso'},
      {nome:'Quinzenal',valor:40,periodo:'Quinze dias',grupo:'avulso'}
    ]
  },
  galeria: [
    {src:'assets/academia-panorama.webp',nome:'Seu espaço para evoluir',categoria:'musculacao'},
    {src:'assets/academia-1.webp',nome:'Bem-vindo à Center Fitness',categoria:'estrutura'},
    {src:'assets/academia-2.webp',nome:'Bicicletas e esteiras',categoria:'cardio'},
    {src:'assets/academia-5.webp',nome:'Pesos livres',categoria:'musculacao'},
    {src:'assets/academia-12.webp',nome:'Área de musculação',categoria:'musculacao'},
    {src:'assets/academia-4.webp',nome:'Acessórios para o seu treino',categoria:'estrutura'},
    {src:'assets/academia-3.webp',nome:'Halteres e equipamentos',categoria:'musculacao'},
    {src:'assets/academia-6.webp',nome:'Barras e acessórios',categoria:'musculacao'},
    {src:'assets/academia-7.webp',nome:'Máquinas de musculação',categoria:'musculacao'},
    {src:'assets/academia-8.webp',nome:'Treino de membros inferiores',categoria:'musculacao'},
    {src:'assets/academia-9.webp',nome:'Estação de treino',categoria:'musculacao'},
    {src:'assets/academia-10.webp',nome:'Estrutura de musculação',categoria:'musculacao'},
    {src:'assets/academia-11.webp',nome:'Um novo ângulo do espaço',categoria:'musculacao'},
    {src:'assets/academia-13.webp',nome:'Movimento em cada detalhe',categoria:'musculacao'}
  ]
};
