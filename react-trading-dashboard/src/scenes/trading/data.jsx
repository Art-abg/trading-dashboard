import { useState, useEffect } from "react";
import axios from "axios";

const WebSocketURL = "wss://stream.binance.com:9443/ws/";
const RestAPIURL = "https://api.binance.com/api/v3/klines?symbol=";

const fetchData = async (symbol, interval, limit) => {
  try {
    const response = await axios.get(
      `${RestAPIURL}${symbol}&interval=${interval}&limit=${limit}`
    );
    const historicalData = response.data.map((kline) => ({
      time: kline[0] / 1000,
      open: parseFloat(kline[1]),
      high: parseFloat(kline[2]),
      low: parseFloat(kline[3]),
      close: parseFloat(kline[4]),
      isFinal: true // Mark the historical data as final
    }));

    return historicalData;
  } catch (error) {
    console.error("Error fetching historical data:", error);
    return [];
  }
};

const useChartData = (symbol, interval, limit) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    let mounted = true;
    const fetchInitialData = async () => {
      const historicalData = await fetchData(symbol, interval, limit);
      if (mounted) {
        setData(historicalData);
      }
    };

    fetchInitialData();

    const socket = new WebSocket(
      `${WebSocketURL}${symbol.toLowerCase()}@kline_${interval}`
    );

    const handleMessage = (event) => {
      const klineData = JSON.parse(event.data);
      const { t, o, h, l, c, x } = klineData.k;

      const newData = {
        time: t / 1000,
        open: parseFloat(o),
        high: parseFloat(h),
        low: parseFloat(l),
        close: parseFloat(c),
        isFinal: x // Indicates if this kline is final (closed)
      };

      setData((prevData) => {
        const newDataIndex = prevData.findIndex((k) => k.time === newData.time);
        if (newDataIndex === prevData.length - 1) {
          const updatedData = [...prevData];
          updatedData[newDataIndex] = newData;
          return updatedData;
        } else if (newDataIndex === -1) {
          return [...prevData, newData];
        }
        return prevData;
      });
    };

    socket.onmessage = handleMessage;

    return () => {
      mounted = false;
      socket.close();
    };
  }, [symbol, interval, limit]);

  return { data, setData };
};

export default useChartData;

export const updateChartData = (chart, newData) => {
  chart.series.forEach((series) => {
    const seriesData = newData.find((d) => d.name === series.name);
    if (seriesData) {
      series.update(seriesData.data);
    }
  });
};
