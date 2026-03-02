import '@udir-design/react/style.css';
import '@udir-design/theme/dataviz.css';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App';
import Article from './pages/Article';
import Dashboard from './pages/Dashboard';
import Form from './pages/Form';
import Home from './pages/Home';
import Page from './pages/Page';
import Table from './pages/Table';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/article', element: <Article /> },
      { path: '/page', element: <Page /> },
      { path: '/dashboard', element: <Dashboard /> },
      { path: '/table', element: <Table /> },
      { path: '/form', element: <Form /> },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
