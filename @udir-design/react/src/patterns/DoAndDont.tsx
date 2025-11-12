import { ArrowRightIcon } from '@udir-design/icons/dist';
import { Do, Dont, Stack } from '../../.storybook/docs/components';
import { Link } from '../components/link/Link';
import { List } from '../components/list/List';

/*
 * Dos and donts
 */

export const LinkEx1 = () => {
  return (
    <Stack style={{ margin: 'var(--ds-size-8) 0' }}>
      <Do description="Lenker uten understrek skal være merket med et pil-ikon">
        <Ex1Do />
      </Do>
      <Dont description="Unngå å ha lenker uten understrek i en vanlig liste">
        <Ex1Dont />
      </Dont>
    </Stack>
  );
};

const Ex1Do = () => {
  return (
    <List.Unordered
      style={{
        listStyle: 'none',
        padding: 0,
      }}
    >
      <List.Item>
        <Link style={{ textDecoration: 'none' }}>
          <ArrowRightIcon />
          <span>Lenke 1</span>
        </Link>
      </List.Item>
      <List.Item>
        <Link style={{ textDecoration: 'none' }}>
          <ArrowRightIcon />
          <span>Lenke 2</span>
        </Link>
      </List.Item>
      <List.Item>
        <Link style={{ textDecoration: 'none' }}>
          <ArrowRightIcon />
          <span>Lenke 3</span>
        </Link>
      </List.Item>
    </List.Unordered>
  );
};

const Ex1Dont = () => {
  return (
    <List.Unordered>
      <List.Item>
        <Link style={{ textDecoration: 'none' }}>Lenke 1</Link>
      </List.Item>
      <List.Item>
        <Link style={{ textDecoration: 'none' }}>Lenke 1</Link>
      </List.Item>
      <List.Item>
        <Link style={{ textDecoration: 'none' }}>Lenke 1</Link>
      </List.Item>
    </List.Unordered>
  );
};
