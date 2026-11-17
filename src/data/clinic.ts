/**
 * TODA a informação do site fica aqui. Os componentes só leem este arquivo.
 * Itens marcados com TODO ainda faltam (ou precisam ser confirmados com a Joana).
 * Texto entre *asteriscos* vira itálico colorido nos títulos.
 */

const WHATSAPP_NUMBER = "5521900000000"; // TODO: número real da Joana (DDD + número, com 55)

export const clinic = {
  url: "https://TODO-dominio.com.br", // TODO: domínio da Joana (o irmão dela registrou; descobrir a plataforma)
  displayName: "Joana Schultz", // TODO confirmar nome de exibição (LinkedIn: Joana Ayla Donzelli Schultz)
  fullName: "Joana Ayla Donzelli Schultz",
  firstName: "Joana",
  role: "Psicóloga",
  headline: "Psicóloga Clínica | Psicoterapeuta Corporal",
  registry: "CRP 05/00000", // TODO: número do CRP-05 (Rio de Janeiro)
  registryVerifyUrl: "https://cadastro.cfp.org.br/",
  whatsappNumber: WHATSAPP_NUMBER,
  phoneDisplay: "(21) 90000-0000", // TODO
  city: "Rio de Janeiro",
  state: "RJ",
  district: "Botafogo", // TODO: confirmar bairro quando ela fechar a sala
  address: {
    street: "", // TODO: rua e número (deixe vazio e o site mostra só bairro e cidade)
    complement: "",
    zip: "",
    lat: -22.9519, // TODO: coordenadas exatas do consultório (centro de Botafogo por enquanto)
    lng: -43.1826,
    reference: "",
  },
  hours: {
    summary: "", // TODO: ex.: "Segunda a sexta, das 8h às 18h"
    short: "",
    timeZone: "America/Sao_Paulo",
    week: [] as { day: number; opens: string; closes: string }[], // day: 0 dom ... 6 sáb
  },
  instagram: { handle: "", url: "" }, // ela não tem tempo para redes; deixar vazio
  yearsStat: { value: 20, plus: true, label: "anos de profissão" }, // "formada há mais de 20 anos" (TODO ano exato)
  seo: {
    title: "Psicóloga no Rio de Janeiro | Terapia online e presencial · Joana Schultz",
    description:
      "Psicóloga clínica e psicoterapeuta corporal no Rio de Janeiro. Psicoterapia online e presencial para adolescentes, adultos e idosos: ansiedade, trauma, burnout, depressão, luto e dependências. Agende pelo WhatsApp.",
  },
};

export const mapsLinks = {
  embed: `https://www.google.com/maps?q=${clinic.address.lat},${clinic.address.lng}&output=embed`,
  directions: `https://www.google.com/maps/dir/?api=1&destination=${clinic.address.lat},${clinic.address.lng}`,
  waze: `https://waze.com/ul?ll=${clinic.address.lat},${clinic.address.lng}&navigate=yes`,
};

export const waLink = (message: string) =>
  `https://wa.me/${clinic.whatsappNumber}?text=${encodeURIComponent(message)}`;

const hi = `Olá, ${clinic.firstName}! Vim pelo site e`;
export const messages = {
  general: `${hi} gostaria de agendar um horário para terapia.`,
  header: `${hi} gostaria de agendar uma conversa.`,
  presencial: `${hi} gostaria de agendar um horário presencial em ${clinic.district}.`,
  online: `${hi} gostaria de saber como funciona a terapia online.`,
  doubt: `${hi} tenho uma dúvida antes de agendar:`,
  mirror: `${hi} me reconheci em algumas daquelas frases e gostaria de conversar.`,
  about: `${hi} gostaria de agendar minha primeira sessão.`,
  theme: (t: string) => `${hi} me identifiquei com o tema ${t}. Gostaria de agendar um horário.`,
};

