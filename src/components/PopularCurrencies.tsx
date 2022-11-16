import React from "react";
import { Box, Grid, Typography, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { formatCurrency } from "./Converter";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: 1,
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
export const currencies = [
  "USD",
  "EUR",
  "JPY",
  "GBP",
  "AUD",
  "CAD",
  "CHF",
  "CNH",
  "HKD",
];

const PopularCurrenciesWrapper = () => {
  const baseCurrency = useSelector(
    (state: any) => state.exchange.from_currency
  );
  const amount = useSelector((state: any) => state.exchange.amount);
  const succeeded =
    useSelector((state: any) => state.exchange.status) === "succeeded";

  const rates = useSelector((state: any) => state.exchange.rates);

  return (
    <Box
      sx={{
        display: "flex",
        padding: 4,
      }}
    >
      {Object.keys(rates || {}).length && succeeded ? (
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {currencies.map((currency, index) =>
            rates[currency] ? (
              <Grid xs={2} sm={4} md={4} item key={index}>
                <Item
                  sx={{
                    height: 120,
                    borderRadius: 2,
                  }}
                >
                  <Typography>
                    {formatCurrency(amount, baseCurrency)} =
                    {formatCurrency(
                      (amount * rates[baseCurrency]) / rates[currency],
                      currency
                    )}
                  </Typography>
                </Item>
              </Grid>
            ) : null
          )}
        </Grid>
      ) : null}
    </Box>
  );
};

export { PopularCurrenciesWrapper };
