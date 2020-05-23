import axios from "axios";

export const register = (newUser) => {
  return axios
    .post("http://localhost:3000/admin/register", {
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
    .post("http://localhost:3000/admin/login", {
      email: user.email,
      password: user.password,
    })
    .then((res) => {
      console.log(res.log);
      localStorage.setItem("usertoken", res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};
