export default function authHeader() {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user.headerValue);
  if (user && user.headerValue) {
    return { Authorization: "Bearer  " + user.headerValue }; // for Spring Boot back-end
    // return { 'x-access-token': user.accessToken };       // for Node.js Express back-end
  } else {
    return {};
  }
}
