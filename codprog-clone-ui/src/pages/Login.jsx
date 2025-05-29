import React from "react";
import { Form } from "react-router-dom";

// export function loginAction() {
//   console.log("Running ActionLogin");
//   return null; //returning something is important in this function and this will be given
//   // as attribute to the Route tag, which has path same as action mentioned in this
//   // Form componenet of ReactRouterDom(RRD), and hence action function of route tag
//   // will be implemented, basically this function
// }

export async function loginAction({ request, params }) {
  console.log("params : ", params); // right now not needed
  console.log("request : ", request); // it helps us to get the formData,
  //  using request.formData(), It returns a promise.
  const data = await request.formData(); //as it returns promise....
  // in resolving promise, it takes some time,so we are using await and async.
  console.log("data : ", data);
  console.log(data.get("email")); //when we are using this form component from RRD,
  console.log(data.get("password")); //we need use name attribute with all inputs.
  const credentials = {
    email: data.get("email"),
    password: data.get("password"),
  };
  console.log("credentials : ", credentials);

  return null;
}

export default function Login() {
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
    </div>
  );
}
