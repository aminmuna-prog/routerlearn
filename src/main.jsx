import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Index from ".";
import EditContact from "./EditContact";
import ErrorPage from "./Error";
import Root from "./Root";
import {
  createContactsAction,
  deleteContactAction,
  editContactAction,
  updateContactFavourite,
} from "./actions/contactsActions";
import "./index.css";
import { getContactloader, getContactsLoader } from "./loaders/contactsLoader";
import Contact from "./routes/contacts";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: getContactsLoader,
    action: createContactsAction,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Index />,
          },
          {
            path: "contacts/:contactId",
            element: <Contact />,
            action: updateContactFavourite,
            loader: getContactloader,
          },
          {
            path: "contacts/:contactId/edit",
            element: <EditContact />,
            loader: getContactloader,
            action: editContactAction,
          },
          {
            path: "contacts/:contactId/destroy",

            action: deleteContactAction,
            errorElement: <div>Oops! There was an error.</div>,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
