import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./Layouts/Main";
import AddEmployee from "./Pages/AddEmployee";
import AllEmployee from "./Pages/AllEmployee";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main/>,
      children: [
        {
          path: "/",
          element: <AddEmployee/>,
        },
        {
          path: "/allEmployee",
          element: <AllEmployee/>
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
