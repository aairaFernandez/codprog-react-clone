import React from "react";
import {
  Form,
  redirect,
  useActionData,
  useLocation,
  useNavigation,
} from "react-router-dom";
import axios from "axios";
import { SUPABASE_API_KEY, LOGIN_URL } from "../constants";
import { getUser } from "../utils/getUser";

export async function loginLoader() {
  // //don't forget to link loginLoader function in login route
  // if ("user" in localStorage) {
  //   // "user" is a key in localStorage
  //   // console.log("user already loggined");

  //   const user = JSON.parse(localStorage.getItem("user"));

  //   console.log(user);
  //   if (
  //     "id" in user && // need to check all key of user object(line 11)
  //     // {"id", "access_token", "refresh_token", "expires_at"} in string keys with ""
  //     "access_token" in user &&
  //     "refresh_token" in user &&
  //     "expires_at" in user
  //   ) {
  //     return redirect("/home");
  //   }
  // }

  const user = await getUser();
  if (user === null) {
    return null;
  } else return redirect("/");
}

// export function loginAction() {
//   console.log("Running ActionLogin");
//   return null; //returning something is important in this function and this will be given
//   // as attribute to the Route tag, which has path same as action mentioned in this
//   // Form componenet of ReactRouterDom(RRD), and hence action function of route tag
//   // will be implemented, basically this function
// }

export async function loginAction({ request, params }) {
  // console.log("params : ", params); // right now not needed
  // console.log("request : ", request); // it helps us to get the formData,
  //  using request.formData(), It returns a promise.

  const data = await request.formData(); //as it returns promise....
  // in resolving promise, it takes some time,so we are using await and async.

  console.log("data : ", data);
  // console.log(data.get("email")); //when we are using this form component from RRD,
  // console.log(data.get("password")); //we need use name attribute with all inputs.

  const credentials = {
    email: data.get("email"),
    password: data.get("password"),
  };
  // console.log("credentials : ", credentials);

  try {
    const response = await axios.post(LOGIN_URL, JSON.stringify(credentials), {
      headers: {
        apikey: SUPABASE_API_KEY,
        "Content-Type": "application/json",
      },
    });
    console.log("response : ", response);
    const {
      access_token,
      refresh_token,
      expires_at,
      user: { id },
    } = response.data;
    const user = { access_token, refresh_token, expires_at, id };

    localStorage.setItem("user", JSON.stringify(user));
    //                   or
    // sessionStorage.setItem("user", JSON.stringify(user));

    // we prefer HTTPONLY COOKIES instead of local or session storage if we are building
    // our own backend using node, python or java. HTTPONLY COOKIES make sites more secure
    // as we can't access  javascript of site when httponly cookies are used.

    // for making MyCourse Protected route
    const redirectTo = new URL(request.url).searchParams.get("redirectTo");
    console.log("redirectTo : ", redirectTo);

    return redirect(redirectTo);
  } catch (error) {
    localStorage.removeItem("user");
    //        or
    // sessionStorage.removeItem("user");

    if (error.response.status === 400) console.log("Wrong email or password");
    else {
      return { error: error?.response?.data?.message || error.message };
    }
  }

  // console.log(response);

  // return null;
}

export default function Login() {
  const data = useActionData(); //useActionData() is a hook provided by
  // React Router (v6.4 and above), and it's used in loader/action-based data fetching
  //  — typically when working with form submissions in a route.

  // Why it's used:
  // 1). To capture response from the server/action:
  // When a form is submitted (like your login form), an action function
  // (defined in the route config or in the file-based routing setup) handles
  // the logic — such as authentication, database calls, etc.

  // 2). To handle errors or messages on the UI:
  // For example, if login fails (e.g., wrong password), the action can return
  // an object like

  // return { error: "Wrong username or password" };

  // This object becomes accessible in the component via useActionData()
  // so you can show error messages to the user.

  console.log(data);

  const location = useLocation(); // to bring the `login?redirectTo=${redirectTo}` to this file.
  console.log("location : ", location);
  const loginURL = location.pathname + location.search;

  const navigation = useNavigation();
  console.log("navigation : ", navigation);
  const isSubmitting = navigation.state === "submitting";

  return (
    <div>
      {/* <Form method="POST"></Form>       OR*/}
      <Form method="post" action={loginURL} replace>
        {/* this "replace" attribute helps in removing login page in back arrow histor, if the use login successfully and brings you to a page before then login screen */}

        <h3>Login Page</h3>
        <div>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="email"
            autoComplete="off"
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            autoCapitalize="off"
          />
        </div>
        <div>
          <input
            type="submit"
            value={isSubmitting ? "Submitting...." : "Login"}
            disabled={isSubmitting}
          />
        </div>
      </Form>
      {data && data.error && <p>{data.error}</p>}
      {/* <p>{data?.error}</p>  */}{" "}
      {/*will leave an empty <p> in browser inspect>>Element section */}
    </div>
  );
}
