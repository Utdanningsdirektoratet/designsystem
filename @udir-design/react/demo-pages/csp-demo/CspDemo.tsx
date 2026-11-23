import { Fragment } from 'react';
import { AbcFillSymbol } from '@udir-design/symbols';
import { Alert, AlertHeading } from 'src/components/alert';
import { Avatar } from 'src/components/avatar';
import { Badge, BadgePosition } from 'src/components/badge';
import {
  Breadcrumbs,
  BreadcrumbsItem,
  BreadcrumbsLink,
  BreadcrumbsList,
} from 'src/components/breadcrumbs';
import { Button } from 'src/components/button';
import { Card, CardBlock } from 'src/components/card';
import { Checkbox } from 'src/components/checkbox';
import {
  Chip,
  ChipButton,
  ChipCheckbox,
  ChipRadio,
  ChipRemovable,
} from 'src/components/chip';
import { DemoBanner } from 'src/components/demoBanner';
import {
  Details,
  DetailsContent,
  DetailsSummary,
} from 'src/components/details';
import {
  Dialog,
  DialogBlock,
  DialogTrigger,
  DialogTriggerContext,
} from 'src/components/dialog';
import { Divider } from 'src/components/divider';
import {
  Dropdown,
  DropdownButton,
  DropdownHeading,
  DropdownItem,
  DropdownList,
  DropdownTrigger,
  DropdownTriggerContext,
} from 'src/components/dropdown';
import {
  ErrorSummary,
  ErrorSummaryHeading,
  ErrorSummaryItem,
  ErrorSummaryLink,
  ErrorSummaryList,
} from 'src/components/errorSummary';
import {
  Field,
  FieldAffix,
  FieldAffixes,
  FieldCounter,
  FieldDescription,
} from 'src/components/field';
import {
  FieldNecessity,
  FieldNecessitySummary,
} from 'src/components/fieldNecessity';
import {
  Fieldset,
  FieldsetDescription,
  FieldsetLegend,
} from 'src/components/fieldset';
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadList,
  FileUploadTrigger,
} from 'src/components/fileUpload';
import { Footer, FooterItem, FooterList } from 'src/components/footer';
import {
  FormNavigation,
  FormNavigationGroup,
  FormNavigationStep,
} from 'src/components/formNavigation';
import {
  FormSummary,
  FormSummaryField,
  FormSummaryFields,
  FormSummarySection,
} from 'src/components/formSummary';
import {
  Header,
  HeaderMenu,
  HeaderMenuButton,
  HeaderNavigation,
  HeaderSearch,
  HeaderThemeMenuButton,
  HeaderUserButton,
} from 'src/components/header';
import { Input } from 'src/components/input';
import { Link } from 'src/components/link';
import {
  List,
  ListItem,
  ListOrdered,
  ListUnordered,
} from 'src/components/list';
import { Logo, LogoSymbol } from 'src/components/logo';
import {
  Pagination,
  PaginationButton,
  PaginationItem,
  PaginationList,
} from 'src/components/pagination';
import {
  Popover,
  PopoverTrigger,
  PopoverTriggerContext,
} from 'src/components/popover';
import { ProgressBar } from 'src/components/progressBar';
import { Radio } from 'src/components/radio';
import { ReadMore } from 'src/components/readMore';
import {
  Search,
  SearchButton,
  SearchClear,
  SearchInput,
} from 'src/components/search';
import { Select, SelectOptgroup, SelectOption } from 'src/components/select';
import { Skeleton } from 'src/components/skeleton';
import { SkipLink } from 'src/components/skipLink';
import { Spinner } from 'src/components/spinner';
import {
  Suggestion,
  SuggestionClear,
  SuggestionEmpty,
  SuggestionInput,
  SuggestionList,
  SuggestionOption,
  SuggestionToggle,
} from 'src/components/suggestion';
import { Switch } from 'src/components/switch';
import {
  Table,
  TableBody,
  TableCell,
  TableFoot,
  TableHead,
  TableHeaderCell,
  TableRow,
} from 'src/components/table';
import { TableOfContents } from 'src/components/tableOfContents';
import { Tabs, TabsList, TabsPanel, TabsTab } from 'src/components/tabs';
import { Tag } from 'src/components/tag';
import { Textarea } from 'src/components/textarea';
import { Textfield } from 'src/components/textfield';
import { ToggleGroup, ToggleGroupItem } from 'src/components/toggleGroup';
import { Tooltip } from 'src/components/tooltip';
import { Heading } from 'src/components/typography/heading';
import { Label } from 'src/components/typography/label';
import { Paragraph } from 'src/components/typography/paragraph';
import { Prose } from 'src/components/typography/prose';
import { ValidationMessage } from 'src/components/typography/validationMessage';
import type { CspDemoProps } from './cspDemoProps';
import { progressMax } from './cspDemoProps';

