export const schoolStatuses = ['Ferdig', 'Behandles', 'Avvist'] as const;

export type SchoolStatus = (typeof schoolStatuses)[number];

export type School = {
  id: string;
  year: number;
  organizationNumber: string;
  schoolName: string;
  county: string;
  municipality: string;
  status: SchoolStatus;
  systemName: string;
};

const referenceSchools: School[] = [
  {
    id: '11111111',
    year: 2026,
    organizationNumber: '11111111',
    schoolName: 'Abildsø skole',
    county: 'Oslo',
    municipality: 'Oslo',
    status: 'Ferdig',
    systemName: 'Brukerstøtte',
  },
  {
    id: '22222222',
    year: 2026,
    organizationNumber: '22222222',
    schoolName: 'Ammerud skole',
    county: 'Oslo',
    municipality: 'Oslo',
    status: 'Ferdig',
    systemName: 'Brukerstøtte',
  },
  {
    id: '33333333',
    year: 2026,
    organizationNumber: '33333333',
    schoolName: 'Apalløkka skole',
    county: 'Oslo',
    municipality: 'Oslo',
    status: 'Behandles',
    systemName: 'Brukerstøtte',
  },
  {
    id: '44444444',
    year: 2026,
    organizationNumber: '44444444',
    schoolName: 'Høyenhall skole',
    county: 'Oslo',
    municipality: 'Oslo',
    status: 'Behandles',
    systemName: 'Brukerstøtte',
  },
  {
    id: '55555555',
    year: 2026,
    organizationNumber: '55555555',
    schoolName: 'Manglerud skole',
    county: 'Oslo',
    municipality: 'Oslo',
    status: 'Behandles',
    systemName: 'Brukerstøtte',
  },
  {
    id: '66666666',
    year: 2026,
    organizationNumber: '66666666',
    schoolName: 'Marienlyst skole',
    county: 'Oslo',
    municipality: 'Oslo',
    status: 'Avvist',
    systemName: 'Brukerstøtte',
  },
  {
    id: '77777777',
    year: 2025,
    organizationNumber: '77777777',
    schoolName: 'Ryenberget skole',
    county: 'Oslo',
    municipality: 'Oslo',
    status: 'Avvist',
    systemName: 'Brukerstøtte',
  },
  {
    id: '88888888',
    year: 2025,
    organizationNumber: '88888888',
    schoolName: 'Nordberg skole',
    county: 'Oslo',
    municipality: 'Oslo',
    status: 'Behandles',
    systemName: 'Brukerstøtte',
  },
  {
    id: '99999999',
    year: 2025,
    organizationNumber: '99999999',
    schoolName: 'Bryn skole',
    county: 'Oslo',
    municipality: 'Oslo',
    status: 'Avvist',
    systemName: 'Brukerstøtte',
  },
  {
    id: '00000000',
    year: 2025,
    organizationNumber: '00000000',
    schoolName: 'Brynseng skole',
    county: 'Oslo',
    municipality: 'Oslo',
    status: 'Ferdig',
    systemName: 'Brukerstøtte',
  },
];

const schoolNames = [
  'Alta ungdomsskole',
  'Arendal videregående skole',
  'Bergen katedralskole',
  'Bodø videregående skole',
  'Drammen videregående skole',
  'Elverum ungdomsskole',
  'Gjøvik videregående skole',
  'Hamar katedralskole',
  'Kristiansand katedralskole Gimle',
  'Lillehammer videregående skole',
  'Molde videregående skole',
  'Sandnes videregående skole',
  'Skien videregående skole',
  'Stavanger katedralskole',
  'Tromsdalen videregående skole',
  'Trondheim katedralskole',
];

const locations = [
  { county: 'Agder', municipality: 'Arendal' },
  { county: 'Agder', municipality: 'Kristiansand' },
  { county: 'Akershus', municipality: 'Bærum' },
  { county: 'Buskerud', municipality: 'Drammen' },
  { county: 'Finnmark', municipality: 'Alta' },
  { county: 'Innlandet', municipality: 'Hamar' },
  { county: 'Nordland', municipality: 'Bodø' },
  { county: 'Rogaland', municipality: 'Sandnes' },
  { county: 'Rogaland', municipality: 'Stavanger' },
  { county: 'Telemark', municipality: 'Skien' },
  { county: 'Troms', municipality: 'Tromsø' },
  { county: 'Trøndelag', municipality: 'Trondheim' },
  { county: 'Vestland', municipality: 'Bergen' },
];

const systemNames = ['Brukerstøtte', 'PAS', 'Prøveadministrasjon'];

const generatedSchools: School[] = Array.from({ length: 38 }, (_, index) => {
  const location = locations[index % locations.length];
  const organizationNumber = String(10000001 + index).padStart(8, '0');

  return {
    id: organizationNumber,
    year: 2026 - (index % 3),
    organizationNumber,
    schoolName: schoolNames[index % schoolNames.length],
    county: location.county,
    municipality: location.municipality,
    status: schoolStatuses[index % schoolStatuses.length],
    systemName: systemNames[index % systemNames.length],
  };
});

export const schools = [...referenceSchools, ...generatedSchools];

export const uniqueYears = [...new Set(schools.map(({ year }) => year))].sort(
  (a, b) => b - a,
);
export const uniqueCounties = [
  ...new Set(schools.map(({ county }) => county)),
].sort();
export const uniqueMunicipalities = [
  ...new Set(schools.map(({ municipality }) => municipality)),
].sort();
export const uniqueSystemNames = [
  ...new Set(schools.map(({ systemName }) => systemName)),
].sort();