/* ------------------------------------------------------------------ */
/* Navegação                                                           */
/* ------------------------------------------------------------------ */
export const nav = [
  { id: "sobre", label: "Sobre" },
  { id: "como-ajudo", label: "Como posso ajudar", dropdown: true },
  { id: "consultorio", label: "Consultório" },
  { id: "processo", label: "Como funciona", xlOnly: true },
  { id: "duvidas", label: "Dúvidas", xlOnly: true },
];

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */
export const hero = {
  eyebrow: ["Psicologia", "Corpo e mente", "Todas as idades"],
  title: "Sua mente já entende. O corpo ainda *não relaxou.*",
  subtitle:
    "Psicoterapia para adolescentes, adultos e idosos que querem compreender o que sentem, cuidar do corpo e das emoções e alcançar mudanças concretas, com escuta cuidadosa e objetivos claros.",
  primary: "Começar meu processo",
  secondary: "Como funciona",
  scrollCue: "O que o seu corpo tenta te dizer?",
  cards: [
    { icon: "body", title: "Corpo e sistema nervoso", text: "Entenda como o seu corpo reage ao estresse.", slug: "corpo-e-sistema-nervoso" },
    { icon: "wave", title: "Ansiedade e burnout", text: "Mais calma para viver o que importa.", slug: "ansiedade-e-estresse" },
    { icon: "shield", title: "Trauma e luto", text: "Acolhimento no seu ritmo.", slug: "trauma-e-experiencias-dificeis" },
  ],
  image: {
    src: "/img/joana.png",
    alt: "Joana Schultz, psicóloga, em retrato de frente com expressão tranquila", // TODO trocar por foto mais recente
  },
};

/* ------------------------------------------------------------------ */
/* Espelho                                                             */
/* ------------------------------------------------------------------ */
export const mirror = {
  eyebrow: { number: "01", label: "Talvez seja com você" },
  title: "Talvez você se reconheça *em algumas destas frases.*",
  lines: [
    "Você já entendeu o que sente. Mas o corpo continua em alerta.",
    "O cansaço é constante, e mesmo assim desligar parece impossível.",
    "A ansiedade aparece no peito, no estômago, na garganta, antes mesmo do pensamento.",
    "Falar dos problemas ajuda, mas parece faltar algo para mudar de verdade.",
    "O que começou como alívio, no copo, no jogo, nas compras ou na comida, já pesa mais do que alivia.",
    "Você quer mudanças reais e um espaço onde a sua história seja escutada, sem pressa e sem julgamento.",
  ],
  closing:
    "Nada disso é fraqueza. O corpo aprende a se proteger, e também pode aprender a se regular, com acompanhamento e no seu ritmo.",
  cta: "Quero conversar sobre isso",
};

/* ------------------------------------------------------------------ */
/* Manifesto                                                           */
/* ------------------------------------------------------------------ */
export const manifesto = {
  label: "Manifesto",
  author: "JOANA SCHULTZ",
  text: "Mente e corpo contam a mesma história. Escutar os dois é o que abre espaço para mudar.",
  quote:
    "Assim como o sistema nervoso aprende a se proteger, ele também pode aprender a se acalmar. A gente só precisa dar a ele um novo caminho.",
  values: ["Acolher", "Compreender", "Regular", "Transformar"],
};

/* ------------------------------------------------------------------ */
/* Temas                                                               */
/* ------------------------------------------------------------------ */
export type Theme = {
  slug: string;
  icon: string;
  label: string;
  title: string; // com *itálico*
  text: string;
  cta: string;
  page: {
    h1a: string;
    h1b: string;
    intro: string;
    recognize: string[];
    paths: { title: string; text: string }[];
    approach: string[];
    faq: { q: string; a: string }[];
    metaDescription: string;
  };
};

export const themesIntro = {
  eyebrow: { number: "02", label: "Como posso ajudar" },
  title: "Um espaço para compreender o que se repete *e construir outros caminhos.*",
  text: "Cada história é única, por isso o processo é sob medida. Estes são alguns dos temas com que trabalho, no consultório e online:",
  more: {
    title: "Não encontrou o seu tema aqui?",
    text: "Não precisa explicar tudo por mensagem. Me mande um oi e vemos juntos o melhor caminho.",
    cta: "Conversar pelo WhatsApp",
  },
};

