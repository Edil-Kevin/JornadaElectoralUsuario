const candidatos = [
  {
    id: "dyusai5",
    nombre: "Laura Yessenia",
    apellidoP: "Sanchez",
    apellidoM: "Lopez",
    votos: 200,
    winner: true,
    partidos: [
      {
        partido: "Partido verde",
        logo: "https://upload.wikimedia.org/wikipedia/commons/a/ae/Logo-partido-verde-2020.png",
      },
      {
        partido: "Partido del trabajo",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Worker%27s_Party_logo_%28Mexico%29.svg/1200px-Worker%27s_Party_logo_%28Mexico%29.svg.png",
      },
    ],
  },
  {
    id: "dyusai5",
    nombre: "Kevin Edilberto",
    apellidoP: "CHAVEZ",
    apellidoM: "SANCHEZ",
    votos: 200,
    winner: true,
    partidos: [
      {
        partido: "PRI",
        logo: "https://upload.wikimedia.org/wikipedia/commons/e/ec/PRI_%28partido_revolucionario_institucional%29_logo_%28Mexico%29.png",
      },
    ],
  },
  {
    id: "dyusai5",
    nombre: "Jose antonio",
    apellidoP: "Diego",
    apellidoM: "Revilla",
    votos: 200,
    winner: true,
    partidos: [
      {
        partido: "PAN",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/PAN_logo_%28Mexico%29.svg/1200px-PAN_logo_%28Mexico%29.svg.png",
      },
    ],
  },
];

export const getResultadoGeneral = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ ok: true, data: [], errorMessage: "" });
    }, 1200);
  });
};

export const getCandidatos = () => {
  return { ok: true, data: candidatos, errorMessage: "" };
};
