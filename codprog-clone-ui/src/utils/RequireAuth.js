import { getUser } from "../utils/getUser";
import { redirect } from "react-router-dom";

export async function RequireAuth({ redirectTo }) {
  const user = await getUser();
  if (user === null) {
    throw redirect(`/login?redirectTo=${redirectTo}`);
  }
}
