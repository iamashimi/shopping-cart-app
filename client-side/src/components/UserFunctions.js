import axios from "axios";

export const register = (newUser) => {
  return axios
    .post("admin/register", {
      email: newUser.email,
      password: newUser.password,
      level: newUser.level,
    })
    .catch((err) => {
      console.log(err);
    });
};
export const login = (user) => {
  return axios
    .post("admin/login", {
      email: user.email,
      password: user.password,
    })
    .then((res) => {
      localStorage.setItem("usertoken", res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};
