import React, { useEffect, useState } from "react";
import { BankNifty_api, Nifty_api } from "../../helpers/actions/apiCalls";
import BankNifty from "../../helpers/charts/bankNifty/BankNifty";
import Nifty from "../../helpers/charts/nifty/Nifty";
import "./dashboard.css";

const Dashboard = () => {
  const [niftyData, setNiftyData] = useState([]);
  const [bankNiftyData, setBankNiftyData] = useState([]);
  const [niftyCETOI, setNiftyCETOI] = useState(0);
  const [niftyPETOI, setNiftyPETOI] = useState(0);
  const [bankNiftyCETOI, setBankNiftyCETOI] = useState(0);
  const [bankNiftyPETOI, setBankNiftyPETOI] = useState(0);
  let [refreshCount, setRefreshCount] = useState(0);
  const [expiryDate, setExpiryDate] = useState([]);
  const [nifty50, setNifty50] = useState(0);
  const [bankNifty, setBankNifty] = useState(0);

  useEffect(() => {
    fetchNiftyData();
    fetchBankNiftyData();
  }, [refreshCount]);
  
  async function fetchNiftyData() {
    const { filtered, records } = await Nifty_api();
    // console.log("NIFTY DATA",filtered)
    const { CE, PE } = filtered;
    setExpiryDate(records.expiryDates);
    setNiftyCETOI(CE.totOI);
    setNiftyPETOI(PE.totOI);
    setNiftyData(filtered.data);
    setNifty50(records.underlyingValue);
  }
  
  async function fetchBankNiftyData() {
    const { filtered, records } = await BankNifty_api();
    // console.log("BANK NIFTY DATA",filtered)
    const { CE, PE } = filtered;
    setBankNiftyCETOI(CE.totOI);
    setBankNiftyPETOI(PE.totOI);
    setBankNiftyData(filtered.data);
    setBankNifty(records.underlyingValue);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshCount(refreshCount++);
    }, 60000);
    return () => clearInterval(interval);
  }, []);
  // console.log(refreshCount);

  return (
    <>
      <div className="container-fluid pb-1" style={{"backgroundColor":"black"}}>
        <div className="date-dropdown">
          <h6>Expiry Dates:</h6>
          <div className="expiryDates">
            <select className="form-select form-select-sm text-light" style={{"backgroundColor":"black"}}>
              {/* {expiryDate.map((d, index) => (
                <option value={index}>{d}</option>
              ))} */}
              <option value={1}>{expiryDate[0]}</option>
              <option value={2}>{expiryDate[1]}</option>
            </select>
          </div>
          <div className="nifty-data">
            <div className="nifty50">
              <div
                class="card border-dark nifty50-h"
                style={{ backgroundColor: "black" }}
              >
                <div class="card-header text-light">
                  <div style={{"fontWeight":"bold"}}>Nifty</div>
                  <div>{nifty50}</div>
                </div>
              </div>
            </div>
            <div className="bankNifty">
              <div
                class="card border-dark"
                style={{ backgroundColor: "black" }}
              >
                <div class="card-header text-light">
                  <div style={{"fontWeight":"bold"}}>BankNifty</div>
                  <div>{bankNifty}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ul
          className="nav nav-pills mb-3 pb-1 container-tabs navbar-dark bg-dark"
          id="pills-tab"
          role="tablist"
        >
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active assign-button"
              id="pills-home-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-home"
              type="button"
              role="tab"
              aria-controls="pills-home"
              aria-selected="true"
            >
              Nifty
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link assign-button"
              id="pills-profile-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-profile"
              type="button"
              role="tab"
              aria-controls="pills-profile"
              aria-selected="false"
            >
              Bank Nifty
            </button>
          </li>
        </ul>
        <div className="tab-content tab-container" id="pills-tabContent">
          <div
            className="tab-pane fade show active tab-container"
            id="pills-home"
            role="tabpanel"
            aria-labelledby="pills-home-tab"
            tabIndex="0"
          >
            <Nifty
              niftyData={niftyData}
              niftyCETOI={niftyCETOI}
              niftyPETOI={niftyPETOI}
            />
          </div>
          <div
            className="tab-pane fade"
            id="pills-profile"
            role="tabpanel"
            aria-labelledby="pills-profile-tab"
            tabIndex="0"
          >
            <BankNifty
              bankNiftyData={bankNiftyData}
              bankNiftyCETOI={bankNiftyCETOI}
              bankNiftyPETOI={bankNiftyPETOI}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
