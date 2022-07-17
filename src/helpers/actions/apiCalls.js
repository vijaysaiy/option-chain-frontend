import axios from "axios";
export const Nifty_api = async () => {
  // const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/nse/nifty`);
  const res = await axios.get(
    "https://www.nseindia.com/api/option-chain-indices?symbol=NIFTY"
  );
  return res.data;
};
export const BankNifty_api = async () => {
  // const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/nse/banknifty`);
  const res = await axios.get("https://www.nseindia.com/api/option-chain-indices?symbol=BANKNIFTY")
  return res.data;
};
