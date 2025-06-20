import { RequireAuth } from "./RequireAuth";

export async function Loader({ request }) {
  const pathname = new URL(request.url).pathname;
  console.log("Loaders pathname : ", pathname);
  await RequireAuth({ redirectTo: pathname });
  return null;
}
