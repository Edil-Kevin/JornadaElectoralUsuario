import React, { useRef, useState } from "react";
import { Bar, Chart } from "react-chartjs-2";
import { Chart as chartJS } from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useParams } from "react-router-dom";
import { Box, Button, Divider, Grid, Typography } from "@mui/material";

export const GraficaFomal = ({
  chartData = [
    { votos: 50 },
    { votos: 10 },
    { votos: 100 },
    { votos: 140 },
    { votos: 80 },
  ],
  infoData = [
    { nombre: "Laura Yessenia Sanchez Lopez" },
    { nombre: "Yessenia" },
    { nombre: "sanchez" },
    { nombre: "lopez" },
    { nombre: "nombre" },
  ],
}) => {
  const total = 50;
  const chartRef = useRef(null);
  const params = useParams();
  const [data, setData] = useState({
    labels: infoData.map((data) => {
      const name = data.nombre.split(" ");

      data.nombre;
    }),
    // labels: infoData.map((data) => ""),
    datasets: [
      {
        label: "Votos",
        data: chartData.map((data) => data.votos),
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
        image: [
          "https://www.chartjs.org/img/chartjs-logo.svg",
          "https://upload.wikimedia.org/wikipedia/commons/5/5c/PAN_logo_%28Mexico%29.svg",
          "https://upload.wikimedia.org/wikipedia/commons/b/b5/PRI_logo_%28Mexico%29.svg",
          "https://upload.wikimedia.org/wikipedia/commons/8/8f/PRD_logo_%28Mexico%29.svg",
          "https://upload.wikimedia.org/wikipedia/commons/e/e7/Worker%27s_Party_logo_%28Mexico%29.svg",
          "https://upload.wikimedia.org/wikipedia/commons/a/ae/Logo-partido-verde-2020.png",
          "https://upload.wikimedia.org/wikipedia/commons/3/34/Logo_Partido_Movimiento_Ciudadano_%28M%C3%A9xico%29.svg",
          "https://upload.wikimedia.org/wikipedia/commons/e/ea/Morena_logo_%28Mexico%29.svg",
          "https://upload.wikimedia.org/wikipedia/commons/7/7f/Logo_Encuentro_Solidario.svg",
          "https://upload.wikimedia.org/wikipedia/commons/d/d8/Partido_Nueva_Alianza_%28M%C3%A9xico%29.svg",
          "https://upload.wikimedia.org/wikipedia/commons/f/fb/PRS_logo_%28Mexico%29.svg",
          "https://upload.wikimedia.org/wikipedia/commons/e/e8/RSP_logo_%28Mexico%29.svg",
          "https://upload.wikimedia.org/wikipedia/commons/5/52/Partido_Socialdem%C3%B3crata_%28Mexico%29_Logo.png",
        ],
        labels: chartData.map((data) => data.nombre),
      },
      {
        label: "Votos",

        data: chartData.map((data) => 600),
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
          y.getPixelForValue(0) + 50,
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

  return (
    <>
      <Box
        display="flex"
        justifyContent={"center"}
        alignItems="center"
        height={"200px"}
        width="99%"
        pl="20px"
      >
        <Chart
          type="bar"
          height={500}
          ref={chartRef}
          data={data}
          plugins={[ChartDataLabels, imageItems]}
          options={{
            layout: {
              padding: {
                bottom: 50,
              },
            },

            interaction: {
              intersect: false,
              mode: "index",
            },
            indexAxis: "x",
            maintainAspectRatio: false,
            responsive: true,

            plugins: {
              title: {
                display: true,
                padding: {
                  top: 10,
                  bottom: 30,
                },
                text: "Porcentaje de votos",
              },
              tooltip: {
                filter: function (tooltipItem) {
                  // console.log("TOOLTIPITEM", tooltipItem);
                  return tooltipItem.datasetIndex === 0;
                },
                usePointStyle: true,
                callbacks: {
                  labelPointStyle: (context) => {
                    // console.log(context);
                    // console.log("Imagen", context.dataset.image[context.dataIndex]);
                    const image = new Image(15, 15);
                    image.src = context.dataset.image[context.dataIndex];
                    return {
                      pointStyle: image,
                    };
                  },
                  beforeTitle: (context) => {
                    return context[0].dataset.labels[context[0].dataIndex];
                  },
                },
              },
              legend: {
                display: false,
              },
              datalabels: {
                title: {
                  colo: "red",
                },
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
      </Box>
      <Divider sx={{ paddingTop: "1.5rem" }} />
    </>
  );
};