export const themes: Theme[] = [
  {
    slug: "corpo-e-sistema-nervoso",
    icon: "body",
    label: "Corpo e sistema nervoso",
    title: "Por que o corpo reage *antes de eu conseguir pensar?*",
    text: "Compreender como o seu sistema nervoso responde ao estresse e às experiências difíceis, e trabalhar essa resposta também pelo corpo, além da conversa.",
    cta: "Conversar sobre isso",
    page: {
      h1a: "O corpo reage primeiro.",
      h1b: "E a cabeça tenta alcançar.",
      intro:
        "Taquicardia, aperto no peito, tensão nos ombros, sono leve. Muitas vezes o corpo responde a algo que a mente já superou, ou ainda não conseguiu nomear. Na terapia, esse caminho pode ser olhado com cuidado, no seu ritmo.",
      recognize: [
        "Seu corpo parece estar sempre em alerta, mesmo quando está tudo bem.",
        "Você sente a emoção no corpo antes de conseguir explicá-la.",
        "Já tentou relaxar e não conseguiu desligar.",
        "Conversar ajuda, mas algo no corpo continua igual.",
      ],
      paths: [
        { title: "Compreender o sistema nervoso", text: "Explicações simples sobre como o corpo responde ao estresse, para que as reações façam sentido." },
        { title: "Trabalhar também pelo corpo", text: "Recursos que envolvem sensações, respiração e atenção ao corpo, de forma gradual e segura." },
        { title: "Levar para o dia a dia", text: "Exercícios curtos que você pratica fora da sessão, para sustentar o que foi construído." },
      ],
      approach: [
        "Meu trabalho une a escuta da psicoterapia a uma abordagem corporal, que considera o papel do sistema nervoso na forma como sentimos e reagimos.", // TODO confirmar nome da abordagem (Somatic Experiencing)
        "Vamos no ritmo do seu corpo: nada é forçado, e você decide o quanto aprofundar em cada momento.",
      ],
      faq: [
        { q: "Preciso entender de neurociência?", a: "Não. Eu explico de forma simples e prática, e você leva só o que for útil para o seu dia a dia." },
        { q: "É só conversa ou tem exercícios?", a: "Os dois. Há espaço para conversar e também para exercícios de regulação, que adaptamos ao seu momento." },
        { q: "Funciona online?", a: "Sim. Muitos dos recursos funcionam bem por videochamada, com a mesma ética e o mesmo sigilo do presencial." },
      ],
      metaDescription: "Terapia que une escuta, corpo e sistema nervoso para quem sente o estresse no corpo. Online e presencial no Rio de Janeiro.",
    },
  },
  {
    slug: "ansiedade-e-estresse",
    icon: "wave",
    label: "Ansiedade e burnout",
    title: "E se a ansiedade estiver *no corpo antes de estar na cabeça?*",
    text: "Reconhecer o que dispara a ansiedade, o estresse e o esgotamento (burnout) e construir, aos poucos, um ritmo mais seu, com mais leveza para viver o que importa.",
    cta: "Conversar sobre isso",
    page: {
      h1a: "A ansiedade não pede desculpas.",
      h1b: "Ela pede para ser entendida.",
      intro:
        "Pensamentos que não param, antecipação do pior, corpo tenso. A ansiedade cansa, e muita gente aprende a conviver com ela sem perceber o quanto pesa. É possível olhar para ela com mais clareza e menos medo.",
      recognize: [
        "Você sofre por antecipação com o que ainda nem aconteceu.",
        "O corpo acelera sem motivo aparente.",
        "É difícil descansar sem culpa ou sem pensar no que falta fazer.",
        "A rotina é puxada e você não lembra a última vez que desacelerou de verdade.",
      ],
      paths: [
        { title: "Entender o que dispara", text: "Reconhecer situações, pensamentos e sinais do corpo que alimentam a ansiedade." },
        { title: "Ferramentas de regulação", text: "Exercícios práticos para baixar o alerta no momento em que ele aparece." },
        { title: "Um ritmo mais seu", text: "Rever limites, rotina e exigências, para viver com menos tensão." },
      ],
      approach: [
        "Combino conversa, psicoeducação e exercícios de autorregulação. Você aprende o que acontece no seu corpo e ganha recursos para usar no dia a dia.",
        "Trabalho com objetivos claros: definimos juntos o que você quer mudar e revisamos o caminho ao longo do processo.",
      ],
      faq: [
        { q: "Em quanto tempo vou me sentir melhor?", a: "Não existe prazo fixo e eu não faço promessas de tempo. Cada processo é único; vamos revisando o caminho juntos." },
        { q: "Precisa de medicação?", a: "A avaliação de medicação cabe a um médico. Quando fizer sentido, converso com você sobre esse acompanhamento." },
        { q: "Posso começar online?", a: "Sim. A maior parte dos meus atendimentos particulares é online." },
      ],
      metaDescription: "Terapia para ansiedade e estresse, com foco em corpo, regulação e objetivos claros. Online e presencial no Rio de Janeiro.",
    },
  },
  {
    slug: "trauma-e-experiencias-dificeis",
    icon: "shield",
    label: "Trauma e experiências difíceis",
    title: "E se o corpo ainda *guarda o que a mente já deixou para trás?*",
    text: "Acompanhamento de experiências traumáticas e difíceis, com atenção ao corpo e ao ritmo de cada pessoa, a partir da psicotraumatologia.",
    cta: "Conversar com cuidado",
    page: {
      h1a: "Algumas experiências",
      h1b: "o corpo ainda lembra.",
      intro:
        "Certas vivências difíceis deixam marcas que não cabem em palavras: sobressaltos, pesadelos, bloqueios, a sensação de estar sempre em alerta. Na terapia, isso pode ser olhado com cuidado, no ritmo em que você se sentir seguro.",
      recognize: [
        "Lembranças difíceis voltam sem aviso e o corpo reage.",
        "Você evita lugares, pessoas ou situações para não sentir.",
        "Tem a sensação de estar sempre em alerta, mesmo em segurança.",
        "Sente que algo ficou “preso” e as palavras não alcançam.",
      ],
      paths: [
        { title: "Criar segurança primeiro", text: "Antes de qualquer aprofundamento, construímos recursos para você se sentir estável." },
        { title: "Ir com gradualidade", text: "O trabalho acontece em pequenas doses, respeitando o que o seu corpo e a sua história suportam." },
        { title: "Integrar a experiência", text: "Dar lugar ao que aconteceu, sem ser dominado por isso, e retomar escolhas." },
      ],
      approach: [
        "Tenho formação em Psicotraumatologia e trabalho com psicoterapia corporal, incluindo recursos da Experiência Somática®, que considera o papel do sistema nervoso na resposta ao trauma.",
        "Nada é forçado: você decide o quanto e quando aprofundar, e podemos pausar sempre que precisar.",
      ],
      faq: [
        { q: "Preciso contar tudo o que aconteceu?", a: "Não. É possível trabalhar sem relatar todos os detalhes. Você conduz o que quer compartilhar e quando." },
        { q: "Funciona online?", a: "Sim. Muitos recursos são adaptados ao atendimento por videochamada, com sigilo e cuidado." },
        { q: "Quanto tempo leva?", a: "Não há prazo fixo nem promessa de tempo. Cada processo é único e vamos revisando o caminho juntos." },
      ],
      metaDescription: "Psicoterapia para trauma e experiências difíceis, com atenção ao corpo e ao sistema nervoso. Online e presencial no Rio de Janeiro.",
    },
  },
  {
    slug: "depressao-e-luto",
    icon: "heart",
    label: "Depressão e luto",
    title: "Quando a tristeza *pesa mais do que o dia?*",
    text: "Um espaço para acolher a depressão e os processos de luto, no seu tempo, sem pressa para “superar”.",
    cta: "Conversar sobre isso",
    page: {
      h1a: "A dor merece lugar,",
      h1b: "e não pressa.",
      intro:
        "A depressão e o luto cansam o corpo e a vida, e muita gente tenta seguir sozinha. Aqui, a dor é acolhida e compreendida, no seu ritmo, sem cobrança para estar bem.",
      recognize: [
        "Tudo parece mais pesado e sem cor, e o cansaço não passa.",
        "Você perdeu alguém ou algo importante e a falta continua presente.",
        "Sente-se desconectado de si e das pessoas.",
        "Cobra-se por não estar melhor.",
      ],
      paths: [
        { title: "Acolher o que sente", text: "Dar nome à tristeza e ao vazio, sem julgamento e sem pressa." },
        { title: "Cuidar do corpo", text: "Sono, energia e ritmo também fazem parte do processo e entram no trabalho." },
        { title: "Reconstruir sentido", text: "Aos poucos, encontrar apoios e novos caminhos a partir da sua história." },
      ],
      approach: [
        "Atuo na psicologia clínica existencial-fenomenológica, que escuta o sentido da experiência de cada pessoa, e integro recursos corporais quando fazem sentido.",
        "Quando necessário, converso com você sobre o acompanhamento de outros profissionais da saúde.",
      ],
      faq: [
        { q: "Isso é depressão?", a: "O diagnóstico exige uma avaliação cuidadosa. Na primeira conversa entendemos o que você vive e o melhor caminho." },
        { q: "E se eu estiver em sofrimento intenso agora?", a: "Procure apoio imediato: o CVV atende 24 horas pelo 188, e o SAMU pelo 192." },
        { q: "O luto tem prazo?", a: "Não. Cada pessoa vive o luto de um jeito e no seu tempo." },
      ],
      metaDescription: "Psicoterapia para depressão e luto, com acolhimento e escuta cuidadosa. Online e presencial no Rio de Janeiro.",
    },
  },
  {
    slug: "dependencias-e-compulsoes",
    icon: "wave",
    label: "Dependências e compulsões",
    title: "Quando o alívio *vira compulsão?*",
    text: "Acompanhamento de dependências químicas e comportamentais, como álcool, jogo, compras compulsivas e compulsão alimentar, com acolhimento e sem julgamento.",
    cta: "Conversar com sigilo",
    page: {
      h1a: "Entender o que sustenta",
      h1b: "é o primeiro passo.",
      intro:
        "O que começa como alívio, no copo, no jogo, nas compras ou na comida, pode ir ocupando um espaço maior do que gostaríamos. O foco aqui é compreender o que sustenta esse padrão e construir alternativas possíveis, sem julgamento.",
      recognize: [
        "Você promete diminuir e não consegue sustentar.",
        "Sente culpa depois, mas repete quando a tensão volta.",
        "O comportamento ocupa tempo, dinheiro ou saúde demais.",
        "Tem receio de ser julgado ao pedir ajuda.",
      ],
      paths: [
        { title: "Psicoeducação", text: "Entender o que acontece no corpo, no humor e no cérebro diante da substância ou do comportamento." },
        { title: "Olhar para o que sustenta", text: "Reconhecer gatilhos, emoções e situações ligados ao padrão." },
        { title: "Outras formas de regular", text: "Construir alternativas para aliviar o corpo e as emoções, passo a passo." },
      ],
      approach: [
        "Tenho formação em Transtornos Adictivos e ampla experiência no acompanhamento de dependências químicas e comportamentais, como transtorno do jogo (ludopatia), compras compulsivas e compulsão alimentar.",
        "Cada plano é construído com você, com acolhimento e sigilo, e pode envolver outros profissionais da saúde quando necessário.",
      ],
      faq: [
        { q: "Preciso parar antes de começar?", a: "Não. Você pode começar como está. Construímos juntos o caminho possível para o seu momento." },
        { q: "Meu caso é sigiloso?", a: "Sim. Tudo é protegido pelo sigilo profissional do Código de Ética da Psicologia." },
        { q: "E se eu recair?", a: "Faz parte do processo de muita gente. Conversamos sobre o que aconteceu, sem julgamento, e seguimos." },
      ],
      metaDescription: "Psicoterapia para dependências e compulsões (álcool, jogo, compras, alimentar), com acolhimento e sigilo. Online e presencial.",
    },
  },
  {
    slug: "terapia-online",
    icon: "video",
    label: "Terapia online",
    title: "Sem tempo, longe ou *prefere ficar em casa?*",
    text: "Sessões por videochamada, com o mesmo cuidado e o mesmo sigilo do consultório, de onde você estiver.",
    cta: "Saber sobre a terapia online",
    page: {
      h1a: "O mesmo cuidado,",
      h1b: "de onde você estiver.",
      intro:
        "A maior parte dos meus atendimentos particulares acontece online. Com um espaço reservado e uma boa conexão, a terapia funciona bem, e muita gente se sente até mais à vontade em casa.",
      recognize: [
        "A agenda é apertada e o deslocamento pesa.",
        "Você mora em outra cidade ou está viajando.",
        "Prefere começar de casa, no seu ritmo.",
        "Já tentou o presencial e não conseguiu manter.",
      ],
      paths: [
        { title: "Videochamada segura", text: "Plataforma de vídeo segura, com link enviado antes da sessão." },
        { title: "Mesmo sigilo e ética", text: "O atendimento online segue as normas do Conselho Federal de Psicologia." },
        { title: "Recursos adaptados", text: "Exercícios e materiais funcionam bem à distância, no seu ambiente." },
      ],
      approach: [
        "Atendo online todo o Brasil, conforme as normas do CFP, com horários combinados conforme a sua rotina.",
        "Para sentir-se à vontade, basta um lugar reservado, fones de ouvido e uma conexão estável.",
      ],
      faq: [
        { q: "Terapia online funciona mesmo?", a: "Sim. É regulamentada pelo CFP e mantém o mesmo cuidado e sigilo do presencial." },
        { q: "O que preciso para as sessões?", a: "Um lugar reservado, fones de ouvido e uma boa conexão de internet." },
        { q: "Posso alternar entre online e presencial?", a: "Sim, quando houver disponibilidade de horário no consultório." },
      ],
      metaDescription: "Terapia online com psicóloga clínica, mesmo cuidado e sigilo do presencial. Atendimento para todo o Brasil.",
    },
  },
];

