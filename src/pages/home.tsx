import Typography from "@mui/material/Typography";
import { Converter } from "../components/Converter";
import { PopularCurrenciesWrapper } from "../components/PopularCurrencies";
const HomePage = () => {
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
      <Converter showDetails />
      <PopularCurrenciesWrapper />
    </>
  );
};

export { HomePage };
