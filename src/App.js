import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./Layouts/Main";
import AddEmployee from "./Pages/AddEmployee";
import AllEmployee from "./Pages/AllEmployee";
import UpdateEmployee from "./Pages/UpdateEmployee";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      children: [
        {
          path: "/",
          element: <AddEmployee />,
        },
        {
          path: "/allEmployee",
          element: <AllEmployee />,
        },
        {
          path: "/allEmployee/:id",
          element: <UpdateEmployee />,
          loader: ({ params }) =>
            fetch(`http://localhost:5000/employee/${params.id}`),
        },
      ],
    },
  ]);
  return (
    <main>
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
