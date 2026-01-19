// List of Icons we want the systems to use when there are several options
export const udirPreferredIcons = [
  'ArrowDown',
  'ArrowLeft',
  'ArrowRedo',
  'ArrowDownRight',
  'ArrowRight',
  'ArrowsUpDown',
  'ArrowUndo',
  'ArrowUp',
  'Bell',
  'Briefcase',
  'Calendar',
  'Chat2',
  'CheckmarkCircle',
  'Checkmark',
  'ChevronDown',
  'ChevronDownUp',
  'ChevronLeft',
  'ChevronRight',
  'ChevronUpDown',
  'ChevronUp',
  'Cog',
  'Download',
  'EnvelopeClosed',
  'ExclamationmarkTriangle',
  'File',
  'Files',
  'Filter',
  'Floppydisk',
  'Image',
  'InformationSquare',
  'Language',
  'Leave',
  'Link',
  'MenuElipsisVertical',
  'MenuHamburger',
  'NotePencil',
  'Paperplane',
  'PersonGroup',
  'Person',
  'PersonPlus',
  'PlusCircle',
  'Plus',
  'PrinterSmall',
  'Trash',
  'XMark',
  'XMarkOctagon',
] as const;

export type DoDont = {
  type: 'do' | 'dont';
  description: string;
};

// guidelines describing correct use case for preferred icons
export const guidelinesRecord: Partial<
  Record<(typeof udirPreferredIcons)[number], DoDont[]>
> = {
  ArrowDownRight: [
    {
      type: 'do',
      description: 'Bruk til å indikere en ankerlenke',
    },
  ],
  ArrowLeft: [
    {
      type: 'do',
      description: 'Bruk til å indikere at man kan gå tilbake',
    },
  ],
  ArrowRedo: [
    {
      type: 'dont',
      description: 'Ikke bruk til å indikere at noe kan videresendes',
    },
  ],
  ArrowsUpDown: [
    {
      type: 'do',
      description: 'Bruk til å indikere sortering',
    },
    {
      type: 'dont',
      description: 'Ikke bruk til å indikere filtrering',
    },
  ],
  Bell: [
    {
      type: 'do',
      description: 'Bruk til å indikere visning av varslinger',
    },
    {
      type: 'dont',
      description:
        'Ikke bruk til å indikere en status, bruk heller komponenten Badge',
    },
  ],
  ChevronDown: [
    {
      type: 'do',
      description: 'Bruk til å indikere at et område kan utvides',
    },
  ],
  ChevronDownUp: [
    {
      type: 'do',
      description:
        'Bruk til å indikere at man kan lukke alle utvidbare felter som er åpne',
    },
  ],
  ChevronRight: [
    {
      type: 'do',
      description: 'Bruk til å indikere at et område kan utvides',
    },
  ],
  ChevronUp: [
    {
      type: 'do',
      description: 'Bruk til å indikere at et utvidbart område kan lukkes',
    },
  ],
  ChevronUpDown: [
    {
      type: 'do',
      description: 'Bruk til å indikere at man kan sortere en kolonne',
    },
    {
      type: 'do',
      description: 'Bruk til å indikere at man kan åpne alle utvidbare felter',
    },
  ],
  Cog: [
    {
      type: 'do',
      description: 'Bruk til å indikere innstillinger',
    },
    {
      type: 'dont',
      description: 'Ikke bruk til å indikere verktøy',
    },
  ],
  Download: [
    {
      type: 'do',
      description: 'Bruk til å indikere en nedlasting',
    },
    {
      type: 'dont',
      description: 'Ikke bruk til å indikere en innboks',
    },
  ],
  EnvelopeClosed: [
    {
      type: 'do',
      description: 'Bruk til å indikere e-post',
    },
  ],
  ExclamationmarkTriangle: [
    {
      type: 'do',
      description: 'Bruk til å indikere en advarsel',
    },
  ],
  File: [
    {
      type: 'do',
      description: 'Bruk til å indikere en fil',
    },
  ],
  Files: [
    {
      type: 'do',
      description: 'Bruk til å indikere at man kan kopiere innhold',
    },
  ],
  Filter: [
    {
      type: 'do',
      description: 'Bruk til å indikere at man kan filtrere innhold',
    },
  ],
  Floppydisk: [
    {
      type: 'do',
      description: 'Bruk til å indikere at noe kan lagres',
    },
    {
      type: 'dont',
      description: 'Ikke bruk til å indikere en fil',
    },
  ],
  Language: [
    {
      type: 'do',
      description: 'Bruk til å indikere språkinnstillinger',
    },
  ],
  Leave: [
    {
      type: 'do',
      description: 'Bruk til å indikere at man logger ut',
    },
    {
      type: 'dont',
      description: 'Ikke bruk til å indikere at man kan lukke et vindu',
    },
  ],
  MenuElipsisVertical: [
    {
      type: 'do',
      description: 'Bruk til å indikere en nedtrekksmeny',
    },
    {
      type: 'dont',
      description:
        'Ikke bruk til å indikere at noe kan flyttes med drag and drop',
    },
  ],
  MenuHamburger: [
    {
      type: 'do',
      description: 'Bruk til å indikere en nedtrekksmeny',
    },
  ],
  NotePencil: [
    {
      type: 'do',
      description: 'Bruk til å indikere at innhold kan redigeres',
    },
    {
      type: 'do',
      description: 'Bruk til å indikere at man kan starte på et utkast',
    },
  ],
  Paperplane: [
    {
      type: 'do',
      description: 'Bruk til å indikere innseding av skjema',
    },
  ],
  Person: [
    {
      type: 'do',
      description: 'Bruk til å indikere en brukerprofil',
    },
  ],
  Plus: [
    {
      type: 'dont',
      description: 'Ikke bruk til å indikere at et område kan utvides',
    },
  ],
  PlusCircle: [
    {
      type: 'dont',
      description: 'Ikke bruk til å indikere at et område kan utvides',
    },
  ],
  PrinterSmall: [
    {
      type: 'do',
      description: 'Bruk til å indikere at man kan printe ut innhold',
    },
    {
      type: 'dont',
      description: 'Ikke bruk til å indikere at man kan kopiere innhold',
    },
  ],
  Trash: [
    {
      type: 'do',
      description: 'Bruk til å indikere at man kan slette innhold',
    },
  ],
  XMark: [
    {
      type: 'do',
      description: 'Bruk til å indikere at man kan lukke et vindu',
    },
    {
      type: 'do',
      description: 'Bruk til å indikere at en hamburgermeny er åpen',
    },
  ],
  XMarkOctagon: [
    {
      type: 'do',
      description: 'Bruk til å indikere en feilmelding',
    },
    {
      type: 'dont',
      description: 'Ikke bruk til å indikere at man kan lukke et vindu',
    },
  ],
};
