import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import { About, Profile, Login, MyCourses, Signup } from "./pages/Index";
import { loginAction, loginLoader } from "./pages/Login.jsx";
import { myCourseLoader } from "./pages/MyCourses.jsx";
import { profileLoader } from "./pages/Profile.jsx";

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
      <Route path="/Profile" element={<Profile />} loader={profileLoader} />
      <Route
        path="/MyCourses"
        element={<MyCourses />}
        loader={myCourseLoader}
      />
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
