import { SaveData } from './types';

export const SAMPLE_SAVE: SaveData = {
  selectedInterval: 300,
  selectedDrill: 'Example',
  drills: [{
    name: 'Example',
    urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/%22I%27ll_paint_the_town_red%22%2C_political_cartoon%2C_1885.jpg/763px-%22I%27ll_paint_the_town_red%22%2C_political_cartoon%2C_1885.jpg?20130126113348',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Lourdes_-_Mus%C3%A9e_Pyr%C3%A9n%C3%A9en_-_20150215_%282%29.jpg/900px-Lourdes_-_Mus%C3%A9e_Pyr%C3%A9n%C3%A9en_-_20150215_%282%29.jpg?20190501170547',
      'https://upload.wikimedia.org/wikipedia/commons/1/1f/Victorian_Tabasco_Box.jpg?20060812040555',
      'https://upload.wikimedia.org/wikipedia/commons/6/6b/RedDevilNeedle.jpg?20140410213254',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Market_at_Chichen_Itza_%283249394338%29.jpg/1600px-Market_at_Chichen_Itza_%283249394338%29.jpg?20130130084002',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/At_the_Devil%27s_Ball_1.jpg/958px-At_the_Devil%27s_Ball_1.jpg?20080920005424',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Artesania_de_Antofagasta.JPG/900px-Artesania_de_Antofagasta.JPG?20070708000858'
    ]
  }],
};

export const INTERVAL_OPTIONS = [
  { value: 30, label: "30s" },
  { value: 60, label: "1m" },
  { value: 2 * 60, label: "2m" },
  { value: 3 * 60, label: "3m" },
  { value: 300, label: "5m" },
  { value: 10 * 60, label: "10m" },
  { value: 3, label: "3s(!?)" },
];