/* ------------------------------------------------------------------ */
/* Sobre                                                               */
/* ------------------------------------------------------------------ */
export const about = {
  eyebrow: { number: "03", label: "Quem vai caminhar com você" },
  title: "Prazer, *eu sou a Joana.*",
  paragraphs: [
    "Há momentos em que o sofrimento emocional ultrapassa aquilo que conseguimos expressar em palavras e também se manifesta no corpo. Meu trabalho é acolher essa experiência de forma integral, respeitando a singularidade e a história de cada pessoa.",
    "Sou psicóloga clínica e psicoterapeuta corporal, com mais de 20 anos de experiência. Tenho ampla experiência no acompanhamento de ansiedade, traumas, burnout, depressão e processos de luto, além de dependências comportamentais, como transtorno do jogo (ludopatia), compras compulsivas e compulsão alimentar.",
    "Minha abordagem integra aspectos emocionais, relacionais e corporais, buscando compreender não apenas os sintomas, mas também os sentidos que eles assumem na história de cada paciente. Atendo adolescentes, adultos e idosos, presencialmente e online.",
  ],
  quote: "Escutar o corpo também é escutar a história. É isso que me move no consultório.",
  signature: "JOANA SCHULTZ · PSICÓLOGA",
  credentials: [
    { label: "Formação", value: "Psicologia Clínica Existencial-Fenomenológica, Psicotraumatologia, Saúde Materno-Infantil e Transtornos Adictivos" },
    { label: "Experiência", value: "Psicóloga clínica há mais de 20 anos" },
    { label: "Abordagem", value: "Psicoterapia corporal e Experiência Somática®" },
    { label: "Registro profissional", value: clinic.registry, verify: true },
  ],
  sealText: `PSICÓLOGA CLÍNICA · ${clinic.registry} · PRESENCIAL E ONLINE · `,
  cta: "Agendar minha primeira sessão",
};

