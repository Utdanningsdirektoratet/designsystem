import { Outlet } from 'react-router-dom';
import { DemoBanner, SkipLink } from '@udir-design/react/beta';
import { TestFooter as Footer } from './components/TestFooter';
import { TestHeader as Header } from './components/TestHeader';

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
