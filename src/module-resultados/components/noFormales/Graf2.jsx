import React, { useRef, useState } from "react";
import { Bar, Chart } from "react-chartjs-2";
import { Chart as chartJS } from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useParams } from "react-router-dom";
import { Box, Button, Divider, Grid, Typography } from "@mui/material";

export const JornadaNoFormalChart = ({ candidatos = [], totalV = 1 }) => {
  const total = parseInt(
    chartData.resultados.reduce((acc, cur) => acc + cur.resultados, 0),
    10
  );

  // const labelsAdjusted = chartData.resultados.map((label) => label.respuesta.split(" "));
  // console.log(labelsAdjusted);

  console.log(
    "RESULTADOOOOS",
    chartData.resultados.map((data) => data.resultados)
  );
  console.log(
    "NOMBREEES",
    chartData.resultados.map((resultado) => resultado.candidato)
  );
  const chartRef = useRef(null);
  const [data, setData] = useState({
    // labels: chartData.map((data) => data.nombre),
    // labels: labelsAdjusted,
    labels: chartData.resultados.map((resultado) => resultado.candiato),
    // labels: "juan",
    datasets: [
      {
        label: "Votos",
        data: chartData.resultados.map((data) => data.resultados),
        backgroundColor: [
          "#8B3232",
          "#8B5232",
          "#8B7D32",
          "#598B32",
          "#328B70",
          "#32768B",
          "#32468B",
          "#59328B",
          "#89328B",
          "#8B3252",
        ],
        // labels: chartData.map((data) => data.respuesta),
      },
      {
        label: "Votos",

        data: chartData.resultados.map((data) => total),
        // data: total,
        backgroundColor: ["#ededed"],
        grouped: false,
        order: 1,
        hoverBackgroundColor: "#ededed",
      },
    ],
  });

  const imageItems = {
    id: "imageItems",
    beforeDatasetsDraw(chart, args, pluginOptions) {
      const {
        ctx,
        options,
        data,
        scales: { x, y },
      } = chart;
      ctx.save();
      const imageSize = options.layout.padding.bottom;
      data.datasets[0].image.forEach((imageLink, index) => {
        const logo = new Image();
        logo.src = imageLink;
        ctx.drawImage(
          logo,
          x.getPixelForValue(index) - 40 / 2,
          y.getPixelForValue(0) + 5,
          30,
          30
        );
      });
    },
  };

  const tooltipLabels = {
    id: "tooltipLabels",
    beforeEvent(chart, args, pluginOptions) {
      const {
        ctx,
        options,
        data,
        scales: { x, y },
      } = chart;

      // console.log("ESCALAS DEL 1", x.getPixelForValue(0) - 40 / 2, y.getPixelForValue(0) + 5);

      const event = args.event;

      if (event.type === "mousemove") {
        // if (
        // 	event.x >= x.getPixelForValue(0) - 20 &&
        // 	event.x <= x.getPixelForValue(0) + 20 &&
        // 	event.y >= y.getPixelForValue(0) &&
        // 	event.y <= y.getPixelForValue(0) + 40
        // ) {
        const tooltip = chart.tooltip;

        // console.log("ENTRA AL EVENTO");
        const chartArea = chart.chartArea;
        // console.log("area", chartArea);
        tooltip.setActiveElements(
          [
            {
              datasetIndex: 0,
              index: 0,
            },
            {
              datasetIndex: 1,
              index: 0,
            },
          ],
          {
            x: (chartArea.left + chartArea.right) / 2,
            y: (chartArea.top + chartArea.bottom) / 2,
          }
        );
        chart.update();
        // }
        // }
      }
    },
  };

  const handlePDF = () => {
    // const boleta = jornadaSelected.boletas.find(
    // 	(boleta) => boleta.idEstructuraBoleta === parseInt(params.idBoleta, 10)
    // );
    // console.log("bolll", boleta);
    // ReporteInicialPDF();
    // captureScreen();
    captureCanvas();
    // let doc = new jsPDF("p", "pt", "letter");
    // let margin = 10;
    // let scale = (doc.internal.pageSize.width - margin * 2) / document.body.scrollWidth;
    // doc.html(document.body, {
    // 	x: margin,
    // 	y: margin,
    // 	html2canvas: {
    // 		scale: scale,
    // 	},
    // 	callback: function (doc) {
    // 		doc.output("dataurlnewwindow", { filename: "fichero.pdf" });
    // 	},
    // });
  };

  if (chartData.resultados.length === 0) return <>Reporte no disponible</>;
  else
    return (
      <>
        <Grid container spacing={2} id="ejemplo23">
          <Grid item xs={3}></Grid>
          <Grid item container xs={6}>
            <Grid
              item
              xs={4}
              display="flex"
              justifyContent="center"
              alignContent="center"
              alignItems="center"
            >
              <Typography
                variant="h6"
                color="initial"
                align="center"
                sx={{ wordBreak: "break-word" }}
              >
                {/* {chartData.jornadaModel.entidad} */}
              </Typography>
            </Grid>
            <Grid
              item
              xs={3}
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignContent="center"
              alignItems="center"
            >
              {/* <Box borderRight="1px solid" pr={4} display="flex" flexDirection="column">
							<Typography
								variant="body1"
								color="initial"
								align="center"
								fontWeight="bold"
							>
								Presidente
							</Typography>
							<Typography variant="body2" color="initial" align="center">
								Mayoría relativa
							</Typography>
						</Box> */}
            </Grid>
            <Grid
              item
              xs={5}
              display="flex"
              justifyContent="center"
              alignContent="center"
              alignItems="center"
            >
              <Typography
                variant="body2"
                color="initial"
                // fontWeight="bold"
                align="center"
              >
                Consulta ciudadana por respuesta{" "}
                {/* {chartData.papeleta.pregunta.tipoRespuesta} */}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={3}></Grid>
        </Grid>
        <Divider sx={{ paddingTop: "1.5rem" }} />
        <Grid container spacing={2} pb={3}>
          <Grid item container xs={12} md={6}>
            <Grid
              item
              xs={6}
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignContent="center"
              alignItems="center"
            >
              <Typography variant="body1" color="initial" align="center">
                Participación ciudadana
              </Typography>
              <Typography
                variant="body1"
                color="initial"
                fontWeight="bold"
                align="center"
              >
                0.0%
              </Typography>
            </Grid>
            <Grid
              item
              xs={6}
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignContent="center"
              alignItems="center"
            >
              <Typography variant="body1" color="initial" align="center">
                Inicio
              </Typography>
              <Typography
                variant="body2"
                color="initial"
                fontWeight="bold"
                align="center"
              >
                20 Enero 2023
              </Typography>
            </Grid>
          </Grid>
          <Grid item container xs={12} md={6}>
            <Box bgcolor="#f2f2f2" border="1px solid" width="100%" p={1}>
              <Typography
                variant="h6"
                color="#543884"
                sx={{ fontSize: "1rem" }}
              >
                Resumen de la consulta ciudadana
              </Typography>
              <Grid container spacing={1} columns={12}>
                <Grid
                  item
                  xs={12}
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Typography
                    variant="caption"
                    color="initial"
                    sx={{
                      wordBreak: "break-word",
                      textDecoration: "underline",
                    }}
                    align="center"
                    fontWeight="bold"
                  >
                    Total de respuestas
                  </Typography>
                </Grid>

                <Grid
                  item
                  xs={12}
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                >
                  <Box display="flex" flexDirection="column">
                    <Typography
                      variant="body1"
                      color="initial"
                      fontWeight="bold"
                    >
                      {total}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="initial"
                      fontWeight="bold"
                    >
                      {((total * 100) / total).toFixed(2)}%
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
        <Box py="2rem">
          <Typography
            variant="body1"
            color="initial"
            align="center"
            gutterBottom
          >
            Pregunta:
          </Typography>
          <Typography
            variant="body1"
            color="initial"
            align="center"
            fontWeight="bold"
          >
            {/* {chartData.papeleta.pregunta.descPregunta} */}
          </Typography>
        </Box>
        <Chart
          type="bar"
          ref={chartRef}
          data={data}
          plugins={[ChartDataLabels]}
          options={{
            layout: {
              padding: {
                bottom: 30,
              },
            },

            interaction: {
              intersect: false,
              mode: "index",
            },
            indexAxis: "x",
            responsive: true,
            plugins: {
              title: {
                display: true,
                padding: {
                  top: 10,
                  bottom: 30,
                },
                text: "Votos",
              },
              tooltip: {
                filter: function (tooltipItem) {
                  // console.log("TOOLTIPITEM", tooltipItem);
                  return tooltipItem.datasetIndex === 0;
                },

                usePointStyle: true,
                callbacks: {
                  // title: (context) => {
                  // 	// return context[0].dataset.labels[context[0].dataIndex];
                  // 	// return chartData.map((data) => data.respuesta);
                  // 	return chartData.resultados[[context[0].dataIndex]]
                  // 		.candidato;
                  // },
                },
              },
              legend: {
                display: false,
              },
              datalabels: {
                display: function (data) {
                  return data.datasetIndex === 0;
                },
                labels: {
                  // events: ["mousemove"],
                  title: {
                    display: function (data) {
                      return data.datasetIndex === 0;
                    },
                    formatter: function (value, context) {
                      return value + "\nvotos";
                    },
                    textAlign: "center",
                    color: "white",
                  },
                  value: {
                    // display: function (data) {
                    // 	return data.datasetIndex === 0;
                    // },
                    formatter: function (value, context) {
                      return ((value * 100) / total).toFixed(2) + "%";
                    },
                    anchor: "end",
                    align: "top",
                    color: "black",
                  },
                },
              },
            },
            aspectRatio: 3,
            scales: {
              y: {
                grid: {
                  display: false,
                },
              },
              x: {
                grid: {
                  display: false,
                },
              },
            },
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            pt: 5,
          }}
        >
          {/* <Button color="base">Regresar</Button> */}
          <Box sx={{ flex: "1 1 auto" }} />

          <Button
            variant="contained"
            size="large"
            onClick={handlePDF}
            id="nodoespecifico"
            sx={{
              boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.3)",
              transition: "all 0.5s ease",
              backgroundColor: "#511079",
              width: "25%",
              // borderRadius: "25px 25px 25px 25px",
              "&:hover": {
                backgroundColor: "#7E328B !important",
                transform: "translate(-5px, -5px)",
                boxShadow: "5px 5px 1px rgba(0, 0, 0, 0.3)",
              },
            }}
          >
            DESCARGAR REPORTE
          </Button>
        </Box>
        {/* <ReporteInicialHTML /> */}
      </>
    );
};
