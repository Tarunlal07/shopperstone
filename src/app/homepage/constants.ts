
import { Row } from "@tanstack/table-core";
import { Diamond } from "../Types/types";

const order = {
  color: ["D", "E", "F", "G", "H", "I", "J"],
  shape: ["PS", "RD", "EM", "PR", "CU", "OV", "MQ", "HS", "RA", "AS", "TR"],
  clarity: ["IF", "VVS1", "VVS2", "VS1", "VS2", "SI1", "SI2", "I1", "I2", "I3"],
  cut: ["EX", "VG", "GD", "FR"],
  polish: ["EX", "VG", "GD", "FR"],
  symmetry: ["EX", "VG", "GD", "FR"],
  fluorescence: ["NON", "FNT", "MED", "STG", "VSTG"],
  lab: ["GIA", "IGI", "HRD"],
  location: ["IND", "HK", "US", "EU", "SA"],
};

export const sortingOrderHandler = (
  rowA: Row<Diamond>,
  rowB: Row<Diamond>,
  columnId: string
) => {
  const sortOrder = order[columnId];
  const valueA = rowA.original[columnId] || "";
  const valueB = rowB.original[columnId] || "";
  if (sortOrder) {
    return sortOrder.indexOf(valueA) - sortOrder.indexOf(valueB);
  } else {
    return valueA.localeCompare(valueB);
  }
};
