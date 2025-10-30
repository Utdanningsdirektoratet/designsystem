import { Outlet } from 'react-router-dom';
import { TestFooter as Footer } from './components/TestFooter';
import { TestHeader as Header } from './components/TestHeader';

function App() {
  return (
    <div className="content">
      <Header />
      <main className="outlet">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
