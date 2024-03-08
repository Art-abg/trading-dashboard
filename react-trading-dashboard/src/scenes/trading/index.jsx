import React, { useState, useEffect, useRef } from "react";
import { Box, Button, Select, MenuItem, useTheme } from "@mui/material";
import { createChart, ColorType } from "lightweight-charts";
import { tokens } from "../../theme";
import Data from "./data";

const Trading = () => {
  const [symbol, setSymbol] = useState("BTCUSD");
  const [timeframe, setTimeframe] = useState("1D");
  const [chartType, setChartType] = useState("Candlestick");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { data } = Data();
  const chartContainerRef = useRef();
  const chartRef = useRef();

  useEffect(() => {
    if (chartContainerRef.current && !chartRef.current) {
      const chart = createChart(chartContainerRef.current, {
        width: chartContainerRef.current.clientWidth,
        height: 500,
        layout: {
          background: { type: ColorType.Solid, color: colors.primary[400] },
          textColor: colors.grey[100]
        },
        grid: {
          vertLines: { color: colors.grey[700] },
          horzLines: { color: colors.grey[700] }
        }
      });
      chartRef.current = chart;
    }

    const chart = chartRef.current;
    if (chart) {
      let series;

      switch (chartType) {
        case "Candlestick":
          series = chart.addCandlestickSeries();
          break;
        case "Line":
          series = chart.addLineSeries();
          break;
        case "Area":
          series = chart.addAreaSeries();
          break;
        case "Histogram":
          series = chart.addHistogramSeries();
          break;
        case "Bar":
          series = chart.addBarSeries();
          break;
        case "Renko":
          series = chart.addRenkoSeries();
          break;
        default:
          series = chart.addCandlestickSeries();
      }
      series.setData(data);

      const lastVisibleRange = chart.timeScale().getVisibleRange();
      if (lastVisibleRange) {
        const newVisibleRange = {
          from: lastVisibleRange.from,
          to: data[data.length - 1].time
        };
        chart.timeScale().setVisibleRange(newVisibleRange);
      }
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
      }
    };
  }, [symbol, timeframe, chartType, theme, colors.primary, colors.grey, data]);

  return (
    <Box m="30px">
      <Box mb="10px">
        <Select
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          sx={{ mr: "10px" }}
        >
          <MenuItem value="BTCUSD">BTC/USD</MenuItem>
          <MenuItem value="ETHUSD">ETH/USD</MenuItem>
        </Select>
        <Select
          sx={{ mr: "10px" }}
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
        >
          <MenuItem value="1m">1 Minute</MenuItem>
          <MenuItem value="1D">1 Day</MenuItem>
          <MenuItem value="1W">1 Week</MenuItem>
          <MenuItem value="1M">1 Month</MenuItem>
          <MenuItem value="1Y">1 Year</MenuItem>
        </Select>
        <Select
          value={chartType}
          onChange={(e) => setChartType(e.target.value)}
        >
          <MenuItem value="Candlestick">Candlestick</MenuItem>
          <MenuItem value="Line">Line</MenuItem>
          <MenuItem value="Area">Area</MenuItem>
          <MenuItem value="Histogram">Histogram</MenuItem>
          <MenuItem value="Bar">Bar</MenuItem>
          <MenuItem value="Renko">Renko</MenuItem>

          {/* Add more chart types as needed */}
        </Select>
      </Box>
      <Box
        ref={chartContainerRef}
        id="chart-container"
        sx={{ height: "500px", width: "100%" }}
      >
        {/* Chart will be rendered here */}
      </Box>
      <Box mt="10px" display="flex" justifyContent="center">
        <Button variant="contained" color="secondary" sx={{ mr: "10px" }}>
          Buy
        </Button>
        <Button variant="contained" color="red">
          Sell
        </Button>
      </Box>
    </Box>
  );
};

export default Trading;
