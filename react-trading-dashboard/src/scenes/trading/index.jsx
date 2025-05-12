import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  Select,
  MenuItem,
  TextField,
  useTheme,
  Stack,
  useMediaQuery
} from "@mui/material";
import {
  createChart,
  ColorType,
  CandlestickSeries,
  LineSeries,
  AreaSeries,
  HistogramSeries,
  BarSeries
} from "lightweight-charts";
import { tokens } from "../../theme";
import useChartData from "./data";
import { calculateRenkoBricks } from "./renkoUtils";

const Trading = () => {
  const [symbol, setSymbol] = useState("BTCUSDT");
  const [timeframe, setTimeframe] = useState("1m");
  const [chartType, setChartType] = useState("Candlestick");
  const [boxSize, setBoxSize] = useState(100);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Extract colors used in useEffect to satisfy exhaustive-deps
  const chartBackgroundColor = colors.primary[400];
  const chartTextColor = colors.grey[100];
  const chartGridColor = colors.grey[700];
  const candleUpColor = colors.greenAccent[600];
  const candleDownColor = colors.redAccent[600];
  const lineAreaColor = colors.blueAccent[500];
  const areaTopColor = colors.blueAccent[700];
  const areaBottomColor = colors.blueAccent[900];

  const chartContainerRef = useRef();
  const chartRef = useRef();
  const seriesRef = useRef(); // Ref to hold the current series instance

  const { data: chartData } = useChartData(symbol, timeframe, 1000);

  useEffect(() => {
    // Ensure chart container is available
    if (!chartContainerRef.current) {
      return;
    }

    // Initialize chart instance if it doesn't exist
    let chart = chartRef.current;
    if (!chart) {
      chart = createChart(chartContainerRef.current, {
        width: chartContainerRef.current.clientWidth,
        height: 500, // Or dynamic height
        layout: {
          background: { type: ColorType.Solid, color: chartBackgroundColor },
          textColor: chartTextColor
        },
        grid: {
          vertLines: { color: chartGridColor },
          horzLines: { color: chartGridColor }
        },
        timeScale: {
          rightOffset: 12,
          barSpacing: 3,
          fixLeftEdge: true,
          lockVisibleTimeRangeOnResize: true,
          rightBarStaysOnScroll: true,
          timeVisible: true,
          secondsVisible: false
        }
        // Add other necessary chart options...
      });
      chartRef.current = chart;
    }

    // Determine data format and options based on chart type
    let transformedData = chartData; // Default to original data
    let seriesOptions = {};
    let seriesType = CandlestickSeries; // Default series type

    if (chartType === "Candlestick") {
      seriesOptions = {
        upColor: candleUpColor,
        downColor: candleDownColor,
        borderVisible: false,
        wickUpColor: candleUpColor,
        wickDownColor: candleDownColor
      };
      // Data format is already { time, open, high, low, close }
    } else if (chartType === "Renko") {
      seriesType = CandlestickSeries; // Use Candlestick to draw Renko bricks
      seriesOptions = {
        upColor: candleUpColor,
        downColor: candleDownColor,
        borderVisible: false,
        // Make wicks same color as body for solid brick look
        wickUpColor: candleUpColor,
        wickDownColor: candleDownColor
      };
      // Calculate Renko bricks
      if (chartData) {
        transformedData = calculateRenkoBricks(chartData, boxSize);
      }
    } else if (chartType === "Bar") {
      seriesType = BarSeries;
      seriesOptions = {
        upColor: candleUpColor, // Use same colors as candlestick for consistency
        downColor: candleDownColor
      };
      // Data format is already { time, open, high, low, close }
    } else if (chartType === "Line") {
      seriesType = LineSeries;
      seriesOptions = { color: lineAreaColor };
      // Transform data to { time, value }
      if (chartData) {
        transformedData = chartData.map((d) => ({
          time: d.time,
          value: d.close
        }));
      }
    } else if (chartType === "Area") {
      seriesType = AreaSeries;
      seriesOptions = {
        lineColor: lineAreaColor,
        topColor: areaTopColor,
        bottomColor: areaBottomColor
      };
      // Transform data to { time, value }
      if (chartData) {
        transformedData = chartData.map((d) => ({
          time: d.time,
          value: d.close
        }));
      }
    } else if (chartType === "Histogram") {
      seriesType = HistogramSeries;
      seriesOptions = {
        color: lineAreaColor // Use a consistent color
      };
      // Transform data to { time, value }
      if (chartData) {
        transformedData = chartData.map((d) => ({
          time: d.time,
          value: d.close
        })); // Using 'close' for value, adjust if needed (e.g., use volume)
      }
    }
    // Add other types as needed

    // Check if the series type or boxSize (for Renko) requires recreating the series
    let currentSeries = seriesRef.current;
    const seriesTypeChanged = seriesRef.current?.seriesType !== chartType;
    const boxSizeChanged =
      chartType === "Renko" && seriesRef.current?.boxSize !== boxSize;

    if (!currentSeries || seriesTypeChanged || boxSizeChanged) {
      // Remove old series if it exists
      if (currentSeries) {
        chart.removeSeries(currentSeries);
      }

      // Use the determined seriesType
      currentSeries = chart.addSeries(seriesType, seriesOptions);

      seriesRef.current = currentSeries; // Store the newly created series
      seriesRef.current.seriesType = chartType; // Store the type for comparison
      if (chartType === "Renko") {
        seriesRef.current.boxSize = boxSize; // Store boxSize for comparison
      }
    }

    // Update the data for the current series using the transformed data
    if (currentSeries && transformedData && transformedData.length > 0) {
      currentSeries.setData(transformedData);
      // Optional: Fit content after initial data load or type change
      if (seriesTypeChanged) {
        // chart.timeScale().fitContent(); // Uncomment if you want fitContent on type change
      }
    }

    // Resize handler setup remains the same
    const handleResize = () => {
      const chart = chartRef.current;
      if (chart) {
        // Update the chart dimensions without resetting its state
        chart.applyOptions({
          width: chartContainerRef.current.clientWidth,
          height: chartContainerRef.current.clientHeight
        });

        // If necessary, restore the chart's position and zoom level here
      }
    };
    window.addEventListener("resize", handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener("resize", handleResize);
      // Only remove the chart instance on component unmount
      // Don't remove it here as this effect runs on data/option changes
      // chartRef.current?.remove(); // Move remove to a final cleanup effect if needed
    };

    // Dependency array: Re-run if chart options, type, theme colors, data OR boxSize change.
  }, [
    symbol,
    timeframe,
    chartType,
    boxSize,
    theme,
    chartData,
    chartBackgroundColor,
    chartTextColor,
    chartGridColor,
    candleUpColor,
    candleDownColor,
    lineAreaColor,
    areaTopColor,
    areaBottomColor
  ]);

  // Separate effect for final cleanup on unmount
  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
      }
      seriesRef.current = null;
    };
  }, []); // Empty dependency array means run only on unmount

  return (
    <Box m="20px">
      <Stack
        direction={isMobile ? "column" : "row"}
        spacing={2}
        mb="20px"
        alignItems="center"
      >
        <Select
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="BTCUSDT">BTC/USDT</MenuItem>
          <MenuItem value="ETHUSDT">ETH/USDT</MenuItem>
          <MenuItem value="BNBUSDT">BNB/USDT</MenuItem>
          <MenuItem value="ADAUSDT">ADA/USDT</MenuItem>
          <MenuItem value="DOTUSDT">DOT/USDT</MenuItem>
          <MenuItem value="SOLUSDT">SOL/USDT</MenuItem>
        </Select>
        <Select
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
          sx={{ minWidth: 120 }}
        >
          <MenuItem value="1m">1 Minute</MenuItem>
          <MenuItem value="1h">1 Hour</MenuItem>
          <MenuItem value="1d">1 Day</MenuItem>
          <MenuItem value="1w">1 Week</MenuItem>
          <MenuItem value="1M">1 Month</MenuItem>
        </Select>
        <Select
          value={chartType}
          onChange={(e) => setChartType(e.target.value)}
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="Candlestick">Candlestick</MenuItem>
          <MenuItem value="Line">Line</MenuItem>
          <MenuItem value="Area">Area</MenuItem>
          <MenuItem value="Histogram">Histogram</MenuItem>
          <MenuItem value="Bar">Bar</MenuItem>
          <MenuItem value="Renko">Renko</MenuItem>
        </Select>
        {chartType === "Renko" && (
          <TextField
            label="Box Size"
            type="number"
            size="small"
            value={boxSize}
            onChange={(e) => setBoxSize(Number(e.target.value) || 1)}
            sx={{ width: isMobile ? "100%" : "100px" }}
            InputLabelProps={{
              shrink: true
            }}
            InputProps={{
              inputProps: {
                min: 1
              }
            }}
          />
        )}
      </Stack>
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
        <Button
          variant="contained"
          sx={{
            backgroundColor: colors.redAccent[500],
            "&:hover": { backgroundColor: colors.redAccent[700] }
          }}
        >
          Sell
        </Button>
      </Box>
    </Box>
  );
};

export default Trading;
