/**
 * Calculates Renko bricks from OHLC data.
 * @param {Array<Object>} ohlcData - Array of OHLC data points { time, open, high, low, close }.
 * @param {number} boxSize - The fixed price movement required to form a new brick.
 * @returns {Array<Object>} Array of Renko bricks { time, open, high, low, close, type: 'up' | 'down' }.
 */
export function calculateRenkoBricks(ohlcData, boxSize) {
  if (!ohlcData || ohlcData.length === 0 || boxSize <= 0) {
    return [];
  }

  const renkoData = [];
  let lastBrickClose = ohlcData[0].open; // Start with the first open price
  let lastBrickType = null; // 'up' or 'down'

  // Initialize the first 'anchor' brick based on the starting price
  // This anchor isn't plotted but sets the initial levels.
  // let renkoOpen = Math.floor(lastBrickClose / boxSize) * boxSize; // Unused
  // let renkoClose = renkoOpen + boxSize; // Unused

  ohlcData.forEach((candle) => {
    const price = candle.close; // Using close price for calculation

    // Determine potential next brick levels
    // const potentialUpBrickOpen = lastBrickClose; // Unused
    const potentialUpBrickClose = lastBrickClose + boxSize;
    // const potentialDownBrickOpen = lastBrickClose; // Unused
    const potentialDownBrickClose = lastBrickClose - boxSize;

    let bricksToAdd = 0;
    let direction = 0; // +1 for up, -1 for down

    if (price >= potentialUpBrickClose) {
      // Price moved up enough for at least one up brick
      direction = 1;
      bricksToAdd = Math.floor((price - lastBrickClose) / boxSize);
    } else if (price <= potentialDownBrickClose) {
      // Price moved down enough for at least one down brick
      direction = -1;
      bricksToAdd = Math.floor((lastBrickClose - price) / boxSize);
    }

    // Add the calculated bricks
    for (let i = 0; i < bricksToAdd; i++) {
      let brickOpen, brickClose;
      // Calculate unique timestamp for this specific brick
      // Assuming candle.time is a Unix timestamp (seconds or milliseconds)
      // Add index+1 to ensure it's always greater than the original candle.time
      // and distinct from other bricks from the same candle.
      const brickTimestamp = candle.time + (i + 1);

      if (direction === 1) {
        // Up brick
        brickOpen = lastBrickClose;
        brickClose = lastBrickClose + boxSize;
        lastBrickType = "up";
      } else {
        // Down brick
        brickOpen = lastBrickClose;
        brickClose = lastBrickClose - boxSize;
        lastBrickType = "down";
      }

      // Add the new brick to the data
      // Use candlestick format, making high/low equal to open/close for solid look
      renkoData.push({
        time: brickTimestamp, // Use the calculated unique timestamp
        open: brickOpen,
        high: direction === 1 ? brickClose : brickOpen, // High is close for up, open for down
        low: direction === 1 ? brickOpen : brickClose, // Low is open for up, close for down
        close: brickClose,
        type: lastBrickType
      });

      lastBrickClose = brickClose; // Update the close for the next iteration
    }
  });

  return renkoData;
}
