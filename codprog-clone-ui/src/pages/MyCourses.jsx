import React from "react";
import { getUser } from "../utils/getUser";
import { redirect } from "react-router-dom";
import { RequireAuth } from "../utils/RequireAuth";

export async function myCourseLoader({ request }) {
  const pathname = new URL(request.url).pathname;
  await RequireAuth({ redirectTo: pathname });
  return null;

  // const user = getUser();
  // if (user === null) {
  //   return redirect("/login?redirectTo=/MyCourses");
  // } else {
  //   return null;
  // }
}

function MyCourses() {
  return <div>MyCourses</div>;
}

export default MyCourses;
