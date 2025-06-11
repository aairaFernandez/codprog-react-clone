import React from "react";
import { RequireAuth } from "../utils/RequireAuth";

export async function profileLoader({ request }) {
  console.log("request : ", request);
  const pathname = new URL(request.url).pathname;
  await RequireAuth({ redirectTo : pathname });
  return null;
}

export default function Profile() {
  return <div>Profile</div>;
}
