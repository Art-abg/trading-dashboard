export function parseCSV(csvData) {
  const lines = csvData.split("\n").filter((line) => line.trim() !== ""); // Filter out empty lines
  const headers = lines[0].split(",");

  const result = lines.slice(1).map((line) => {
    const values = line.split(",");
    return headers.reduce((object, header, index) => {
      object[header.trim()] =
        header === "transact_time"
          ? +values[index].trim()
          : values[index].trim();
      return object;
    }, {});
  });

  return result;
}
