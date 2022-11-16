import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { Converter, useExchangeDispatch } from "../components/Converter";
import { HistoricalData } from "../components/HistoricalData";
import { setFromCurrency, setToCurrency } from "../reducers/exchangeSlice";
const DetailsPage = () => {
  const { currency1, currency2 } = useParams();
  const dispatch = useExchangeDispatch();

  useEffect(() => {
    dispatch(setFromCurrency(currency1));
    dispatch(setToCurrency(currency2));
  }, [currency1, currency2, dispatch]);
  if (!currency1 || !currency2) {
    return null;
  }

  return (
    <>
      <Typography
        variant="h5"
        sx={{
          textAlign: "left",
          fontWeight: "bold",
          mb: 2,
          mx: 4,
        }}
      >
        Currency Exchanger
      </Typography>
      <Converter showDetails={false} />
      <HistoricalData currency1={currency1} currency2={currency2} />
    </>
  );
};

export { DetailsPage };
