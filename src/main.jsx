import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import MainLayout from './layouts/MainLayout.jsx';
import Home from './pages/Home.jsx';
import Apps from './pages/Apps.jsx';
import AppDetails from './pages/AppDetails.jsx';
import Installation from './pages/Installation.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import AppNotFound from './pages/AppNotFound.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "apps",
        element: <Apps />
      },
      {
        path: "apps/:id",
        element: <AppDetails />
      },
      {
        path: "apps/*",
        element: <AppNotFound />
      },
      {
        path: "installation",
        element: <Installation />
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
