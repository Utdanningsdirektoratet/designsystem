import React from 'react';
import { Breadcrumbs } from '../../../../components/breadcrumbs/Breadcrumbs';
import styles from './BreadcrumbsDemo.module.scss';

export function BreadcrumbsDemo() {
  return (
    <Breadcrumbs aria-label="Du er her:" className={styles.breadcrumbs}>
      <Breadcrumbs.List>
        <Breadcrumbs.Item>
          <Breadcrumbs.Link href="#">Nivå 1</Breadcrumbs.Link>
        </Breadcrumbs.Item>
        <Breadcrumbs.Item>
          <Breadcrumbs.Link href="#">Nivå 2</Breadcrumbs.Link>
        </Breadcrumbs.Item>
        <Breadcrumbs.Item>
          <Breadcrumbs.Link href="#">Nivå 3</Breadcrumbs.Link>
        </Breadcrumbs.Item>
        <Breadcrumbs.Item>
          <Breadcrumbs.Link href="#">Nivå 4</Breadcrumbs.Link>
        </Breadcrumbs.Item>
      </Breadcrumbs.List>
    </Breadcrumbs>
  );
}
