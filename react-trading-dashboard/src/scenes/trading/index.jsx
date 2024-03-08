import React, { useState, useEffect, useRef } from "react";
import { Box, Button, Select, MenuItem, useTheme } from "@mui/material";
import { createChart } from "lightweight-charts";
import { tokens } from "../../theme";

const Trading = () => {
  const [symbol, setSymbol] = useState("BTCUSD");
  const [timeframe, setTimeframe] = useState("1D");
  const [chartType, setChartType] = useState("Candlestick");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const chartContainerRef = useRef();

  // Mock data for testing the chart
  const mockData = [
    { time: "2021-04-10", open: 70000, high: 70200, low: 69800, close: 70100 },
    { time: "2021-04-11", open: 71100, high: 73200, low: 69800, close: 74100 },
    { time: "2021-04-12", open: 72100, high: 72200, low: 71000, close: 71100 },
    { time: "2021-04-13", open: 70000, high: 70200, low: 69800, close: 70100 },
    { time: "2021-04-14", open: 71100, high: 73200, low: 69800, close: 74100 },
    { time: "2021-04-15", open: 72100, high: 72200, low: 71000, close: 71100 },
    { time: "2021-04-16", open: 70000, high: 70200, low: 69800, close: 70100 },
    { time: "2021-04-17", open: 71100, high: 73200, low: 69800, close: 74100 },
    { time: "2021-04-18", open: 72100, high: 72200, low: 71000, close: 71100 },
    { time: "2021-04-19", open: 70000, high: 70200, low: 69800, close: 70100 },
    { time: "2021-04-20", open: 71100, high: 73200, low: 69800, close: 74100 },
    { time: "2021-04-21", open: 72100, high: 72200, low: 71000, close: 71100 }
  ];

  useEffect(() => {
    if (chartContainerRef.current) {
      const chart = createChart(chartContainerRef.current, {
        width: chartContainerRef.current.clientWidth,
        height: 500,
        layout: {
          background: colors.primary[400],
          textColor: colors.grey[100]
        }
      });
      let series;

      switch (chartType) {
        case "Candlestick":
          series = chart.addCandlestickSeries();
          break;
        case "Line":
          series = chart.addLineSeries();
          break;
        // Add other chart types as needed
        default:
          series = chart.addCandlestickSeries();
      }

      series.setData(mockData);

      return () => chart.remove();
    }
  }, [symbol, timeframe, chartType, theme]);

  return (
    <Box>
      <Box>
        <Select value={symbol} onChange={(e) => setSymbol(e.target.value)}>
          <MenuItem value="BTCUSD">BTC/USD</MenuItem>
          <MenuItem value="ETHUSD">ETH/USD</MenuItem>
        </Select>
        <Select
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
        >
          <MenuItem value="1D">1 Day</MenuItem>
          <MenuItem value="1W">1 Week</MenuItem>
        </Select>
        <Select
          value={chartType}
          onChange={(e) => setChartType(e.target.value)}
        >
          <MenuItem value="Candlestick">Candlestick</MenuItem>
          <MenuItem value="Line">Line</MenuItem>
          {/* Add more chart types as needed */}
        </Select>
      </Box>
      <Box
        ref={chartContainerRef}
        id="chart-container"
        sx={{ height: "500px" }}
      >
        {/* Chart will be rendered here */}
      </Box>
      <Box>
        <Button variant="contained" color="primary">
          Buy
        </Button>
        <Button variant="contained" color="secondary">
          Sell
        </Button>
      </Box>
    </Box>
  );
};

export default Trading;
