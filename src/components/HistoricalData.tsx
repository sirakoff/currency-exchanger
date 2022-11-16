import Paper from "@mui/material/Paper";
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  LineSeries,
  Title,
  Legend,
} from "@devexpress/dx-react-chart-material-ui";
import { styled } from "@mui/material/styles";
import { Animation } from "@devexpress/dx-react-chart";
import { useEffect } from "react";
import { useExchangeDispatch } from "../components/Converter";
import { fetchHistoricalRates } from "../reducers/exchangeSlice";

const classes = {
  chart: `exchange-chart`,
};
const StyledChart = styled(Chart)(() => ({
  [`&.${classes.chart}`]: {
    paddingRight: "20px",
  },
}));

const format = () => (tick: any) => tick;

const Root = (props: any) => (
  <Legend.Root
    {...props}
    sx={{ display: "flex", margin: "auto", flexDirection: "row" }}
  />
);
const Label = (props: any) => (
  <Legend.Label sx={{ pt: 1, whiteSpace: "nowrap" }} {...props} />
);
const Item = (props: any) => (
  <Legend.Item sx={{ flexDirection: "column" }} {...props} />
);

const ValueLabel = (props: any) => {
  const { text } = props;
  return <ValueAxis.Label {...props} text={`${text}`} />;
};
const TitleText = (props: any) => (
  <Title.Text {...props} sx={{ whiteSpace: "pre" }} />
);

interface HistoricalDataProps {
  currency1: string;
  currency2: string;
}

const HistoricalData = (props: HistoricalDataProps) => {
  const dispatch = useExchangeDispatch();

  useEffect(() => {
    dispatch(fetchHistoricalRates(""));
  });
  return (
    <Paper>
      <StyledChart
        data={[]}
        //   className={classes.chart}
      >
        <ArgumentAxis tickFormat={format} />
        <ValueAxis
          // max={50}
          labelComponent={ValueLabel}
        />

        <LineSeries
          name={props.currency1}
          valueField={props.currency1}
          argumentField="month"
        />
        <LineSeries
          name={props.currency2}
          valueField={props.currency2}
          argumentField="month"
        />
        <Legend
          position="bottom"
          rootComponent={Root}
          itemComponent={Item}
          labelComponent={Label}
        />
        <Title
          text={`History Rates for ${props.currency1} & ${props.currency2}`}
          textComponent={TitleText}
        />
        <Animation />
      </StyledChart>
    </Paper>
  );
};

export { HistoricalData };
