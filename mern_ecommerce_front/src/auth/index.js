import { API } from "../config";

export const signup = (user) => {
  // console.log("name: ", name +"\n"+ "email: ", email +"\n"+  "password: ", password);
  return fetch(`${API}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      return err;
    });
};

export const signin = (user) => {
  // console.log("name: ", name +"\n"+ "email: ", email +"\n"+  "password: ", password);
  return fetch(`${API}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      return err;
    });
};

export const signout = (next) => {
  if (localStorage.getItem("jwt")) {
    localStorage.removeItem("jwt");
    next();
    // console.log("name: ", name +"\n"+ "email: ", email +"\n"+  "password: ", password);
    return fetch(`${API}/signout`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => {
        return err;
      });
  }
};

export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
}
