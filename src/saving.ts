import { SaveData } from './types';

export function save(data: SaveData) {
  localStorage.setItem("save", JSON.stringify(data));
}

export function load(): SaveData | null {
  return JSON.parse(localStorage.getItem("save") || "null") as SaveData;
}
