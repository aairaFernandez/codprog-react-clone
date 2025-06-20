import React from "react";
import { Loader } from "../utils/Loader";
import { SIGNUP_URL, SUPABASE_API_KEY } from "../constants";
import { Form, useActionData, redirect } from "react-router-dom";
import { getUser } from "../utils/getUser";
import axios from "axios";

export async function signupLoader({ request }) {
  const user = await getUser();
  if (user === null) {
    return null;
  } else {
    return redirect("/");
  }
}

export async function signupAction({ request }) {
  const data = await request.formData();

  const newUser = {
    email: data.get("email"),
    password: data.get("password"),
  };

  const confirmPassword = data.get("confirm-password");

  if (confirmPassword !== newUser.password) {
    return { error: "confirm password doesnot matches with password" };
  }

  try {
    const response = await axios.post(SIGNUP_URL, newUser, {
      headers: {
        apikey: SUPABASE_API_KEY,
        "Content-Type": "application/json",
      },
    });

    const data = response.data;

    if (data.identities && data.identities.length === 0) {
      return { error: "User already exists" };
    }

    return { message: "Confirm your email" };
  } catch (error) {
    console.log("error : ", error);
    return { error: error.message };
  }
}

function Signup() {
  return (
    <Form action="/signup" method="post">
      <h2> Create a new Account</h2>

      <div>
        {/* <label htmlFor="email">Email : </label> */}
        <input
          type="email"
          name="email"
          id="email"
          placeholder=" email"
          autoComplete="off"
        />
      </div>

      <div>
        {/* <label htmlFor="password">Password : </label> */}
        <input
          type="password"
          name="password"
          id="password"
          placeholder=" password"
          autoComplete="off"
        />
      </div>

      <div>
        {/* <label htmlFor="confirm-password">Confirm Password : </label> */}
        <input
          type="password"
          name="confirm-password"
          id="confirm-password"
          placeholder=" confirm-password"
          autoComplete="off"
        />
      </div>

      <div>
        <input type="submit" value="Sign Up" />
      </div>
    </Form>
  );
}

export default Signup;
