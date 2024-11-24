export function setToken(data) {
  localStorage.setItem("access_token", JSON.stringify(data.accessToken));
  localStorage.setItem("refresh_token", JSON.stringify(data.refreshToken));
}

export function removeToken() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
}
