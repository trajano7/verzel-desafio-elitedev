export function getTokenDuration() {
  const storedExpirationDate = localStorage.getItem("expiration");
  const expirationDate = new Date(storedExpirationDate);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();
  return duration;
}

export async function fetchIDList(token) {
  const response = await fetch("http://localhost:3000/favorites/", {
    headers: {
      'Authorization': 'Bearer ' + token
    },
  });

  if (!response.ok) {
    throw json(
      { message: "Could not fetch favorites IDs." },
      {
        status: response.status,
      }
    );
  } else {
    const resData = await response.json();
    return resData;
  }
}

export function getAuthToken() {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  const tokenDuration = getTokenDuration();

  if (tokenDuration < 0) {
    return "EXPIRED";
  } 

  return token;
}

export function clearLocalStorage() {
  localStorage.removeItem('token');
  localStorage.removeItem('expiration');
  localStorage.removeItem('username');
  localStorage.removeItem('profileVisibility');
}

export async function action({ request, params }) {
  const username = params.username;
  const method = request.method;
  const data = await request.formData();

  const token = getAuthToken();
  if (!token || token === "EXPIRED") {
    redirect("/auth?mode=login");
  }

  let url = "http://localhost:3000/favorites";

  let body = {};
  let headersObj = {
    Authorization: "Bearer " + token,
  }
  if (method === "POST") {
    body.movieID = data.get("movieID");
    headersObj = {
      "Content-Type": "application/json",
      ...headersObj,
    }
  } else if (method === "DELETE") {
    url += "/" + data.get("movieID");
  }

  const response = await fetch(url, {
    method: method,
    headers: headersObj,
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw json({ message: "Something went wrong." }, { status: 500 });
  }

  return null;
}