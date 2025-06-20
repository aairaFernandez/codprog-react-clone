import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import {
  Home,
  About,
  Profile,
  Login,
  MyCourses,
  Signup,
  CourseDetail,
} from "./pages/Index";
import { loginAction, loginLoader } from "./pages/Login.jsx";
import { myCourseLoader } from "./pages/MyCourses.jsx";
import { profileLoader } from "./pages/Profile.jsx";
import { signupAction, signupLoader } from "./pages/Signup.jsx";
import { logoutAction } from "./pages/Logout.jsx";
import { getUser } from "./utils/getUser.js";
import { homeLoader } from "./pages/Home.jsx";
import { courseDetailLoader } from "./pages/CourseDetail.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} loader={getUser} id="parentRoute">
      <Route path="/about" element={<About />} />
      <Route
        path="/signup"
        element={<Signup />}
        action={signupAction}
        loader={signupLoader}
      />

      <Route
        path="/logout"
        action={logoutAction}
        // loader={signupLoader}
      />

      <Route path="/home" element={<Home />} loader={homeLoader} />

      <Route
        path="/login"
        element={<Login />}
        action={loginAction}
        loader={loginLoader}
      />

      <Route path="/Profile" element={<Profile />} loader={profileLoader} />

      <Route
        path="/course-details/:id"
        element={<CourseDetail />}
        loader={courseDetailLoader}
      />

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
