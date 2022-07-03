import axios from "axios";
export const Nifty_api = async () => {
  const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/nse-options-nifty`);
  return res.data.data;
};
export const BankNifty_api = async () => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_BASE_URL}/api/nse-options-banknifty`
  );
  return res.data.data;
};
