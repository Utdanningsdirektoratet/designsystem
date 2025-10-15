// List of Icons we want the systems to use when there are several options
export const udirPreferredIcons: string[] = [
  'AlignCenter',
  'AlignLeft',
  'AlignRight',
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
  'Calculator',
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
  'HatSchool',
  'Image',
  'InformationSquare',
  'Leave',
  'Link',
  'MenuElipsisVertical',
  'MenuHamburger',
  'NotePencil',
  'PersonGroup',
  'Person',
  'PersonPlus',
  'PlusCircle',
  'Plus',
  'PrinterSmall',
  'Trash',
  'XMark',
  'XMarkOctagon',
];

export type DoDont = {
  type: 'do' | 'dont';
  description: string;
};

// guidelines describing correct use case for preferred icons
export const guidelinesRecord: Record<string, DoDont[]> = {
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
      description: 'Bruk til å indikere varslinger',
    },
  ],
  ChevronDown: [
    {
      type: 'do',
      description: 'Bruk til å indikere at et område er utvidbart',
    },
  ],
  ChevronRight: [
    {
      type: 'do',
      description: 'Bruk til å indikere at et område er utvidbart',
    },
  ],
  ChevronUp: [
    {
      type: 'do',
      description: 'Bruk til å indikere at et utvidbart område er åpent',
    },
  ],
  ChevronUpDown: [
    {
      type: 'do',
      description: 'Bruk til å indikere at man kan sortere en kolonne',
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
      description: 'Bruk til å indikere at en lenke peker til en fil',
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
  Person: [
    {
      type: 'do',
      description: 'Bruk til å indikere en brukerprofil',
    },
  ],
  Plus: [
    {
      type: 'dont',
      description: 'Ikke bruk til å indikere at et område er utvidbart',
    },
  ],
  PlusCircle: [
    {
      type: 'dont',
      description: 'Ikke bruk til å indikere at et område er utvidbart',
    },
  ],
  XMark: [
    {
      type: 'do',
      description: 'Bruk til å indikere at man kan lukke et vindu',
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
