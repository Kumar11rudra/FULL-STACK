import { jwtDecode } from "jwt-decode";

export const generateToken = (username) => {

  const header = {

    alg: "HS256",

    typ: "JWT",

  };

  const payload = {

    username,

    role: "Student",

    exp:
      Math.floor(Date.now() / 1000) + 3600,

  };

  const encode = (obj) =>
    btoa(JSON.stringify(obj))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

  return `${encode(header)}.${encode(payload)}.signature`;

};

export const decodeToken = (token) => {

  try {

    return jwtDecode(token);

  } catch {

    return null;

  }

};