/* ------------------------------------------------------------------ */
/* Processo                                                            */
/* ------------------------------------------------------------------ */
export const process = {
  eyebrow: { number: "04", label: "Como funciona" },
  title: "Começar pode ser *mais simples do que parece.*",
  text: "Sei que dar o primeiro passo pode trazer dúvidas. Por isso, deixo aqui como costuma ser o caminho, do primeiro contato às sessões.",
  steps: [
    { title: "Você me manda uma mensagem", text: "Pelo WhatsApp, do seu jeito. Combinamos o dia, o horário e o formato: online ou presencial." },
    { title: "Nossa primeira sessão", text: "Um encontro para eu conhecer a sua história, sem pressa e sem julgamentos. É também quando você me conhece e sente se faz sentido seguirmos juntos." },
    { title: "Um caminho sob medida", text: "Definimos o foco e os objetivos do processo, e os recursos mais adequados ao seu momento, respeitando o seu ritmo." },
    { title: "Sessões regulares", text: "Encontros com frequência combinada, em geral semanais, com espaço para revisar o caminho sempre que você precisar." },
  ],
  cta: "Dar o primeiro passo",
  note: "Você decide, a cada passo, se e como quer seguir.",
};

/* ------------------------------------------------------------------ */
/* Consultório / online                                                */
/* ------------------------------------------------------------------ */
export const office = {
  eyebrow: { number: "05", label: "Presencial e online" },
  title: `Um espaço de cuidado no ${clinic.city}, *ou onde você estiver.*`,
  presencial: {
    title: `Atendimento em ${clinic.district}`,
    text: `Atendimento presencial com hora marcada, em ${clinic.district}, no ${clinic.city}, em um ambiente tranquilo e acolhedor. O endereço completo é informado ao agendar.`, // TODO confirmar sala/endereço
    features: ["Atendimento com hora marcada", "Perto de transporte público"], // TODO confirmar o que é verdadeiro
    cta: "Agendar presencial",
    seal: `COMO CHEGAR · ${clinic.district.toUpperCase()} · ${clinic.city.toUpperCase()} · `,
  },
  online: {
    title: "Terapia online",
    text: "Para quem tem a agenda apertada, mora em outra cidade ou prefere ser atendido no conforto de casa. As sessões acontecem por videochamada, com o mesmo cuidado e o mesmo sigilo do consultório.",
    points: [
      "Videochamada em plataforma segura",
      "Basta um lugar reservado e fones de ouvido",
      "Atendimento para todo o Brasil, conforme as normas do CFP",
    ],
    cta: "Saber sobre a terapia online",
    note: { title: "A maior parte dos atendimentos é online", text: "Se você prefere começar de casa, é só avisar na primeira mensagem." },
  },
};

