import rawData from "../data/sheet.json";
import { ROUTES, type Sheet } from "./types";

export const DATA: Sheet = rawData as Sheet;
export { ROUTES };
export const SECTIONS = [["para", "Paralogues"], ["rec", "Recruits"], ["miss", "Don't miss"], ["cal", "Calendar"], ["data", "Data"]] as const;
