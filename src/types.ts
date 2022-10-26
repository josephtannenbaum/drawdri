export interface Drill {
  name: string;
  urls: string[];
}

export interface SaveData {
  selectedInterval: number;
  selectedDrill: string;
  drills: Drill[];
}
