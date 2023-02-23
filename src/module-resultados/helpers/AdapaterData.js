const objectToArray = (obj) => {
  let arreglo = Object.entries(obj);
  console.log(arreglo);
};

//CONSULTAS
export const convResult = (obj) => {
  const papeleta = obj.estructuraPapeleta;
  let pregunta = {
    idPregunta: obj.pregunta.idPregunta,
    descripcion: obj.pregunta.descPregunta,
    tipo: obj.pregunta.tipoRespuesta,
    subtipo: obj.pregunta.subtipo,
  };

  let resultados = {
    idPregunta: obj.resultados.idPregunta,
    idPregunta: obj.resultados.idPregunta,
  };
  let listaResul = [];
  let listaPregu = [];

  if (obj.pregunta.subtipo === "2respuestas") {
    listaPregu.push("SI");
    listaResul.push(obj.resultados.opc1);

    listaPregu.push("NO");
    listaResul.push(obj.resultados.opc2);
  } else if (obj.pregunta.subtipo === "3respuestas") {
    listaPregu.push("EN DESACUERDO");
    listaResul.push(obj.resultados.opc1);
    listaPregu.push("NEUTRAL");
    listaResul.push(obj.resultados.opc2);
    listaPregu.push("DE ACUERDO");
    listaResul.push(obj.resultados.opc3);
  } else if (obj.pregunta.subtipo === "escaladelikert") {
    listaPregu.push("Totalmente en desacuerdo");
    listaResul.push(obj.resultados.opc1);
    listaPregu.push("En desacuerdo");
    listaResul.push(obj.resultados.opc2);
    listaPregu.push("Neutral");
    listaResul.push(obj.resultados.opc3);
    listaPregu.push("De acuerdo");
    listaResul.push(obj.resultados.opc4);
    listaPregu.push("Totalmente de acuerdo");
    listaResul.push(obj.resultados.opc5);
  } else {
    if (obj.pregunta.opcion1 !== "") {
      listaPregu.push(obj.pregunta.opcion1);
      listaResul.push(obj.resultados.opc1);
    }
    if (obj.pregunta.opcion2 !== "") {
      listaPregu.push(obj.pregunta.opcion2);
      listaResul.push(obj.resultados.opc2);
    }
    if (obj.pregunta.opcion3 !== "") {
      listaPregu.push(obj.pregunta.opcion3);
      listaResul.push(obj.resultados.opc3);
    }
    if (obj.pregunta.opcion4 !== "") {
      listaPregu.push(obj.pregunta.opcion4);
      listaResul.push(obj.resultados.opc4);
    }
    if (obj.pregunta.opcion5 !== "") {
      listaPregu.push(obj.pregunta.opcion5);
      listaResul.push(obj.resultados.opc5);
    }
  }

  listaPregu.push("nulos");
  pregunta.lista = listaPregu;
  listaResul.push(obj.resultados.nulos);
  resultados.lista = listaResul;

  let resOrd = [...resultados.lista];

  resOrd.sort(function (a, b) {
    return b - a;
  });

  const ganadores = [];
  const gan = resultados.lista.map((res, index) => {
    if (res === resOrd[0]) {
      const win = { question: pregunta.lista[index], result: res };
      ganadores.push(win);
      return win;
    }
  });
  const nulos = obj.resultados.nulos;
  let acumulados =
    parseInt(obj.resultados.opc1, 10) +
    parseInt(obj.resultados.opc2, 10) +
    parseInt(obj.resultados.opc3, 10) +
    parseInt(obj.resultados.opc4, 10) +
    parseInt(obj.resultados.opc5, 10);
  console.log("acumulados: ", acumulados);

  const data = {
    papeleta,
    pregunta,
    resultados,
    ganadores,
    nulos,
    acumulados,
  };

  return data;
};

const toComite = (data) => {
  console.log("comite");
  const cantWin = data?.boletaCandidatos.modalidad.maxOpciones;
  const boleta = data.boletaCandidatos.boletaModel.encabezadoBoleta;
  console.log("canWin", cantWin);
  const resultados = data?.representanteResultado;
  console.log("Resultados", resultados);
  let total = 0;
  let candidatos = resultados.map((res, index) => {
    total = total + res.candidad;
    const candidatoN = data.boletaCandidatos.candidatoModels.find((cand) => {
      if (cand.claveCandidato === res.id) return res;
    });
    if (candidatoN) return { ...candidatoN, votos: res.candidad };
    else null;
  });

  candidatos = candidatos.filter((cand) => {
    if (cand) return cand;
  });

  console.log("candidatos", candidatos);
  console.log("CNR", data.candidaturasNoRegistradas);

  if (data.candidaturasNoRegistradas !== null) {
    console.log("entre");
    for (let i = 0; i < data.candidaturasNoRegistradas.length; i++) {
      total = total + data.candidaturasNoRegistradas[i].candidad;
      const nc = {
        apellidoMCandidato: "",
        apellidoPCandidato: "",
        fotoCandidato: "",
        nombreCandidato: data.candidaturasNoRegistradas[i].id,
        votos: data.candidaturasNoRegistradas[i].candidad,
      };
      candidatos.push(nc);
    }
  }

  let newArray = data.representanteResultado;
  newArray.sort((a, b) => {
    return b.candidad - a.candidad;
  });

  let winers = [];
  for (let i = 0; i < cantWin; i++) {
    const ganador = data.boletaCandidatos.candidatoModels.find((gan) => {
      if (gan.claveCandidato === newArray[i].id) return gan;
    });
    winers.push({ ...ganador, votos: newArray[i].candidad });
  }

  let nulo = resultados.find((r) => {
    console.log(r);
    if (r.id === "NULO") return r.candidad;
  });

  return {
    candidatos,
    winers,
    boleta,
    total,
    cnr: data.candidaturasNoRegistradas
      ? data.candidaturasNoRegistradas.length
      : 0,
    nulo: nulo ? nulo : 0,
  };
};

