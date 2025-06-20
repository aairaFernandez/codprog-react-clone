import { redirect } from "react-router-dom";
import { LOGOUT_URL, SUPABASE_API_KEY } from "../constants";
import { getUser } from "../utils/getUser";
import axios from "axios";
import isTokenExpired from "../utils/isTokenExpired";
import { RefreshToken } from "../utils/RefreshToken";

export async function logoutAction() {
  const { access_token, expire_at } = getUser();
  if (isTokenExpired) {
    console.log("Token expired :( ");
    const access_token = await RefreshToken();
  }

  try {
    const user = await getUser();
    console.log("logout's user.access_token : ", user.access_token);
    console.log("user : ", user);
    const response = await axios.post(LOGOUT_URL, null, {
      headers: {
        apikey: SUPABASE_API_KEY,
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.access_token}`,
      },
    });
  } catch (error) {
    console.error("error.message : ", error.message);
  } finally {
    localStorage.removeItem("user");
    return redirect("/");
  }
}
