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
      "Psicoterapia online e presencial no Rio de Janeiro (Botafogo) para adultos. Trabalho que une escuta, corpo e sistema nervoso, com foco em objetivos claros. Agende pelo WhatsApp.",
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
  eyebrow: ["Psicologia", "Corpo e mente", "Adultos"],
  title: "Sua mente já entende. O corpo ainda *não relaxou.*",
  subtitle:
    "Psicoterapia para adultos que querem compreender o que sentem, regular o corpo e as emoções e alcançar mudanças concretas, com escuta cuidadosa e objetivos claros.",
  primary: "Começar meu processo",
  secondary: "Como funciona",
  scrollCue: "O que o seu corpo tenta te dizer?",
  cards: [
    { icon: "body", title: "Corpo e sistema nervoso", text: "Entenda como o seu corpo reage ao estresse.", slug: "corpo-e-sistema-nervoso" },
    { icon: "wave", title: "Ansiedade e estresse", text: "Mais calma para viver o que importa.", slug: "ansiedade-e-estresse" },
    { icon: "lotus", title: "Autorregulação", text: "Ferramentas para voltar ao seu eixo.", slug: "autorregulacao-emocional" },
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
    "O que começou como alívio no fim do dia já pesa mais do que alivia.",
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
    label: "Ansiedade e estresse",
    title: "E se a ansiedade estiver *no corpo antes de estar na cabeça?*",
    text: "Reconhecer o que dispara a ansiedade e o estresse e construir, aos poucos, um ritmo mais seu, com mais leveza para viver o que importa.",
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
    slug: "autorregulacao-emocional",
    icon: "lotus",
    label: "Autorregulação emocional",
    title: "Como me acalmar *quando tudo parece demais?*",
    text: "Exercícios práticos de autorregulação para reconhecer o que o corpo sente e voltar ao seu eixo, dentro e fora da sessão.",
    cta: "Quero aprender a me regular",
    page: {
      h1a: "Voltar ao eixo",
      h1b: "também se aprende.",
      intro:
        "Existem formas simples de acalmar o corpo e organizar o que sentimos. Elas podem ser aprendidas, treinadas e adaptadas à sua rotina, para que você tenha recursos quando o dia apertar.",
      recognize: [
        "As emoções chegam fortes e você demora a se recompor.",
        "Você reage e depois se arrepende.",
        "Sente que perde o controle em situações de pressão.",
        "Gostaria de ter um passo a passo para se acalmar.",
      ],
      paths: [
        { title: "Reconhecer os sinais", text: "Perceber cedo o que o corpo avisa antes de a emoção tomar conta." },
        { title: "Treinar na prática", text: "Exercícios guiados de respiração, atenção ao corpo e orientação, ensaiados na sessão." },
        { title: "Criar o seu kit", text: "Escolher o que funciona para você e montar uma rotina simples de cuidado." },
      ],
      approach: [
        "Preparo materiais e exercícios de autorregulação para os meus pacientes, com explicações claras sobre o que acontece no corpo.",
        "A ideia é que você ganhe autonomia: sair da terapia sabendo o que fazer quando o corpo dispara.",
      ],
      faq: [
        { q: "Os exercícios são difíceis?", a: "Não. São curtos, simples e adaptados à sua rotina e ao seu momento." },
        { q: "Recebo algum material?", a: "Sim. Utilizo infográficos e roteiros de exercícios para apoiar o que fazemos nas sessões." },
        { q: "Serve para qualquer pessoa?", a: "Os recursos são adaptados a cada caso. Na primeira conversa avaliamos juntos o que faz sentido para você." },
      ],
      metaDescription: "Aprenda exercícios práticos de autorregulação emocional com acompanhamento psicológico. Online e presencial.",
    },
  },
  {
    slug: "alcool-e-outras-substancias",
    icon: "glass",
    label: "Álcool e outras substâncias",
    title: "Quando o alívio *virou rotina?*",
    text: "Acompanhamento para quem quer rever a relação com o álcool e outras substâncias, com psicoeducação e sem julgamento.",
    cta: "Conversar com sigilo",
    page: {
      h1a: "Rever a relação com a substância",
      h1b: "começa com uma conversa sem julgamento.",
      intro:
        "O uso que começa como alívio pode ir ocupando um espaço maior do que gostaríamos. Aqui, o foco é entender o que sustenta esse padrão, o que o corpo e as emoções estão pedindo, e construir alternativas possíveis.",
      recognize: [
        "Aquele copo no fim do dia já não parece uma escolha.",
        "Você promete diminuir e não consegue sustentar.",
        "Sente culpa depois, mas repete quando a tensão volta.",
        "Tem medo de ser julgado ao pedir ajuda.",
      ],
      paths: [
        { title: "Psicoeducação", text: "Entender o que o álcool e outras substâncias fazem no organismo e no humor." },
        { title: "Olhar para o que sustenta", text: "Reconhecer gatilhos, emoções e situações associadas ao uso." },
        { title: "Alternativas de regulação", text: "Construir outras formas de aliviar o corpo e as emoções, passo a passo." },
      ],
      approach: [
        "Atendo pessoas com transtornos adictivos com acolhimento, sigilo e responsabilidade. Cada plano é construído com você, sem imposições.",
        "Quando necessário, o cuidado pode envolver outros profissionais da saúde.",
      ],
      faq: [
        { q: "Preciso parar de beber para começar?", a: "Não. Você pode começar como está. O objetivo é construir, junto comigo, o caminho possível para o seu momento." },
        { q: "Meu caso é sigiloso?", a: "Sim. Tudo o que é conversado é protegido pelo sigilo profissional do Código de Ética da Psicologia." },
        { q: "E se eu escorregar?", a: "Faz parte do processo de muita gente. Conversamos sobre o que aconteceu, sem julgamento, e seguimos." },
      ],
      metaDescription: "Terapia para quem quer rever a relação com o álcool e outras substâncias, com acolhimento e sigilo. Online e presencial.",
    },
  },
  {
    slug: "psicoeducacao",
    icon: "book",
    label: "Psicoeducação",
    title: "Entender o que acontece *muda o que você faz.*",
    text: "Explicações simples e materiais próprios sobre cérebro, sistema nervoso e emoções, usados ao longo das sessões para apoiar o seu processo.",
    cta: "Quero entender melhor",
    page: {
      h1a: "Informação clara",
      h1b: "é uma forma de cuidado.",
      intro:
        "Saber por que o corpo reage de determinada forma tira o peso da culpa e abre espaço para escolhas novas. Por isso, a psicoeducação faz parte do meu trabalho desde a primeira sessão.",
      recognize: [
        "Você se cobra por reações que não entende.",
        "Já leu muito, mas não sabe como aplicar.",
        "Quer entender o que está acontecendo com você, em linguagem simples.",
        "Prefere uma terapia com orientação prática.",
      ],
      paths: [
        { title: "Explicações simples", text: "Sistema nervoso, estresse, emoções e hábitos, em linguagem clara." },
        { title: "Materiais visuais", text: "Infográficos e roteiros criados para os pacientes, em cores acolhedoras." },
        { title: "Prática guiada", text: "Exercícios para colocar o conhecimento em ação no dia a dia." },
      ],
      approach: [
        "Preparo infográficos e exercícios sobre o funcionamento do sistema nervoso e da autorregulação, usados nas sessões como apoio.",
        "Você recebe o material para consultar quando precisar.",
      ],
      faq: [
        { q: "Preciso estudar fora da sessão?", a: "Não é obrigatório. Os materiais ficam disponíveis para quando você quiser rever." },
        { q: "Os materiais são em português?", a: "Sim, todos em português e em linguagem simples." },
        { q: "Isso substitui a terapia?", a: "Não. É um apoio ao processo terapêutico, não um substituto." },
      ],
      metaDescription: "Psicoeducação sobre sistema nervoso, emoções e autorregulação como parte da psicoterapia. Online e presencial.",
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
    "Sou psicóloga clínica, formada há mais de 20 anos. Atendo adultos online e presencialmente, em um trabalho que une a escuta da psicoterapia a recursos que envolvem o corpo e o sistema nervoso.", // TODO confirmar tempo e instituição
    "Trabalho com psicoeducação e exercícios de autorregulação, e também acompanho pessoas com transtornos adictivos, como o uso de álcool, sempre com acolhimento e sem julgamento.",
    "Acredito numa terapia acolhedora e, ao mesmo tempo, focada em resultados: definimos objetivos claros, escolhemos os recursos mais adequados ao seu momento e revisamos o caminho sempre que necessário.",
  ],
  quote: "Escutar o corpo também é escutar a história. É isso que me move no consultório.",
  signature: "JOANA SCHULTZ · PSICÓLOGA",
  credentials: [
    { label: "Formação", value: "Psicologia" }, // TODO instituição
    { label: "Experiência", value: "Psicóloga clínica há mais de 20 anos" },
    { label: "Recurso terapêutico", value: "Abordagem corporal e autorregulação" }, // TODO nome exato (Somatic Experiencing?)
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
  text: "Parte do meu trabalho é explicar, de forma simples, o que acontece com você. Estes são alguns dos temas dos materiais que uso nas sessões.", // TODO trocar os cartões pelos infográficos reais quando ela enviar
  cards: [
    { tag: "Sistema nervoso", title: "Como o corpo reage ao estresse", text: "Sistema nervoso central, simpático e parassimpático, em linguagem simples." },
    { tag: "Autorregulação", title: "Exercícios para voltar ao eixo", text: "Passo a passo curto para acalmar o corpo e organizar as emoções." },
    { tag: "Corpo e emoção", title: "Onde a ansiedade aparece no corpo", text: "Reconhecer os sinais cedo, antes de a emoção tomar conta." },
    { tag: "Álcool e organismo", title: "O que o álcool faz no corpo", text: "Informação clara sobre os efeitos do consumo, sem julgamento." },
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
    { q: "O que é a abordagem corporal que você usa?", a: "É um trabalho que considera o papel do corpo e do sistema nervoso na forma como sentimos e reagimos. Além de conversar, usamos exercícios de atenção ao corpo e de autorregulação. Explico tudo com calma e decidimos juntos o que faz sentido para você." }, // TODO confirmar nome
    { q: "Você atende quem faz uso de álcool?", a: "Sim. Acompanho pessoas com transtornos adictivos, incluindo o uso de álcool, com acolhimento, sigilo e sem julgamento. Você não precisa ter parado de beber para começar." },
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
