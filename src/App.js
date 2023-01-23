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
          element: <AllEmployee/>,
          loader: ()=> fetch('http://localhost:5000/employee')
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
