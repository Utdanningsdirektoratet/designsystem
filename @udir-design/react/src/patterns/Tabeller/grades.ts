export const emner = ['Engelsk', 'Matematikk', 'Hovedmål', 'Sidemål'];

export const fylker = [
  'Agder',
  'Akershus',
  'Buskerud',
  'Finnmark',
  'Innlandet',
  'Nordland',
  'Oslo',
  'Rogaland',
  'Telemark',
  'Troms',
  'Vestland',
  'Viken',
];

export const seeded = (str: string): number => {
  let h = 0;
  for (const c of str) h = (Math.imul(31, h) + c.charCodeAt(0)) | 0;
  return Math.abs(h) / 2147483647;
};

export type Grade = {
  id: string;
  fylke: string;
  emne: string;
  antallelever: number;
  muntligkarakter: string;
  skriftligkarakter: string;
  standpunktkarakter: string;
};

export type CompactGrade = {
  id: string;
  emne: string;
  muntligkarakter: string;
  eleverMuntlig: number;
  skriftligkarakter: string;
  eleverSkriftlig: number;
};

export const grades: Grade[] = fylker.flatMap((fylke) =>
  emner.map((emne) => ({
    id: `${fylke}-${emne}`,
    emne,
    fylke,
    muntligkarakter: (seeded(`${fylke}-${emne}-muntlig`) * 1.2 + 3).toFixed(2),
    skriftligkarakter: (seeded(`${fylke}-${emne}-skriftlig`) * 1.2 + 3).toFixed(
      2,
    ),
    standpunktkarakter: (
      seeded(`${fylke}-${emne}-standpunkt`) * 1.2 +
      3
    ).toFixed(2),
    antallelever: Math.floor(seeded(`${fylke}-${emne}-antall`) * 10001) + 5000,
  })),
);

export const compactGrades: CompactGrade[] = emner.map((emne) => ({
  id: emne,
  emne: emne,
  muntligkarakter: (seeded(`${emne}-muntlig`) * 1.2 + 3).toFixed(2),
  eleverMuntlig: Math.floor(seeded(`${emne}-eleverMuntlig`) * 3001) + 5000,
  skriftligkarakter: (seeded(`${emne}-skriftlig`) * 1.2 + 3).toFixed(2),
  eleverSkriftlig: Math.floor(seeded(`${emne}-eleverSkriftlig`) * 3001) + 7000,
}));

export const uniqueFylker = [...new Set(grades.map((d) => d.fylke))];
export const uniqueEmner = [...new Set(grades.map((d) => d.emne))];
