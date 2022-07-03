import React from "react";
import "./bankNifty.css";
import BarChart from "../../chartComponents/BarChart";
import DoughnutChart from "../../chartComponents/DoughnutChart";

const BankNifty = ({ bankNiftyData, bankNiftyPETOI, bankNiftyCETOI }) => {
  const CE_Data = [];
  const strikePrice = [];
  const PE_Data = [];
  const CE_COI = [];
  const PE_COI = [];
  let chg = [];
  var change_ce = 0,
    change_pe = 0;
  let ATM = 0;
  bankNiftyData.map((d) => {
    CE_Data.push(d.CE.openInterest);
    strikePrice.push(d.strikePrice);
    PE_Data.push(d.PE.openInterest);
    CE_COI.push(d.CE.changeinOpenInterest);
    PE_COI.push(d.PE.changeinOpenInterest);
    change_ce += d.CE.changeinOpenInterest;
    change_pe += d.PE.changeinOpenInterest;
    ATM = Math.ceil(d.CE.underlyingValue);
  });

  chg[0] = change_pe;
  chg[1] = change_ce;

  return (
    <>
      <div className="container-fluid">
        <div className="container-top row">
          <div className="container-left col-sm">
            <BarChart
              CE_Data={CE_COI}
              PE_Data={PE_COI}
              strikePrice={strikePrice}
              ATM={ATM}
              title="Change in OI"
              height={500}
              width={1200}
            />
          </div>
          <div className="container-right col-sm">
            <div className="container-chg row">
              <div className="bar-chg col-sm">
                {/* CE_chg vs PE_chg */}
                <BarChart
                  CE_Data={chg[1]}
                  PE_Data={chg[0]}
                  ATM=""
                  title=""
                  height={200}
                  width={300}
                  condition={true}
                />
              </div>
              <div className="display-chg col-sm">
                <h6>Change in P/C</h6>
                <ul>
                  <li style={{ color: "green" }}>Change PE OI</li>
                  <span>{chg[0]?.toLocaleString("en-IN")}</span>
                </ul>
                <ul>
                  <li style={{ color: "red" }}>Change CE OI</li>
                  <span>{chg[1]?.toLocaleString("en-IN")}</span>
                </ul>
              </div>
            </div>
            <div className="doughnut-container row">
              {/* <h6>Total OI</h6> */}
              <div className="doughnut-left col-sm">
                <DoughnutChart
                  PETOI={bankNiftyPETOI}
                  CETOI={bankNiftyCETOI}
                  height={250}
                  width={300}
                />
              </div>
              <div className="doughnut-right col-sm">
                <h6>P/C ratio net</h6>
                <ul>
                  <li style={{ color: "green" }}>Total PE OI</li>
                  <span>{bankNiftyPETOI?.toLocaleString("en-IN")}</span>
                </ul>
                <ul>
                  <li style={{ color: "red" }}>Total CE OI</li>
                  <span>{bankNiftyCETOI?.toLocaleString("en-IN")}</span>
                </ul>
                <p>PCR: {(bankNiftyPETOI / bankNiftyCETOI).toFixed(2)}</p>
              </div>
            </div>
          </div>
          <br />
        </div>
        <div className="container-bottom">
          <BarChart
            CE_Data={CE_Data}
            PE_Data={PE_Data}
            strikePrice={strikePrice}
            ATM={ATM}
            title="Open interest"
            height={500}
            width={1300}
          />
        </div>
      </div>
    </>
  );
};

export default BankNifty;
