import React, { useCallback } from "react";
import {
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Paper,
  IconButton,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import LoadingButton from "@mui/lab/LoadingButton";
import useMediaQuery from "@mui/material/useMediaQuery";

import {
  fetchRates,
  setAmount,
  setDirty,
  setFromCurrency,
  setToCurrency,
} from "../reducers/exchangeSlice";
import { currencies } from "./PopularCurrencies";
import { ExchangeDispatch } from "../store";
import { SwapHorizOutlined } from "@mui/icons-material";
import { Theme } from "@mui/system";
import { ButtonLink } from "./ButtonLink";

const regexPattern = /^\d+$/;

export const useExchangeDispatch = () => useDispatch<ExchangeDispatch>();
export const formatCurrency = (amount: number, currency: string) =>
  amount.toLocaleString("en-US", {
    style: "currency",
    currency: currency,
  });

interface ConvertorProps {
  showDetails: Boolean;
}

const Converter = (props: ConvertorProps) => {
  const { showDetails } = props;
  const exchange = useSelector((state: any) => state.exchange);
  const isLoading = exchange.status === "loading";
  const hasInputError = !regexPattern.test(exchange.amount);
  const smallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.up("sm")
  );

  const dispatch = useExchangeDispatch();

  const menuItems = currencies.map((c) => (
    <MenuItem disabled={c === exchange.to_currency} value={c} key={c}>
      {c}
    </MenuItem>
  ));

  const onAmountChange = useCallback(
    (e: any) => dispatch(setAmount(e.target.value)),
    [dispatch]
  );

  const onFromCurrencyChange = useCallback(
    (e: any) => dispatch(setFromCurrency(e.target.value)),
    [dispatch]
  );
  const onToCurrencyChange = useCallback(
    (e: any) => dispatch(setToCurrency(e.target.value)),
    [dispatch]
  );

  const getAmount = (val?: number) => {
    if (Object.keys(exchange.rates).length) {
      return (
        ((val || 1) * exchange.rates[exchange.from_currency]) /
        exchange.rates[exchange.to_currency]
      );
    } else {
      return 0;
    }
  };

  const convert = useCallback(
    (_: any) => {
      dispatch(fetchRates(_));
      dispatch(setDirty(false));
    },
    [dispatch]
  );

  const onSwapCurrency = useCallback(() => {
    dispatch(setFromCurrency(exchange.to_currency));
    dispatch(setToCurrency(exchange.from_currency));
  }, [dispatch, exchange.to_currency, exchange.from_currency]);

  return (
    <Grid container>
      <Grid
        item
        xs={12}
        sx={{
          mx: 4,
        }}
      >
        <Paper
          sx={{
            padding: 5,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyItems: "space-between",
              pt: 2,

              flexDirection: smallScreen ? "row" : "column",
            }}
          >
            <Box
              sx={{
                flex: smallScreen ? 0.35 : 1,
                display: "flex",
                alignItems: "flex-start",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <TextField
                onChange={onAmountChange}
                label="Amount"
                type="number"
                value={exchange.amount}
                error={hasInputError}
                disabled={isLoading}
                fullWidth={smallScreen ? false : true}
              />

              <Typography
                sx={{
                  py: 1,
                }}
              >
                {formatCurrency(1, exchange.from_currency)} =
                {formatCurrency(getAmount(), exchange.to_currency)}{" "}
              </Typography>
            </Box>
            <Box
              sx={{
                flex: 1,
                display: "flex",
                // alignItems: "center",
                flexDirection: "column",
                px: smallScreen ? 1 : 0,
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={5}>
                  <Box>
                    <FormControl fullWidth>
                      <InputLabel id="select-currency-from">From</InputLabel>
                      <Select
                        labelId="select-currency-from"
                        disabled={hasInputError || isLoading}
                        //   value={age}
                        label="From"
                        value={exchange.from_currency}
                        onChange={onFromCurrencyChange}
                        fullWidth
                      >
                        {menuItems}
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={2}>
                  <IconButton onClick={onSwapCurrency}>
                    <SwapHorizOutlined />
                  </IconButton>
                </Grid>
                <Grid item xs={12} sm={5}>
                  <Box>
                    <FormControl fullWidth>
                      <InputLabel id="select-currency-to">To</InputLabel>
                      <Select
                        labelId="select-currency-to"
                        disabled={hasInputError || isLoading}
                        label="To"
                        value={exchange.to_currency}
                        onChange={onToCurrencyChange}
                        fullWidth
                      >
                        {menuItems}
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <LoadingButton
                      variant="outlined"
                      loading={isLoading}
                      disabled={hasInputError || !exchange.dirty}
                      onClick={convert}
                      fullWidth
                    >
                      Convert
                    </LoadingButton>
                  </FormControl>
                </Grid>
              </Grid>

              <Box
                sx={{ display: "flex", width: "100%", flexDirection: "row" }}
              >
                <TextField
                  sx={{
                    flex: 1,
                  }}
                  disabled
                  label=""
                  value={formatCurrency(
                    getAmount(exchange.amount),
                    exchange.to_currency
                  )}
                />

                {showDetails ? (
                  // <Box

                  // >
                  <ButtonLink
                    sx={{
                      flex: 1,
                    }}
                    text="More Details"
                    link={`/details/${exchange.from_currency}/${exchange.to_currency}`}
                  />
                ) : // </Box>
                null}
              </Box>
            </Box>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export { Converter };
