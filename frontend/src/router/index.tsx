import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import AllNotebooks from '../components/AllNotebooks';
import CreateNotebookPage from '../components/CreateNotebookPage';
import UpdateNotebook from '../components/UpdateNotebook';
import NotebookNotes from '../components/NotebookNotes';
import CreateNote from '../components/CreateNote';
import UpdateNote from '../components/UpdateNote';

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
      {
        path: "/notebooks/:id/update",
        element: <UpdateNotebook />,
      },
      {
        path: "/notebooks/:id/notes",
        element: <NotebookNotes />,
      },
      {
        path: "/notebooks/:id/notes/create",
        element: <CreateNote/>,
      },
      {
        path: "/notebooks/:notebookId/notes/:id/update",
        element: <UpdateNote />,
      },
    ],
  },
]);
