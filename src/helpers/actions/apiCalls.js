import axios from "axios";
export const Nifty_api = async () => {
  const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/nse/nifty`);
  return res.data;
};
export const BankNifty_api = async () => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_BASE_URL}/api/nse/banknifty`
  );
  return res.data;
};
