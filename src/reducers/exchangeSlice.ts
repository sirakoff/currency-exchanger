import { createSlice } from '@reduxjs/toolkit'
import { fixerRequest } from "../utils/request";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { currencies } from '../components/PopularCurrencies';
import moment from 'moment';

interface ExchangeState {
  amount: number,
  dirty: Boolean,
  from_currency: string,
  to_currency: string,
  status: string,
  error: string | null,
  rates: any
}

const initialState =  {
  amount: 1,
  dirty: true,
  from_currency: "EUR",
  to_currency: "USD",
  status: 'idle',
  error: null,
  rates: {}
} as ExchangeState;


export const fetchRates = createAsyncThunk(
  "rates/fetchRates",
  async (arg:any, thunk:any) => {
    const exchange:any = thunk.getState().exchange;

    const response: any = await fixerRequest<Body>(
      `https://api.apilayer.com/fixer/latest?symbols=${currencies.join(
        ","
      )}&base=${exchange.from_currency}`
    );
    
    return response.rates;
  }
);

export const fetchHistoricalRates = createAsyncThunk('historicalRates/fetchHistoricalRates', async (arg:any, thunk:any) => {
  const exchange:ExchangeState = thunk.getState().exchange;

  const start_date = moment().subtract(1, 'year').format('YYYY-MM-DD');
  const end_date = moment().format('YYYY-MM-DD');

  const symbols = [exchange.from_currency, exchange.to_currency].join(',')

  const response: any = await fixerRequest<Body>(
    `https://api.apilayer.com/fixer/timeseries?start_date=${start_date}&end_date=${end_date}&symbols=${symbols}`, {}, 10000
  );

  console.log(response);
  
  return response.rates;
});

export const exchangeSlice = createSlice({
  name: 'exchange',
  initialState,
  reducers: {
    setFromCurrency: (state, action) => {
      
      if (action.payload !== state.from_currency) {

        state.dirty = true;

      }
      state.from_currency = action.payload


    },
    setDirty: (state, action) => {
      state.dirty = action.payload
    },
    setToCurrency: (state, action) => {
      state.to_currency = action.payload
    },
    setAmount: (state, action) => {
      state.amount = action.payload
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchRates.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchRates.fulfilled, (state, action) => {
        state.status = 'succeeded'
        // Add any fetched posts to the array
        state.rates = action.payload;
      })
      .addCase(fetchRates.rejected, (state, action) => {
        state.status = 'failed'
        // state.error = action.error.message
      })
  }
})

// Action creators are generated for each case reducer function
export const { setAmount, setFromCurrency, setToCurrency, setDirty } = exchangeSlice.actions

export default exchangeSlice.reducer