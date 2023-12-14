import fsPromises from "fs/promises";
import path from "path";

const dataFilePath = path.join(process.cwd(), "/src/pages/api/data/results.json");

export const getResults = async () => {
  const results = await fsPromises.readFile(dataFilePath, "utf8");
  console.log(results);
  return JSON.parse(results);
}

export const setResults = async (newResults: Record<string, Record<string, number>>) => {
  const results = JSON.stringify(newResults, null, 2);
  await fsPromises.writeFile(dataFilePath, results);
}

export const resetResults = async () => {
  await setResults({
    gb: {},
    gg: {}
  });
}