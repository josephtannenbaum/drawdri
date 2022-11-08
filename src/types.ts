export interface Drill {
  name: string;
  urls: string[];
}

export interface SaveData {
  selectedInterval: number;
  selectedDrillName: string;
  drills: Drill[];
  flipMode: boolean;
}
