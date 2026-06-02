// Shared database sync file for Doctor Bikes (localStorage with default fallbacks)

const DEFAULT_BIKES = [
  {
    id: "bike-1",
    marca: "Trek",
    nome: "Fuel EX 9.8 GX",
    categoria: "mtb",
    tags: ["MTB Full", "Tamanho M", "2023"],
    preco: 14500,
    precoDe: 18000,
    imagem: "img/FuelEX98GXAXS_23_36953_B_Portrait.png",
    badge: "SEMINOVA",
    specsRing: [
      { label: "C", title: "Carbono", ang: "0deg" },
      { label: "S", title: "Shimano XT", ang: "60deg" },
      { label: "29", title: "29\"", ang: "120deg" },
      { label: "T", title: "Tubeless", ang: "240deg" },
      { label: "H", title: "Freio Hidráulico", ang: "300deg" }
    ],
    especificacoes: {
      quadro: "Carbono OCLV",
      cambio: "SRAM GX Eagle 12v",
      suspensao: "Fox 36 140mm",
      rodas: "29\" Tubeless"
    }
  },
  {
    id: "bike-2",
    marca: "Specialized",
    nome: "Tarmac SL7 Expert",
    categoria: "speed",
    tags: ["Carbono", "Tamanho 54", "2022"],
    preco: 32000,
    precoDe: 38000,
    imagem: "img/FuelEX98GXAXS_23_36953_B_Portrait.png",
    badge: "NOVA",
    specsRing: [
      { label: "C", title: "Carbono", ang: "0deg" },
      { label: "E", title: "Eletrônico", ang: "60deg" },
      { label: "700", title: "Rodas 700c", ang: "120deg" },
      { label: "D", title: "Disc Brake", ang: "240deg" },
      { label: "H", title: "Guidão Integrado", ang: "300deg" }
    ],
    especificacoes: {
      quadro: "Fact 10r Carbon",
      cambio: "Shimano Ultegra Di2 12v",
      suspensao: "Garfo de Carbono",
      rodas: "Roval C38 Carbon"
    }
  },
  {
    id: "bike-3",
    marca: "Giant",
    nome: "Escape E+ 2",
    categoria: "urbana",
    tags: ["Urbana", "E-Bike", "Tamanho L", "Seminova"],
    preco: 12800,
    precoDe: 15900,
    imagem: "img/FuelEX98GXAXS_23_36953_B_Portrait.png",
    badge: "SEMINOVA",
    specsRing: [
      { label: "A", title: "Alumínio ALUXX", ang: "0deg" },
      { label: "M", title: "Motor SyncDrive", ang: "60deg" },
      { label: "B", title: "Bateria 500Wh", ang: "120deg" },
      { label: "H", title: "Freio Hidráulico", ang: "240deg" },
      { label: "U", title: "Uso Urbano", ang: "300deg" }
    ],
    especificacoes: {
      quadro: "Alumínio ALUXX",
      cambio: "Shimano Alivio 9v",
      suspensao: "Garfo Rígido Alumínio",
      rodas: "700x38c Giant"
    }
  }
];

const DEFAULT_OS = [
  {
    id: 1,
    cliente: "Marcos Ferreira",
    bike: "Trek Marlin 7 · 2022 · Tam. M",
    servico: "Revisão completa + troca de pastilhas",
    valor: 280,
    prazo: "Hoje",
    status: "pronto"
  },
  {
    id: 2,
    cliente: "Ana Paula Silva",
    bike: "Specialized Stumpjumper · 2021 · Tam. S",
    servico: "Regulagem de suspensão dianteira",
    valor: 350,
    prazo: "Amanhã",
    status: "em-andamento"
  },
  {
    id: 3,
    cliente: "Ricardo Lima",
    bike: "Scott Scale 960 · 2023 · Tam. L",
    servico: "Troca de rolamentos da coroa e movimento",
    valor: 180,
    prazo: "2 dias",
    status: "aguardando"
  },
  {
    id: 4,
    cliente: "Juliana Costa",
    bike: "Giant Trance 29 · 2022 · Tam. M",
    servico: "Conversão tubeless + alinhamento de rodas",
    valor: 220,
    prazo: "3 dias",
    status: "aguardando"
  },
  {
    id: 5,
    cliente: "Carlos Mendes",
    bike: "Caloi Elite Carbon · 2020 · Tam. M",
    servico: "Troca de cassete e corrente SRAM",
    valor: 195,
    prazo: "Entregue ontem",
    status: "entregue"
  }
];

// Helper database functions
window.DoctorDB = {
  getBikes: function() {
    let bikes = localStorage.getItem("doctor_bikes");
    if (!bikes) {
      localStorage.setItem("doctor_bikes", JSON.stringify(DEFAULT_BIKES));
      return DEFAULT_BIKES;
    }
    return JSON.parse(bikes);
  },

  saveBikes: function(bikes) {
    localStorage.setItem("doctor_bikes", JSON.stringify(bikes));
  },

  getOS: function() {
    let osList = localStorage.getItem("doctor_os");
    if (!osList) {
      localStorage.setItem("doctor_os", JSON.stringify(DEFAULT_OS));
      return DEFAULT_OS;
    }
    return JSON.parse(osList);
  },

  saveOS: function(osList) {
    // Re-index remaining OS list to guarantee sequential IDs starting at 1
    osList.forEach((os, idx) => {
      os.id = idx + 1;
    });
    localStorage.setItem("doctor_os", JSON.stringify(osList));
  }
};
