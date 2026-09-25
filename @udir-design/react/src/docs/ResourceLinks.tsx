import type { JSX } from 'react';
import { Card } from 'src/components/card';
import { Link } from 'src/components/link/Link';
import type { HeadingProps } from 'src/components/typography/heading';
import { Heading } from 'src/components/typography/heading';
import { Paragraph } from 'src/components/typography/paragraph';
import styles from './ResourceLinks.module.css';

export function ResourceLink({
  href,
  illustration,
  headingLevel,
  heading,
  description,
}: {
  href: string;
  illustration: JSX.Element;
  headingLevel: HeadingProps['level'];
  heading: string;
  description: string;
}) {
  return (
    <Card>
      <Card.Block className={styles.illustration}>{illustration}</Card.Block>
      <Card.Block>
        <Heading level={headingLevel}>
          <a href={href}>{heading}</a>
        </Heading>
        <Paragraph>{description}</Paragraph>
      </Card.Block>
    </Card>
  );
}

export function ResourceLinkHorizontal({
  href,
  icon,
  activeIcon,
  headingLevel,
  heading,
  description,
}: {
  href: string;
  icon: JSX.Element;
  activeIcon?: JSX.Element;
  headingLevel: HeadingProps['level'];
  heading: string;
  description?: string;
}) {
  return (
    <Card className={styles.resourceLinkHorizontal} data-color="accent">
      <Card.Block>
        <Heading level={headingLevel}>
          <Link href={href}>{heading}</Link>
          {icon}
          {activeIcon}
        </Heading>
        {description && <Paragraph>{description}</Paragraph>}
      </Card.Block>
    </Card>
  );
}

export function ResourceLinkCompact({
  href,
  icon,
  headingLevel,
  heading,
}: {
  href: string;
  icon?: JSX.Element;
  headingLevel: HeadingProps['level'];
  heading: string;
}) {
  return (
    <Card className={styles.resourceLinkCompact}>
      <Card.Block className={styles.resourceLinkCompactContent}>
        {icon && <span className={styles.resourceLinkCompactIcon}>{icon}</span>}
        <Heading level={headingLevel} data-size="xs">
          <a href={href}>{heading}</a>
        </Heading>
      </Card.Block>
    </Card>
  );
}

export const figmaIllustration = (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 183 275"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M45.7704 275C71.0064 275 91.4981 254.473 91.4981 229.179V183.359H45.7704C20.5344 183.359 0.0427246 203.886 0.0427246 229.179C0.0427246 254.473 20.5286 275 45.7704 275Z"
      fill="#0ACF83"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 137.5C0 112.213 20.4859 91.6794 45.7277 91.6794H91.4553V183.367H45.7277C20.4835 183.342 0.0253902 162.842 0 137.546V137.5Z"
      fill="#A259FF"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 45.8207C0 20.5276 20.4859 0 45.7277 0H91.4553V91.6875H45.7277C20.4835 91.662 0.0253902 71.1623 0 45.8668V45.8207Z"
      fill="#F24E1E"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M91.0722 0H136.8C162.036 0 182.521 20.5276 182.521 45.8207C182.521 71.1138 162.036 91.6413 136.794 91.6413H91.0664L91.0722 0Z"
      fill="#FF7262"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M183 137.5C182.974 162.796 162.517 183.296 137.272 183.321C112.036 183.321 91.0664 162.794 91.0664 137.5C91.0918 112.205 111.549 91.705 136.794 91.6794C162.03 91.6794 182.521 112.207 182.521 137.5H183Z"
      fill="#1ABCFE"
    />
  </svg>
);

export const githubIllustration = (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 197 192"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M98.5 0C44.0717 0 1.05332e-05 44.0403 1.05332e-05 98.4298C-0.00955096 119.09 6.49069 139.229 18.5788 155.991C30.6669 172.752 47.7293 185.285 67.3459 191.811C72.2709 192.683 74.1283 189.716 74.1283 187.143C74.1283 184.809 73.9876 177.047 73.9876 168.807C49.25 173.363 42.8475 162.775 40.8775 157.235C39.7659 154.422 34.9675 145.676 30.7883 143.342C27.3267 141.486 22.4017 136.944 30.6476 136.817C38.415 136.691 43.9592 143.961 45.8025 146.899C54.6675 161.804 68.8234 157.614 74.4941 155.027C75.3525 148.629 77.9416 144.326 80.77 141.865C58.8467 139.405 35.9525 130.912 35.9525 93.2552C35.9525 82.5685 39.7659 73.7098 46.0417 66.8197C45.0567 64.3449 41.6233 54.2629 47.0267 40.7218C47.0267 40.7218 55.2867 38.1486 74.1142 50.8179C82.1331 48.5966 90.418 47.4802 98.7392 47.4994C107.112 47.4994 115.484 48.5962 123.364 50.8179C142.22 38.022 150.466 40.7218 150.466 40.7218C155.883 54.2629 152.436 64.3449 151.451 66.8057C157.727 73.6958 161.54 82.4279 161.54 93.2552C161.54 131.038 138.519 139.405 116.596 141.865C120.17 144.931 123.252 150.837 123.252 160.075C123.252 173.236 123.125 183.811 123.125 187.143C123.125 189.73 124.968 192.796 129.893 191.811C149.447 185.215 166.438 172.657 178.476 155.906C190.514 139.154 196.992 119.053 197 98.4298C197 44.0403 152.914 0 98.5 0Z"
      fill="black"
    />
  </svg>
);

export const udirIllustration = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="100%"
    height="100%"
  >
    <circle fill="#76c69d" cx="12" cy="12" r="12" />
    <g>
      <path
        fill="#fff"
        d="M18.26,4.55v9.25c0,2.22-1.8,4.02-4.02,4.02-.4,0-.78-.06-1.14-.16.42-.64.67-1.4.67-2.22V6.18l4.49-1.63Z"
      />
      <path
        fill="#303030"
        d="M13.11,17.65c-.72,1.08-1.95,1.8-3.35,1.8-2.22,0-4.02-1.8-4.02-4.02V6.81l4.49-1.63v8.62c0,1.82,1.21,3.36,2.88,3.85Z"
      />
    </g>
  </svg>
);