/* ------------------------------------------------------------------ */
/* Psicoeducação (no lugar de "conteúdos do Instagram")                */
/* ------------------------------------------------------------------ */
export const psychoeducation = {
  eyebrow: { number: "06", label: "Psicoeducação" },
  title: "Entender o corpo *ajuda a cuidar dele.*",
  text: "Parte do meu trabalho é explicar, de forma simples, o que acontece com você. Estes são alguns dos materiais que preparei para os pacientes. Toque para ampliar.",
  cards: [
    { tag: "Sistema nervoso", title: "Sistema nervoso simpático", text: "O que acontece no corpo na resposta de luta, fuga ou congelamento.", src: "/img/psicoed/simpatico.webp", alt: "Infográfico sobre o sistema nervoso simpático: função, efeitos no corpo e quando é ativado" },
    { tag: "Sistema nervoso", title: "Sistema nervoso parassimpático", text: "Como o corpo recupera a calma, a digestão e o equilíbrio.", src: "/img/psicoed/parassimpatico.webp", alt: "Infográfico sobre o sistema nervoso parassimpático: função, efeitos no corpo e como ativá-lo" },
    { tag: "Exercício", title: "Pêndulo", text: "Alternar entre segurança e desconforto leve para regular o sistema nervoso.", src: "/img/psicoed/pendulacao.webp", alt: "Infográfico do exercício de pendulação da Experiência Somática, com passo a passo e benefícios" },
    { tag: "Exercício", title: "Grounding", text: "Um recurso simples para se ancorar no presente e ampliar a sensação de segurança.", src: "/img/psicoed/grounding.webp", alt: "Infográfico do exercício de grounding da Experiência Somática, com passo a passo" },
  ],
  cta: "Quero receber esses materiais",
  ctaMessage: `${hi} gostaria de saber mais sobre os materiais de psicoeducação.`,
};

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */
export const faq = {
  eyebrow: { number: "07", label: "Dúvidas frequentes" },
  title: "Antes de começar, *talvez você se pergunte…*",
  text: "Se a sua dúvida não estiver aqui, me chama no WhatsApp.",
  cta: "Ainda tenho uma dúvida",
  items: [
    { q: "Como é a primeira sessão?", a: "É um encontro para eu conhecer você e o que te trouxe até aqui, no seu ritmo. Você não precisa chegar com nada organizado. Ao final, conversamos sobre como a terapia pode te acompanhar e se faz sentido seguirmos juntos." },
    { q: "Quanto tempo dura cada sessão? E com que frequência elas acontecem?", a: "As sessões têm cerca de 50 minutos e costumam ser semanais. A frequência pode ser ajustada conforme o seu momento e os seus objetivos." }, // TODO confirmar duração
    { q: "Terapia online funciona?", a: "Sim. O atendimento online é regulamentado pelo Conselho Federal de Psicologia e mantém o mesmo cuidado, a mesma ética e o mesmo sigilo do presencial. Basta um lugar reservado, fones de ouvido e uma boa conexão." },
    { q: "Como o sigilo é garantido?", a: "Tudo o que é conversado na terapia é protegido pelo sigilo profissional previsto no Código de Ética da Psicologia. No online, as sessões acontecem em plataforma de videochamada segura." },
    { q: "Quanto custa? Atende por convênio?", a: "O atendimento é particular. Os valores e as formas de pagamento são informados pelo WhatsApp, de forma reservada. Se o seu plano de saúde oferece reembolso para psicoterapia, posso emitir os recibos necessários." },
    { q: "Preciso estar em crise para começar a terapia?", a: "Não. Muita gente procura a terapia justamente quando percebe algo se repetindo, quando o corpo dá sinais de cansaço ou quando quer prevenir. Cuidar de si não precisa esperar o limite." },
    { q: "O que é psicoterapia corporal?", a: "É um trabalho que considera o papel do corpo e do sistema nervoso na forma como sentimos e reagimos. Além de conversar, usamos exercícios de atenção ao corpo e de autorregulação, incluindo recursos da Experiência Somática®. Explico tudo com calma e decidimos juntos o que faz sentido para você." },
    { q: "Você atende dependências e compulsões?", a: "Sim. Tenho formação em Transtornos Adictivos e acompanho dependências químicas e comportamentais, como álcool, jogo, compras compulsivas e compulsão alimentar, com acolhimento, sigilo e sem julgamento. Você não precisa ter parado para começar." },
    { q: "Quais faixas etárias você atende?", a: "Atendo adolescentes, adultos e idosos, presencialmente e online." },
    { q: "Quanto tempo dura o processo terapêutico?", a: "Não existe um prazo fixo, e eu não faço promessas de tempo. Cada processo é único: há quem venha por um período mais focado e quem prefira um acompanhamento mais longo. Vamos revisando o caminho juntos." },
    { q: "Onde fica o consultório?", a: `O atendimento presencial é em ${clinic.district}, no ${clinic.city}, sempre com hora marcada. Passo o endereço completo ao agendar.` }, // TODO endereço
  ],
};