const file = new File(['innhold'], 'vedlegg.pdf', { type: 'application/pdf' });
const noop = () => undefined;

/**
 * Every component that `@udir-design/react` exports, keyed by export name, for the checks that
 * the library works under a strict Content Security Policy. Props differ from the defaults where
 * a component styles itself from them, since some styles are only rendered for some props.
 * Compound components share one element.
 */
export function cspDemoComponents(props: CspDemoProps) {
  const alert = (
    <Alert data-color="warning">
      <AlertHeading>Overskrift</AlertHeading>
      Innhold
    </Alert>
  );
  const badge = (
    <BadgePosition placement="bottom-left" overlap="circle">
      <Badge count={120} maxCount={99} data-color="danger" />
      <Avatar aria-label="Ola Nordmann" data-size="lg">
        ON
      </Avatar>
    </BadgePosition>
  );
  const breadcrumbs = (
    <Breadcrumbs aria-label="Du er her">
      <BreadcrumbsLink href="#forelder">Forelder</BreadcrumbsLink>
      <BreadcrumbsList>
        <BreadcrumbsItem>
          <BreadcrumbsLink href="#forside">Forside</BreadcrumbsLink>
        </BreadcrumbsItem>
      </BreadcrumbsList>
    </Breadcrumbs>
  );
  const card = (
    <Card data-color="accent" variant="tinted">
      <CardBlock>Innhold</CardBlock>
    </Card>
  );
  const details = (
    <Details defaultOpen>
      <DetailsSummary>Oppsummering</DetailsSummary>
      <DetailsContent>Innhold</DetailsContent>
    </Details>
  );
  // Not modal, so that the rest of the page stays interactive
  const dialog = (
    <DialogTriggerContext>
      <DialogTrigger>Åpne dialog</DialogTrigger>
      <Dialog closedby="any" placement="right" modal={false} open>
        <DialogBlock>Innhold</DialogBlock>
      </Dialog>
    </DialogTriggerContext>
  );
  const dropdown = (
    <DropdownTriggerContext>
      <DropdownTrigger>Meny</DropdownTrigger>
      <Dropdown placement="top-start" open>
        <DropdownHeading>Overskrift</DropdownHeading>
        <DropdownList>
          <DropdownItem>
            <DropdownButton>Valg</DropdownButton>
          </DropdownItem>
        </DropdownList>
      </Dropdown>
    </DropdownTriggerContext>
  );
  const errorSummary = (
    <ErrorSummary>
      <ErrorSummaryHeading>Rett opp feilene</ErrorSummaryHeading>
      <ErrorSummaryList>
        <ErrorSummaryItem>
          <ErrorSummaryLink href="#felt">Feil</ErrorSummaryLink>
        </ErrorSummaryItem>
      </ErrorSummaryList>
    </ErrorSummary>
  );
  const field = (
    <Field>
      <Label>Beløp</Label>
      <FieldDescription>Beskrivelse</FieldDescription>
      <FieldAffixes>
        <FieldAffix>kr</FieldAffix>
        <Input defaultValue="100" />
      </FieldAffixes>
      <FieldCounter limit={10} />
      <ValidationMessage>Feil</ValidationMessage>
    </Field>
  );
  const fieldNecessity = (
    <FieldNecessity variant="outline" showRequired showSummary>
      <FieldNecessitySummary />
      <Textfield label="Navn" required />
    </FieldNecessity>
  );
  const fieldset = (
    <Fieldset>
      <FieldsetLegend>Legend</FieldsetLegend>
      <FieldsetDescription>Beskrivelse</FieldsetDescription>
      <Checkbox label="Avkrysning" value="a" defaultChecked />
      <Radio label="Valg" name="valg" value="a" defaultChecked />
      <Switch label="Bryter" position="end" defaultChecked />
    </Fieldset>
  );
  const fileUpload = (
    <>
      <FileUploadTrigger label="Last opp" variant="secondary" />
      <FileUploadDropzone label="Last opp" isDragActive />
      <FileUploadList variant="compact">
        <FileUploadItem file={file} onRemove={noop} loading />
        <FileUploadItem file={file} onRemove={noop} error="Feil" />
      </FileUploadList>
    </>
  );
  const footer = (
    <Footer
      maxWidth={props.maxWidth}
      variant="pride"
      data-size="sm"
      data-testid="csp-footer"
    >
      <FooterList>
        <FooterItem href="#personvern">Personvern</FooterItem>
      </FooterList>
    </Footer>
  );
  const formNavigation = (
    <FormNavigation>
      <FormNavigationGroup title="Gruppe" state="completed" open>
        <FormNavigationStep state="active">Steg</FormNavigationStep>
      </FormNavigationGroup>
      <FormNavigationStep variant="summary">Oppsummering</FormNavigationStep>
    </FormNavigation>
  );
  const formSummary = (
    <FormSummary title="Oppsummering" headingLevel={3}>
      <FormSummarySection title="Seksjon" editHref="#rediger">
        <FormSummaryFields>
          <FormSummaryField label="Navn" value="Ola" />
          <FormSummaryField label="Alder" error="Mangler" />
        </FormSummaryFields>
      </FormSummarySection>
    </FormSummary>
  );
  const header = (
    <Header
      applicationName="CSP-test"
      maxWidth={props.maxWidth}
      variant="pride"
      data-testid="csp-header"
    >
      <HeaderNavigation>
        <HeaderNavigation.Item href="#side">Side</HeaderNavigation.Item>
      </HeaderNavigation>
      <HeaderSearch />
      <HeaderThemeMenuButton />
      <HeaderUserButton name="Ola Nordmann" description="Admin" />
      <HeaderMenuButton />
      <HeaderMenu>
        <HeaderMenu.Link href="#side">Side</HeaderMenu.Link>
      </HeaderMenu>
    </Header>
  );
  const list = (
    <>
      <ListUnordered>
        <ListItem>Punkt</ListItem>
      </ListUnordered>
      <ListOrdered start={3}>
        <ListItem>Punkt</ListItem>
      </ListOrdered>
    </>
  );
  const pagination = (
    <Pagination aria-label="Sidenavigering">
      <PaginationList>
        <PaginationItem>
          <PaginationButton aria-current="page">2</PaginationButton>
        </PaginationItem>
      </PaginationList>
    </Pagination>
  );
  const popover = (
    <PopoverTriggerContext>
      <PopoverTrigger>Vis</PopoverTrigger>
      <Popover placement="bottom" open>
        Innhold
      </Popover>
    </PopoverTriggerContext>
  );
  const search = (
    <Search>
      <SearchInput aria-label="Søk" defaultValue="skole" />
      <SearchClear />
      <SearchButton />
    </Search>
  );
  const select = (
    <Select aria-label="Velg" defaultValue="b">
      <SelectOptgroup label="Gruppe">
        <SelectOption value="a">A</SelectOption>
        <SelectOption value="b">B</SelectOption>
      </SelectOptgroup>
    </Select>
  );
  const suggestion = (
    <Field>
      <Label>Fylke</Label>
      <Suggestion multiple display="count" defaultSelected={['Agder']}>
        <SuggestionInput />
        <SuggestionClear />
        <SuggestionToggle />
        <SuggestionList>
          <SuggestionEmpty>Ingen treff</SuggestionEmpty>
          <SuggestionOption value="Agder">Agder</SuggestionOption>
        </SuggestionList>
      </Suggestion>
    </Field>
  );
  const table = (
    <Table zebra stickyHeader border>
      <TableHead>
        <TableRow>
          <TableHeaderCell sort="ascending">Navn</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>Ola</TableCell>
        </TableRow>
      </TableBody>
      <TableFoot>
        <TableRow>
          <TableCell>Sum</TableCell>
        </TableRow>
      </TableFoot>
    </Table>
  );
  const tabs = (
    <Tabs defaultValue="b">
      <TabsList>
        <TabsTab value="a">A</TabsTab>
        <TabsTab value="b">B</TabsTab>
      </TabsList>
      <TabsPanel value="a">A</TabsPanel>
      <TabsPanel value="b">B</TabsPanel>
    </Tabs>
  );
  const toggleGroup = (
    <ToggleGroup defaultValue="b" aria-labelledby="csp-visning">
      <ToggleGroupItem value="a">A</ToggleGroupItem>
      <ToggleGroupItem value="b">B</ToggleGroupItem>
    </ToggleGroup>
  );

  return {
    Alert: alert,
    AlertHeading: alert,
    Avatar: badge,
    Badge: badge,
    BadgePosition: badge,
    Breadcrumbs: breadcrumbs,
    BreadcrumbsItem: breadcrumbs,
    BreadcrumbsLink: breadcrumbs,
    BreadcrumbsList: breadcrumbs,
    Button: (
      <Button variant="secondary" loading icon>
        Knapp
      </Button>
    ),
    Card: card,
    CardBlock: card,
    Checkbox: fieldset,
    Chip: (
      <>
        <Chip.Button>Knapp</Chip.Button>
        <Chip.Removable>Fjern</Chip.Removable>
      </>
    ),
    ChipButton: <ChipButton>Knapp</ChipButton>,
    ChipCheckbox: <ChipCheckbox defaultChecked>Valg</ChipCheckbox>,
    ChipRadio: (
      <ChipRadio name="chip" defaultChecked>
        Valg
      </ChipRadio>
    ),
    ChipRemovable: <ChipRemovable>Fjern</ChipRemovable>,
    DemoBanner: <DemoBanner text={props.bannerText}>Innhold</DemoBanner>,
    Details: details,
    DetailsContent: details,
    DetailsSummary: details,
    Dialog: dialog,
    DialogBlock: dialog,
    DialogTrigger: dialog,
    DialogTriggerContext: dialog,
    Divider: <Divider />,
    Dropdown: dropdown,
    DropdownButton: dropdown,
    DropdownHeading: dropdown,
    DropdownItem: dropdown,
    DropdownList: dropdown,
    DropdownTrigger: dropdown,
    DropdownTriggerContext: dropdown,
    ErrorSummary: errorSummary,
    ErrorSummaryHeading: errorSummary,
    ErrorSummaryItem: errorSummary,
    ErrorSummaryLink: errorSummary,
    ErrorSummaryList: errorSummary,
    Field: field,
    FieldAffix: field,
    FieldAffixes: field,
    FieldCounter: field,
    FieldDescription: field,
    FieldNecessity: fieldNecessity,
    FieldNecessitySummary: fieldNecessity,
    Fieldset: fieldset,
    FieldsetDescription: fieldset,
    FieldsetLegend: fieldset,
    FileUpload: (
      <FileUpload.List>
        <FileUpload.Item file={file} onRemove={noop} />
      </FileUpload.List>
    ),
    FileUploadDropzone: fileUpload,
    FileUploadItem: fileUpload,
    FileUploadList: fileUpload,
    FileUploadTrigger: fileUpload,
    Footer: footer,
    FooterItem: footer,
    FooterList: footer,
    FormNavigation: formNavigation,
    FormNavigationGroup: formNavigation,
    FormNavigationStep: formNavigation,
    FormSummary: formSummary,
    FormSummaryField: formSummary,
    FormSummaryFields: formSummary,
    FormSummarySection: formSummary,
    Header: header,
    HeaderMenu: header,
    HeaderMenuButton: header,
    HeaderNavigation: header,
    HeaderSearch: header,
    HeaderThemeMenuButton: header,
    HeaderUserButton: header,
    Heading: (
      <Heading level={2} data-size="lg">
        Overskrift
      </Heading>
    ),
    Input: field,
    Label: field,
    Link: <Link href="#side">Lenke</Link>,
    List: (
      <List.Unordered>
        <List.Item>Punkt</List.Item>
      </List.Unordered>
    ),
    ListItem: list,
    ListOrdered: list,
    ListUnordered: list,
    Logo: <Logo size={props.size} padding="16px" variant="pride" />,
    LogoSymbol: <LogoSymbol size={props.size} padding="8px" variant="pride" />,
    Pagination: pagination,
    PaginationButton: pagination,
    PaginationItem: pagination,
    PaginationList: pagination,
    Paragraph: <Paragraph data-size="lg">Avsnitt</Paragraph>,
    Popover: popover,
    PopoverTrigger: popover,
    PopoverTriggerContext: popover,
    ProgressBar: (
      <ProgressBar
        value={props.progressValue}
        max={progressMax}
        aria-label="Framdrift"
      />
    ),
    Prose: (
      <Prose>
        <p>Avsnitt</p>
      </Prose>
    ),
    Radio: fieldset,
    ReadMore: (
      <ReadMore summary="Les mer" open>
        Innhold
      </ReadMore>
    ),
    Search: search,
    SearchButton: search,
    SearchClear: search,
    SearchInput: search,
    Select: select,
    SelectOptgroup: select,
    SelectOption: select,
    Skeleton: (
      <>
        <Skeleton
          variant="rectangle"
          width={props.skeletonSize}
          height={props.skeletonSize}
        />
        <Skeleton
          variant="circle"
          width={props.skeletonSize}
          height={props.skeletonSize}
        />
        <Skeleton variant="text" width={props.skeletonSize} />
      </>
    ),
    SkipLink: <SkipLink href="#innhold">Til innholdet</SkipLink>,
    Spinner: <Spinner aria-label="Laster" data-size="xl" />,
    Suggestion: suggestion,
    SuggestionClear: suggestion,
    SuggestionEmpty: suggestion,
    SuggestionInput: suggestion,
    SuggestionList: suggestion,
    SuggestionOption: suggestion,
    SuggestionToggle: suggestion,
    Switch: fieldset,
    Table: table,
    TableBody: table,
    TableCell: table,
    TableFoot: table,
    TableHead: table,
    TableHeaderCell: table,
    TableOfContents: (
      <TableOfContents
        headings={[
          { level: 2, name: 'Første', id: 'forste' },
          { level: 3, name: 'Andre', id: 'andre' },
        ]}
        defaultClosed
      />
    ),
    TableRow: table,
    Tabs: tabs,
    TabsList: tabs,
    TabsPanel: tabs,
    TabsTab: tabs,
    Tag: <Tag data-color="success">Merkelapp</Tag>,
    Textarea: <Textarea aria-label="Tekst" rows={8} defaultValue="Tekst" />,
    Textfield: (
      <Textfield
        label="Tekst"
        description="Beskrivelse"
        error="Feil"
        prefix="kr"
        counter={20}
        multiline
      />
    ),
    ToggleGroup: toggleGroup,
    ToggleGroupItem: toggleGroup,
    Tooltip: (
      <Tooltip content="Hjelpetekst" placement="right">
        <button type="button">Hjelp</button>
      </Tooltip>
    ),
    ValidationMessage: field,
  };
}

/** Renders every component from `cspDemoComponents`, and a symbol from `@udir-design/symbols` */
export function CspDemo(props: CspDemoProps) {
  const elements = new Set(Object.values(cspDemoComponents(props)));
  return (
    <>
      {Array.from(elements, (element, index) => (
        <Fragment key={index}>{element}</Fragment>
      ))}
      <AbcFillSymbol size={props.size} data-testid="csp-symbol" />
    </>
  );
}
