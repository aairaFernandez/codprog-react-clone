import React from "react";
import { Form, redirect, useActionData } from "react-router-dom";
import axios from "axios";
import { SUPABASE_API_KEY, LOGIN_URL } from "../constants";

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
    const { access_token, refresh_token, expires_at } = response.data;
    const user = { access_token, refresh_token, expires_at };
    return redirect("/");
  } catch (error) {
    if (error.response.status === 400) console.log("Wrong email or password");
    else {
      return { error: error?.response?.data?.message || error.message };
    }
  }

  // console.log(response);

  // return null;
}

export default function Login() {
  const data = useActionData();
  console.log(data);
  return (
    <div>
      {/* <Form method="POST"></Form> */}
      <Form method="post" action="/login">
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
          <input type="submit" value="Login" />
        </div>
      </Form>
      {/* {data && data.error && <p>{data.error}</p>} */}
      <p>{data?.error}</p>
    </div>
  );
}
