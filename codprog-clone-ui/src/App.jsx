import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import { About, Home, Login, MyCourses, Signup } from "./pages/Index";
import { loginAction, loginLoader } from "./pages/Login.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route path="/about" element={<About />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/login"
        element={<Login />}
        action={loginAction}
        loader={loginLoader}
      />
      <Route path="/Home" element={<Home />} />
      <Route path="/MyCourses" element={<MyCourses />} />
    </Route>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
