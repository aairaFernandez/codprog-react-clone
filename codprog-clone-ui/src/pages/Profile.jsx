import React from "react";
import { RequireAuth } from "../utils/RequireAuth";
import { Loader } from "../utils/Loader";

export async function profileLoader({ request }) {
  console.log("request : ", request);
  // const pathname = new URL(request.url).pathname;
  // await RequireAuth({ redirectTo: pathname });
  // return null;

  return Loader({ request });
}

export default function Profile() {
  return <div>Profile</div>;
}
