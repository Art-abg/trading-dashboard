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
      close: parseFloat(kline[4])
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
      const { t, o, h, l, c } = klineData.k;

      const newData = {
        time: t / 1000,
        open: parseFloat(o),
        high: parseFloat(h),
        low: parseFloat(l),
        close: parseFloat(c)
      };

      setData((prevData) => {
        const newDataIndex = prevData.findIndex((k) => k.time === newData.time);
        let updatedData = [...prevData];

        if (newDataIndex !== -1) {
          updatedData[newDataIndex] = newData;
        } else {
          updatedData.push(newData);
          if (updatedData.length > limit + 50) {
            updatedData = updatedData.slice(updatedData.length - limit);
          }
        }
        return updatedData;
      });
    };

    socket.onmessage = handleMessage;

    socket.onerror = (error) => {
      console.error("WebSocket Error:", error);
      // Optional: Implement reconnection logic here
    };

    socket.onclose = (event) => {
      console.log("WebSocket Closed:", event.code, event.reason);
      // Optional: Implement reconnection logic here if !event.wasClean
    };

    return () => {
      mounted = false;
      socket.close();
    };
  }, [symbol, interval, limit]);

  return { data, setData };
};

export default useChartData;