/* ------------------------------------------------------------------ */
/* Contato final + rodapé                                              */
/* ------------------------------------------------------------------ */
export const contact = {
  title: "Dar o primeiro passo *pode ser só uma mensagem.*",
  text: "Você não precisa ter todas as respostas para começar. Me mande uma mensagem e combinamos juntos o melhor horário. O que trouxe você até aqui, a gente conversa com calma na primeira sessão.",
  button: "Enviar uma mensagem",
  callback: {
    title: "Prefere que eu te chame?",
    text: "Deixe seu nome e suas preferências: a mensagem abre pronta no seu WhatsApp e eu retorno para combinarmos.",
    privacy: "Não peço informações sobre a sua saúde por aqui. Seus dados servem apenas para o retorno do contato.",
  },
};

export const footer = {
  tagline: "Mais consciência. *Mais calma. Mais você.*",
  emergency: "Em situação de emergência, ligue 188 (CVV) ou 192 (SAMU).",
  attend: ["Presencial em Botafogo (Rio de Janeiro)", "Online para todo o Brasil"],
};

export const privacyText = [
  { h: "Quem sou", p: `${clinic.role} ${clinic.fullName}, ${clinic.registry}. Este site é institucional e serve para apresentar o meu trabalho e facilitar o contato.` },
  { h: "Quais dados são tratados", p: "O formulário do site coleta apenas o seu nome e as suas preferências de atendimento (formato e período). Esses dados não são enviados a nenhum servidor: eles montam uma mensagem que abre no seu WhatsApp, e só é enviada se você decidir enviar." },
  { h: "Para que usamos", p: "Os dados são usados exclusivamente para retornar o seu contato e combinar o atendimento. Não pedimos informações sobre a sua saúde por este site." },
  { h: "Análise de visitas", p: "Podemos utilizar ferramentas de análise para entender como o site é usado. Elas não identificam você pessoalmente. Você pode bloquear cookies no navegador." },
  { h: "Seus direitos", p: "Conforme a LGPD (Lei 13.709/2018), você pode pedir acesso, correção ou exclusão dos seus dados pelo WhatsApp do site." },
];
