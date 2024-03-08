// react-trading-dashboard/src/scenes/trading/data.jsx
import { useState, useEffect } from "react";
import axios from "axios";

const WebSocketURL = "wss://stream.binance.com:9443/ws/btcusdt@kline_1m";
const RestAPIURL =
  "https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=5m&limit=1000";

const Data = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch historical data from the REST API
    axios
      .get(RestAPIURL)
      .then((response) => {
        const historicalData = response.data.map((kline) => ({
          time: kline[0],
          open: parseFloat(kline[1]),
          high: parseFloat(kline[2]),
          low: parseFloat(kline[3]),
          close: parseFloat(kline[4])
        }));
        setData(historicalData);
      })
      .catch((error) => {
        console.error("Error fetching historical data:", error);
      });

    // Subscribe to real-time updates via WebSocket
    const socket = new WebSocket(WebSocketURL);

    socket.onmessage = (event) => {
      const klineData = JSON.parse(event.data);
      const { t, o, h, l, c } = klineData.k;

      const newData = {
        time: t,
        open: parseFloat(o),
        high: parseFloat(h),
        low: parseFloat(l),
        close: parseFloat(c)
      };

      setData((prevData) => {
        // Check if the new data point has the same timestamp as the latest data point
        if (
          prevData.length > 0 &&
          prevData[prevData.length - 1].time === newData.time
        ) {
          // If the timestamp is the same, update the latest data point
          const updatedData = [...prevData];
          updatedData[updatedData.length - 1] = newData;
          return updatedData;
        } else {
          // If the timestamp is different, add the new data point to the array
          return [...prevData, newData];
        }
      });
    };

    return () => {
      socket.close();
    };
  }, []);

  return { data: data };
};

export default Data;
