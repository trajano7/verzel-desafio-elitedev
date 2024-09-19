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

export const storeAuthData = (resData, username) => {
  const token = resData.token;
  const profileVisibility = resData.profileVisibility;

  localStorage.setItem("token", token);
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 12);
  // expiration.setSeconds(expiration.getSeconds() + 360);
  localStorage.setItem("expiration", expiration.toISOString());
};

export function clearLocalStorage() {
  localStorage.removeItem("token");
  localStorage.removeItem("expiration");
}

export function getTokenDuration() {
  const storedExpirationDate = localStorage.getItem("expiration");
  const expirationDate = new Date(storedExpirationDate);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();
  return duration;
}
