import { Outlet } from 'react-router-dom';
import { TestFooter as Footer } from './components/TestFooter';
import { TestHeader as Header } from './components/TestHeader';

function App() {
  return (
    <>
      <Header />
      <main className="content">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
