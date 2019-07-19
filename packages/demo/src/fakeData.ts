export interface Data {
  id: string;
  name: string;
  objective: string;
  conversions: number;
  cvr: number;
}

export const DATA: Data[] = [
  {
    id: 'id-0',
    name: 'DongYoon',
    objective: 'CPA',
    conversions: 23242424,
    cvr: 0.054
  },
  { id: 'id-1', name: 'SangBoak', objective: 'V2I', conversions: 1234, cvr: 0.16 },
  { id: 'id-2', name: 'MoonSik', objective: 'CPV', conversions: 1, cvr: 2 },
  { id: 'id-3', name: 'Heejin', objective: 'CPI', conversions: 7211233123, cvr: 0.71 },
  { id: 'id-4', name: 'Youngjae', objective: 'PPE', conversions: 312, cvr: 0.4281 }
];
