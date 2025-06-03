import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import AllNotebooks from '../components/AllNotebooks';
import CreateNotebookPage from '../components/CreateNotebookPage';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "/",
        element: <AllNotebooks />,
      },
      {
        path: "/notebooks/create",
        element: <CreateNotebookPage />,
      },
    ],
  },
]);
