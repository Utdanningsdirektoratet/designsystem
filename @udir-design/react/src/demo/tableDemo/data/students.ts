export interface Student {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatarLabel: string;
  utdanningsnivå: 'Barneskole' | 'Ungdomsskole' | 'Videregående skole';
  status: 'Ny' | 'Eksportert' | 'Ikke eksportert';
}
export const STUDENTS: Student[] = [
  {
    id: 1,
    name: 'Lise Nordmann',
    email: 'lise@nordmann.no',
    phone: '22345678',
    avatarLabel: 'dame',
    utdanningsnivå: 'Barneskole',
    status: 'Ny',
  },
  {
    id: 2,
    name: 'Ola Nordmann',
    email: 'ola@nordmann.no',
    phone: '87654321',
    avatarLabel: 'mann',
    utdanningsnivå: 'Ungdomsskole',
    status: 'Eksportert',
  },
  {
    id: 3,
    name: 'Kari Nordmann',
    email: 'kari@nordmann.no',
    phone: '11223344',
    avatarLabel: 'dame',
    utdanningsnivå: 'Videregående skole',
    status: 'Ikke eksportert',
  },
  {
    id: 4,
    name: 'Per Nordmann',
    email: 'per@nordmann.no',
    phone: '44332211',
    avatarLabel: 'mann',
    utdanningsnivå: 'Barneskole',
    status: 'Ny',
  },
  {
    id: 5,
    name: 'Anne Nordmann',
    email: 'anne@nordmann.no',
    phone: '55667788',
    avatarLabel: 'dame',
    utdanningsnivå: 'Ungdomsskole',
    status: 'Eksportert',
  },
  {
    id: 6,
    name: 'Espen Nordmann',
    email: 'espen@nordmann.no',
    phone: '99887766',
    avatarLabel: 'mann',
    utdanningsnivå: 'Videregående skole',
    status: 'Ikke eksportert',
  },
  {
    id: 7,
    name: 'Marte Nordmann',
    email: 'marte@nordmann.no',
    phone: '22334455',
    avatarLabel: 'dame',
    utdanningsnivå: 'Barneskole',
    status: 'Ny',
  },
  {
    id: 8,
    name: 'Jonas Nordmann',
    email: 'jonas@nordmann.no',
    phone: '66778899',
    avatarLabel: 'mann',
    utdanningsnivå: 'Ungdomsskole',
    status: 'Eksportert',
  },
  {
    id: 9,
    name: 'Silje Nordmann',
    email: 'silje@nordmann.no',
    phone: '33445566',
    avatarLabel: 'dame',
    utdanningsnivå: 'Videregående skole',
    status: 'Ikke eksportert',
  },
  {
    id: 10,
    name: 'Morten Nordmann',
    email: 'morten@nordmann.no',
    phone: '77889900',
    avatarLabel: 'mann',
    utdanningsnivå: 'Barneskole',
    status: 'Ny',
  },
  {
    id: 11,
    name: 'Siri Nordmann',
    email: 'siri@nordmann.no',
    phone: '11224466',
    avatarLabel: 'dame',
    utdanningsnivå: 'Ungdomsskole',
    status: 'Eksportert',
  },
  {
    id: 12,
    name: 'Rune Nordmann',
    email: 'rune@nordmann.no',
    phone: '66554433',
    avatarLabel: 'mann',
    utdanningsnivå: 'Videregående skole',
    status: 'Ikke eksportert',
  },
];
