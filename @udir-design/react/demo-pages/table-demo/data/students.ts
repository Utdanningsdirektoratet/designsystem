export interface Student {
  id: number;
  name: string;
  edited: string;
  phone: string;
  educationLevel: 'Barnehage' | 'Grunnskole' | 'Videregående';
  status: 'Eksportert' | 'Ikke eksportert';
  new: boolean;
}

export const STUDENTS: Student[] = [
  {
    id: 1,
    name: 'Lise Nordmann',
    edited: '01.01.2023',
    phone: '22345678',
    educationLevel: 'Barnehage',
    status: 'Ikke eksportert',
    new: true,
  },
  {
    id: 2,
    name: 'Ola Nordmann',
    edited: '01.02.2023',
    phone: '87654321',
    educationLevel: 'Grunnskole',
    status: 'Eksportert',
    new: false,
  },
  {
    id: 3,
    name: 'Kari Nordmann',
    edited: '01.03.2023',
    phone: '11223344',
    educationLevel: 'Videregående',
    status: 'Ikke eksportert',
    new: true,
  },
  {
    id: 4,
    name: 'Per Nordmann',
    edited: '01.04.2023',
    phone: '44332211',
    educationLevel: 'Barnehage',
    status: 'Ikke eksportert',
    new: false,
  },
  {
    id: 5,
    name: 'Anne Nordmann',
    edited: '01.05.2023',
    phone: '55667788',
    educationLevel: 'Grunnskole',
    status: 'Eksportert',
    new: false,
  },
  {
    id: 6,
    name: 'Espen Nordmann',
    edited: '01.06.2023',
    phone: '99887766',
    educationLevel: 'Videregående',
    status: 'Ikke eksportert',
    new: false,
  },
  {
    id: 7,
    name: 'Eva Nordmann',
    edited: '01.07.2023',
    phone: '22334455',
    educationLevel: 'Barnehage',
    status: 'Ikke eksportert',
    new: true,
  },
  {
    id: 8,
    name: 'Jonas Nordmann',
    edited: '01.08.2023',
    phone: '66778899',
    educationLevel: 'Grunnskole',
    status: 'Eksportert',
    new: false,
  },
  {
    id: 9,
    name: 'Silje Nordmann',
    edited: '01.09.2023',
    phone: '33445566',
    educationLevel: 'Videregående',
    status: 'Ikke eksportert',
    new: true,
  },
  {
    id: 10,
    name: 'Morten Nordmann',
    edited: '01.10.2023',
    phone: '77889900',
    educationLevel: 'Barnehage',
    status: 'Ikke eksportert',
    new: true,
  },
  {
    id: 11,
    name: 'Siri Nordmann',
    edited: '01.11.2023',
    phone: '11224466',
    educationLevel: 'Grunnskole',
    status: 'Eksportert',
    new: false,
  },
  {
    id: 12,
    name: 'Rune Nordmann',
    edited: '01.12.2023',
    phone: '66554433',
    educationLevel: 'Videregående',
    status: 'Ikke eksportert',
    new: false,
  },
];
