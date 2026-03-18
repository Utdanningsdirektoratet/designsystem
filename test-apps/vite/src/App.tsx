import { Outlet } from 'react-router-dom';
import { DemoBanner } from 'src/components/*';
import { TestFooter as Footer } from './components/TestFooter';
import { TestHeader as Header } from './components/TestHeader';

function App() {
  return (
    <DemoBanner>
      <Header />
      <main className="content">
        <Outlet />
      </main>
      <Footer />
    </DemoBanner>
  );
}

export default App;
