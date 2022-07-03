import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Chart from "react-apexcharts";

const BarChart = ({
  CE_Data,
  PE_Data,
  strikePrice,
  ATM,
  title,
  height,
  width,
  condition,
}) => {
  // const [sp, setSP] = useState([]);

  // useEffect(() => {
  //   if (ATM && strikePrice.length) {
  //     setSP(strikePrice);
  //     getATMandStrikePrice();
  //   }
  // }, []);

  // const getATMandStrikePrice = () => {
  let atm = Math.ceil(ATM / 100) * 100;
  let index = strikePrice?.indexOf(atm);
  // let strikePrice1 = strikePrice?.slice(index, index + 11);
  // let strikePrice2 = strikePrice?.slice(index - 10, index);
  var strikePrices = [],
    CE_Datas = [],
    PE_Datas = [];
  if (ATM && strikePrice.length) {
    // console.log(strikePrice?.slice(index, index + 21));
    // console.log(strikePrice?.slice(index - 20, index));
    strikePrices = [
      ...strikePrice?.slice(index - 20, index),
      ...strikePrice?.slice(index, index + 21),
    ];
    CE_Datas = [
      ...CE_Data?.slice(index - 20, index),
      ...CE_Data?.slice(index, index + 21),
    ];
    PE_Datas = [
      ...PE_Data?.slice(index - 20, index),
      ...PE_Data?.slice(index, index + 21),
    ];
  }
  // console.log(strikePrices);
  // setSP(strikePrices);
  // };

  // console.log("strikePrice after atm===>", strikePrice);

  return (
    <>
      <Chart
        type="bar"
        width={width}
        height={height}
        series={
          condition
            ? [{ name: "", data: [CE_Data, PE_Data] }]
            : [
                { name: "CE_Data", data: CE_Datas },
                { name: "PE_Data", data: PE_Datas },
              ]
        }
        options={{
          annotations: condition
            ? {}
            : {
                xaxis: [
                  {
                    x: atm,
                    borderColor: "#a2d2ff",
                    label: {
                      style: {
                        color: "#000",
                      },
                      borderColor: "#00E396",
                      orientation: "horizontal",
                      text: `ATM Strike ${ATM}`,
                    },
                  },
                ],
              },
          theme: {
            mode: "dark",
          },
          chart: {
            background: "#000",
          },
          plotOptions: {
            bar: {
              distributed: condition ? true : false,
              columnWidth: "70%",
              endingShape: "rounded",
              dataLabels: {
                position: "top",
                orientation: "vertical",
              },
            },
          },
          stroke: {
            show: true,
            // width: 10,
            colors: ["transparent"],
          },
          colors: ["#d90429", "#8ac926"],
          tooltip: {
            followCursor: true,
          },
          dataLabels: {
            enabled: condition ? false : true,
          },
          yaxis: {
            tickAmount: condition ? 4 : 6,
            title: {
              text: title,
            },
          },
          xaxis: {
            // tickAmount: condition ? 2 : 21,
            tickPlacement: "on",
            categories: condition ? ["CE_chg", "PE_chg"] : strikePrices,
            title: {
              text: condition ? "" : "Strike Price",
              style: {
                fontSize: 15,
              },
            },
          },

          legend: { show: condition ? false : true },
          title: {
            style: {
              fontSize: 30,
            },
          },
          grid: {
            borderColor: "#000",
          },
          noData: {
            text: "Loading ...",
          },
        }}
      ></Chart>
    </>
  );
};

export default BarChart;
