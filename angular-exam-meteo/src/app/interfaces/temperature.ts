import { WorldCity } from "./worldCity";

export interface Temperature {
id?: number;
timestamp?: number;
value: number;
worldCity: WorldCity;
}