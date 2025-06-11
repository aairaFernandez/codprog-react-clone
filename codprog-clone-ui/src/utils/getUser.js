export async function getUser() {
  //don't forget to link loginLoader function in login route
  if ("user" in localStorage) {
    // "user" is a key in localStorage
    // console.log("user already loggined");

    const user = JSON.parse(localStorage.getItem("user"));

    console.log(user);
    if (
      "id" in user && // need to check all key of user object(line 11)
      // {"id", "access_token", "refresh_token", "expires_at"} in string keys with ""
      "access_token" in user &&
      "refresh_token" in user &&
      "expires_at" in user
    ) {
      return user;
    }
    }
    return null;
}