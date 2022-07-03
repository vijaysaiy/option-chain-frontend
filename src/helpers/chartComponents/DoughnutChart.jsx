import React from "react";
import Chart from "react-apexcharts";

const DoughnutChart = ({ PETOI, CETOI, width, height }) => {
  // console.log(PETOI, CETOI);
  return (
    <>
      <Chart
        type="donut"
        height={height}
        width={width}
        series={[CETOI, PETOI]}
        options={{
          noData:{text:'Empty data'},
          theme: {
            mode: "dark",
          },
          labels: ["CE", "PE"],
          chart: {
            background: "#000",
          },
          tooltip: {
            followCursor: true,
          },
          dataLabels: {
            enabled: true,
            style: {
              fontSize: 12,
            },
          },
          fill: {
            type: "gradient",
          },
          legend: false,
          title: {
            style: {
              fontSize: 30,
            },
          },
          colors: ["#d90429", "#8ac926"],
          stroke: {
            colors: ["#000"],
          },
          noData:{
            text:"Loading ..."
          }
        }}
      ></Chart>
    </>
  );
};

export default DoughnutChart;
