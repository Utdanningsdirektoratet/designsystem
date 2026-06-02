import { Outlet } from 'react-router-dom';
import { TestFooter as Footer } from '@udir-design/demos/TestFooter';
import { TestHeader as Header } from '@udir-design/demos/TestHeader';
import { DemoBanner, SkipLink } from '@udir-design/react/beta';

function App() {
  return (
    <DemoBanner>
      <SkipLink href="#main-content">Hopp til hovedinnholdet</SkipLink>
      <Header />
      <main className="content" id="main-content">
        <Outlet />
      </main>
      <Footer />
    </DemoBanner>
  );
}

export default App;
