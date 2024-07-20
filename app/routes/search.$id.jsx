import { json } from "@remix-run/node";
import fs from "fs";
import { parse } from "csv-parse/sync";

const CSV_FILE_PATH = process.env.CSV_FILEPATH;

export const loader = async ({ params }) => {
  const id = params.id;

  if (!id) {
    return json({ error: "No ID provided" }, { status: 400 });
  }

  try {
    const fileContent = await fs.promises.readFile(CSV_FILE_PATH, "utf-8");
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
    });

    const entry = records.find((record) => record.machine_serial.toLowerCase() === id.toLowerCase());

    if (entry) {
      return json(entry);
    } else {
      return json({ error: "No matching entry found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error reading CSV file:", error);
    return json({ error: "Internal server error" }, { status: 500 });
  }
};