const toRep = (data) => {
  const resultados = data?.representanteResultado;
  const boleta = data.boletaCandidatos.boletaModel.encabezadoBoleta;
  let total = 0;
  let candidatos = resultados.map((res, index) => {
    total = total + res.candidad;
    const candidatoN = data.boletaCandidatos.candidatoModels.find((cand) => {
      if (cand.claveCandidato === res.id) return res;
    });
    if (candidatoN) return { ...candidatoN, votos: res.candidad };
    else null;
  });

  candidatos = candidatos.filter((cand) => {
    if (cand) return cand;
  });

  for (let i = 0; i < data.candidaturasNoRegistradas.length; i++) {
    total = total + data.candidaturasNoRegistradas[i].candidad;
    const nc = {
      apellidoMCandidato: "",
      apellidoPCandidato: "",
      fotoCandidato:
        "https://www.jornada.com.mx/ultimas/2021/04/24/politicos-y-candidatos-en-michoacan-bajo-la-mira-del-crimen-organizado-6807.html/cesar.jpg-4686.html/image_large",
      nombreCandidato: data.candidaturasNoRegistradas[i].id,
      votos: data.candidaturasNoRegistradas[i].candidad,
    };
    candidatos.push(nc);
  }

  let newArray = data.representanteResultado;
  newArray.sort((a, b) => {
    return b.candidad - a.candidad;
  });

  const ganador = data.boletaCandidatos.candidatoModels.find((gan) => {
    if (gan.claveCandidato === newArray[0].id) return gan;
  });
  let winers = ganador;

  let nulo = resultados.find((r) => {
    console.log(r);
    if (r.id === "NULO") return r.candidad;
  });

  return {
    candidatos,
    winers,
    total,
    cnr: data.candidaturasNoRegistradas.length,
    boleta,
    nulo: nulo ? nulo : 0,
  };
};

const toPlanilla = (data) => {
  console.log("planilla");

  const resultados = data?.representanteResultado;
  const boleta = data.boletaCandidatos.boletaModel.encabezadoBoleta;
  console.log("Resultados", resultados);
  let total = 0;
  let planillas = resultados.map((res, index) => {
    total = total + res.candidad;
    const asociacion = data.boletaCandidatos.candidatosAsociaciones.find(
      (cand) => {
        if (cand.idCombinacion === res.id) return res;
      }
    );
    if (asociacion) return { ...asociacion, votos: res.candidad };
    else null;
  });

  /*  planillas = planillas.filter((cand) => {
    console.log("desde plan:", cand.candidatos);
    if (cand.candidatos !== undefined) return cand;
  }); */

  /*  if (data.candidaturasNoRegistradas !== null) {
    for (let i = 0; i < data.candidaturasNoRegistradas.length; i++) {
      total = total + data.candidaturasNoRegistradas[i].candidad;
      const nc = {
        apellidoMCandidato: "",
        apellidoPCandidato: "",
        fotoCandidato: "",
        nombreCandidato: data.candidaturasNoRegistradas[i].id,
        votos: data.candidaturasNoRegistradas[i].candidad,
      };
      planillas.push({ ...nc, asociacionModel: null });
    }
  } */

  let newArray = data.representanteResultado;
  newArray.sort((a, b) => {
    return b.candidad - a.candidad;
  });

  let winersId = newArray[0].id;
  let winers = data.boletaCandidatos.candidatosAsociaciones.find((win) => {
    if (winersId === win.idCombinacion) return win;
  });

  let nulo = resultados.find((r) => {
    console.log(r);
    if (r.id === "NULO") return r.candidad;
  });

  return {
    planillas,
    winers,
    boleta,
    total,
    cnr: data.candidaturasNoRegistradas
      ? data.candidaturasNoRegistradas.length
      : 0,
    nulo: nulo ? nulo : 0,
  };
};

export const toNoFormal = (data) => {
  console.log(data);
  const modalidad = data?.boletaCandidatos.modalidad.modalidad;
  if (modalidad === "REPRESENTANTE") {
    const info = toRep(data);
    return { ...info, modalidad };
  } else if (modalidad === "COMITE") {
    const info = toComite(data);
    return { ...info, modalidad };
  } else {
    const info = toPlanilla(data);
    return { ...info, modalidad };
  }
};
