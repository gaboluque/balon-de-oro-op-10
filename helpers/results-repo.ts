import * as fs from "fs";
import path from "path";


export const getResults = () => {
  const results = fs.readFileSync(path.resolve("data/results.json"), "utf-8");
  return JSON.parse(results);
}

export const setResults = (newResults: Record<string, Record<string, number>>) => {
  const results = JSON.stringify(newResults, null, 2);
  fs.writeFileSync(path.resolve("data/results.json"), results);
}

export const resetResults = () => {
  const results = JSON.stringify({
    gb: {},
    gg: {}
  }, null, 2);
  fs.writeFileSync(path.resolve("data/results.json"), results);
}