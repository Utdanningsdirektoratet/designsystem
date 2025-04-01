import { Do, Dont, Stack } from '../../../../.storybook/docs-components';
import { Card, Details, Heading, Link, Paragraph } from '../../alpha';

export const DetailsEx1 = () => {
  return (
    <Stack style={{ margin: 'var(--ds-size-8) 0' }}>
      <Do description="Ved å bryte opp innholdet i flere Details blir det enklere for brukerne å finne det de leter etter.">
        <Ex1Do />
      </Do>
      <Dont description="Unngå å ha mange overskrifter og mye innhold i én Details.">
        <div style={{ height: '350px', overflowY: 'auto', width: '100%' }}>
          <Ex1Dont />
        </div>
      </Dont>
    </Stack>
  );
};

const Ex1Do = () => {
  return (
    <Stack>
      <Heading level={3}>Krav til utstyr på eksamen</Heading>
      <div style={{ width: '100%' }}>
        <Details>
          <Details.Summary>Eksamen med sikker nettleser</Details.Summary>
          <Details.Content>
            Noen fagkoder gjennomføres med sikker nettleser (Safe Exam Browser).
            Fagkodene det gjelder har informasjon om dette på kandidat.udir.no.
            På eksamensdagen må du ha med deg en datamaskin, pc eller Mac, for å
            kunne ta eksamen.
          </Details.Content>
        </Details>
        <Details>
          <Details.Summary>
            Krav til operativsystem og nettleser
          </Details.Summary>
          <Details.Content>
            Vi anbefaler at kandidatene bruker et operativsystem og en nettleser
            som er oppdatert siste år. Har kandidatene eldre versjoner av
            operativsystemer og nettlesere kan det hende at kandidatene ikke får
            tilgang til eksamenssystemet.
          </Details.Content>
        </Details>
        <Details>
          <Details.Summary>Internett-tilgang</Details.Summary>
          <Details.Content>
            Kandidatene må ha tilgang til internett hele eksamensdagen. Det
            betyr ikke at det skal være åpen tilgang til internett, men at
            kandidaten skal være pålogget <Link> kandidat.udir.no/</Link> under
            hele eksamensgjennomføringen.
          </Details.Content>
        </Details>
        <Details>
          <Details.Summary>Filtyper i eksamenssvar</Details.Summary>
          <Details.Content>
            Ved innlevering av eksamenssvar kan følgende filtyper brukes: avi,
            bmp, c, css, doc, docx, dot, dotx, emf, flv, ggb, gif, h, hlp, htm,
            html, jpe, jpeg, jpg, js, mdb, mdi, mht, mm, mov, movie, mp3, mp4,
            mpeg, mpp, odb, odp, ods, odt, ott, pdf, png, ppsx, ppt, pptx, qt,
            rap, rm, rtf, stw, svg, swf, sxc, sxw, tex, tif, tiff, tii, txt,
            vsd, wav, wmf, wmv, wri, xls, xlsb, xlsx, xml, xps
          </Details.Content>
        </Details>
      </div>
    </Stack>
  );
};

const Ex1Dont = () => {
  return (
    <Details defaultOpen style={{ width: '100%' }}>
      <Details.Summary>Krav til utstyr på eksamen</Details.Summary>
      <Details.Content>
        <Stack>
          <Heading level={3}>Eksamen med sikker nettleser</Heading>
          <Paragraph>
            Noen fagkoder gjennomføres med sikker nettleser (Safe Exam Browser).
            Fagkodene det gjelder har informasjon om dette på kandidat.udir.no.
            På eksamensdagen må du ha med deg en datamaskin, pc eller Mac, for å
            kunne ta eksamen.
          </Paragraph>
          <Heading level={3}>Krav til operativsystem og nettleser</Heading>
          <Paragraph>
            Vi anbefaler at kandidatene bruker et operativsystem og en nettleser
            som er oppdatert siste år. Har kandidatene eldre versjoner av
            operativsystemer og nettlesere kan det hende at kandidatene ikke får
            tilgang til eksamenssystemet.
          </Paragraph>
          <Heading level={3}>Internett-tilgang</Heading>
          <Paragraph>
            Kandidatene må ha tilgang til internett hele eksamensdagen. Det
            betyr ikke at det skal være åpen tilgang til internett, men at
            kandidaten skal være pålogget <Link> kandidat.udir.no/ </Link>
            under hele eksamensgjennomføringen.
          </Paragraph>
          <Heading level={3}>Filtyper i eksamenssvar</Heading>
          <Paragraph>
            Ved innlevering av eksamenssvar kan følgende filtyper brukes: avi,
            bmp, c, css, doc, docx, dot, dotx, emf, flv, ggb, gif, h, hlp, htm,
            html, jpe, jpeg, jpg, js, mdb, mdi, mht, mm, mov, movie, mp3, mp4,
            mpeg, mpp, odb, odp, ods, odt, ott, pdf, png, ppsx, ppt, pptx, qt,
            rap, rm, rtf, stw, svg, swf, sxc, sxw, tex, tif, tiff, tii, txt,
            vsd, wav, wmf, wmv, wri, xls, xlsb, xlsx, xml, xps
          </Paragraph>
        </Stack>
      </Details.Content>
    </Details>
  );
};

export const DetailsEx2 = () => {
  return (
    <Stack style={{ margin: 'var(--ds-size-8) 0' }}>
      <Do description="Bruk ramme dersom du bare har ett element i Details. Da vil det være lettere å identifisere at elementet kan interageres med.">
        <Ex2Do />
      </Do>
      <Dont description="Uten ramme er det vanskeligere å skille Details fra resten av innholdet.">
        <Ex2Dont />
      </Dont>
    </Stack>
  );
};

const Ex2Do = () => {
  return (
    <Card style={{ width: '100%' }} data-color="neutral">
      <Details>
        <Details.Summary>Vedlegg</Details.Summary>
        <Details.Content>Vedlegg 1, vedlegg 2, vedlegg 3</Details.Content>
      </Details>
    </Card>
  );
};

const Ex2Dont = () => {
  return (
    <Details style={{ width: '100%' }}>
      <Details.Summary>Vedlegg</Details.Summary>
      <Details.Content>Vedlegg 1, vedlegg 2, vedlegg 3</Details.Content>
    </Details>
  );
};
