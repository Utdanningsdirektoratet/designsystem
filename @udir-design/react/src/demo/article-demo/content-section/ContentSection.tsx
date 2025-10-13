import classes from '../ArticleDemo.module.css';
import { Fragment } from 'react/jsx-runtime';
import { SectionItem } from '../strings/sections';
import { Heading } from 'src/components/typography/heading/Heading';
import { Paragraph } from 'src/components/typography/paragraph/Paragraph';

export interface ContentSectionProps {
  section: SectionItem[];
}

export const ContentSection = ({ section }: ContentSectionProps) => (
  <section className={classes.content}>
    {section.map(({ heading, paragraph }, i) => (
      <Fragment key={i}>
        <Heading data-size={heading.size} level={heading.level}>
          {heading.text}
        </Heading>
        <Paragraph>{paragraph}</Paragraph>
      </Fragment>
    ))}
  </section>
);
