import xlsx from "json-as-xlsx";
import path from "path";
import { PROJECT_DIR } from "../constants/common";

const xlsxFilePath = path.join(PROJECT_DIR, "src", "temp", "out");

let settings = {
  fileName: xlsxFilePath, // Путь к файлу
  extraLength: 3,
  writeMode: "writeFile",
  writeOptions: {},
  RTL: false,
};

export const jsonToXlsx = (data: Record<string, any>[]) => {
  const xlsxData = [
    {
      sheet: "Chnes",
      columns: Object.keys(data[0]).map((key) => ({ label: key, value: key })),
      content: data,
    },
  ];

  xlsx(xlsxData, settings);

  return `${xlsxFilePath}.xlsx`;
};
