import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthUser() {
  const navigate = useNavigate();

  const getToken = () => {
    const tokenString = sessionStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    return userToken;
  };

  const getUser = () => {
    const userString = sessionStorage.getItem("user");
    const user_details = JSON.parse(userString);
    return user_details;
  };
  const getSuperUser = () => {
    const superUserString = sessionStorage.getItem("superUser");
    const super_user_details = JSON.parse(superUserString);
    return super_user_details;
  };

  const [token, setToken] = useState(getToken());
  const [user, setUser] = useState(getUser());
  const [superUser, setSuperUser] = useState(getSuperUser());

  const saveToken = (user, token,superUser) => {
    sessionStorage.setItem("token", JSON.stringify(token));
    sessionStorage.setItem("user", JSON.stringify(user));
    sessionStorage.setItem("superUser", JSON.stringify(superUser));
    setToken(token);
    setUser(user);
    setSuperUser(superUser);
    // console.log(token)
    navigate("/dashboard");
  };

  const http = axios.create({
     baseURL: "http://localhost:8000/api",
     //baseURL: "https://radiclehub.com/api",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return {
    setToken: saveToken,
    token,
    user,
    superUser,
    getToken,
    http,
  };
}
