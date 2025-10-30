'use client';

import { ArrowRightIcon } from '@udir-design/icons';
import { Header, Heading, Link, List } from '@udir-design/react/alpha';

export function TestHeader() {
  return (
    <Header applicationName="Demoapp">
      <Header.MenuButton />
      <Header.Menu>
        <nav
          aria-labelledby="header-menu-theme1-navigation"
          style={{
            display: 'grid',
            gap: 'var(--ds-size-4)',
            gridTemplateColumns: 'repeat(auto-fill, minmax(12rem, 1fr))',
            justifyItems: 'center',
            margin: '0 auto',
            maxWidth: '800px',
            padding: 'var(--ds-size-5) var(--ds-size-15) var(--ds-size-10)',
            rowGap: 'var(--ds-size-10)',
          }}
        >
          <h2 className="ds-sr-only" id="header-menu-theme1-navigation">
            Demosider navigasjon
          </h2>
          <div>
            <Heading
              data-size="xs"
              level={3}
              style={{
                marginBottom: 'var(--ds-size-3)',
              }}
            >
              Demosider
            </Heading>
            <List.Unordered>
              <List.Item>
                <Link
                  href="/article"
                  style={{
                    textDecoration: 'none',
                  }}
                >
                  <ArrowRightIcon aria-hidden />
                  <span>Artikkel</span>
                </Link>
              </List.Item>
              <List.Item>
                <Link
                  href="/dashboard"
                  style={{
                    textDecoration: 'none',
                  }}
                >
                  <ArrowRightIcon aria-hidden />
                  <span>Dashbord</span>
                </Link>
              </List.Item>
              <List.Item>
                <Link
                  href="/page"
                  style={{
                    textDecoration: 'none',
                  }}
                >
                  <ArrowRightIcon aria-hidden />
                  <span>Page</span>
                </Link>
              </List.Item>
              <List.Item>
                <Link
                  href="/form"
                  style={{
                    textDecoration: 'none',
                  }}
                >
                  <ArrowRightIcon aria-hidden />
                  <span>Form</span>
                </Link>
              </List.Item>
              <List.Item>
                <Link
                  href="/table"
                  style={{
                    textDecoration: 'none',
                  }}
                >
                  <ArrowRightIcon aria-hidden />
                  <span>Table</span>
                </Link>
              </List.Item>
            </List.Unordered>
          </div>
        </nav>
      </Header.Menu>
    </Header>
  );
}
