import React, { useEffect, useRef, useState } from "react";
import { Bar, Chart } from "react-chartjs-2";
import { Chart as chartJS } from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useParams } from "react-router-dom";
import { Box, Button, Divider, Grid, Typography } from "@mui/material";

export const ChartPlanilla = ({
  chartData = [
    { votos: 50 },
    { votos: 10 },
    { votos: 100 },
    { votos: 140 },
    { votos: 80 },
  ],
  candidatos = [],
  totalV = 1,
}) => {
  const total = 50;
  const chartRef = useRef(null);
  const params = useParams();
  const [result, setresult] = useState(candidatos);
  const [totalS, setTotalS] = useState(totalV);
  useEffect(() => {
    console.log("grafica", candidatos);
    console.log("grafica", candidatos);
    setresult(candidatos);
  }, [candidatos]);

  useEffect(() => {
    console.log("total", totalV);
    setTotalS(totalV);
  }, [totalV]);

  const [data, setData] = useState({
    // labels: chartData.map((data) => data.nombre),
    labels: result?.map((data) => {
      let name = [];
      console.log("Candidatos:", data.candidatos);
      data.candidatos?.map((can) => {
        name.push(can?.nombreCandidato);
      });
      return name;
    }),
    datasets: [
      {
        label: "Votos",
        data: result.map((data) => data.votos),
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
        /* image: result.map((data) => {
          const link = data.fotoCandidato ? data.fotoCandidato : "";
          if (!link.includes("http")) {
            return "https://cdn-icons-png.flaticon.com/512/1475/1475137.png";
          } else return data.fotoCandidato;
        }), */
        image: [],
        labels: chartData.map((data) => ""),
      },
      {
        label: "Votos",

        data: chartData.map((data) => totalS),
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
          y.getPixelForValue(0) + 60,
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
      <Chart
        type="bar"
        height={500}
        ref={chartRef}
        data={data}
        plugins={[ChartDataLabels, imageItems]}
        options={{
          maintainAspectRatio: false,
          responsive: true,
          layout: {
            padding: {
              bottom: 60,
            },
          },

          interaction: {
            intersect: false,
            mode: "index",
          },
          indexAxis: "x",

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
                    return ((value * 100) / totalS).toFixed(2) + "%";
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
    </>
  );
};
