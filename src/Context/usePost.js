import axios from "axios";
import { baseUrl } from "./baseUrl";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useLogin = (url, body) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const naviget = useNavigate();
  // send email and password
  const postLogin = (e) => {
    setLoading(true)
    e.preventDefault();
    axios
      .post(`${baseUrl}${url}`, body)
      .then((auth) => {
        if (auth) {
          setLoading(false)
          naviget("/");
          setError("");
          window.localStorage.setItem("token", auth.data.data.token);
        }
      })
      .catch((e) => {
        setLoading(false)
        setError("خطأ في البريد الإلكتروني او الكلمة السر");
      });
  };
  return { postLogin, error ,loading};
};
// post data all
const usePost = (url, body, p) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const postRe = (e) => {
    setLoading(true)
    setError("");
    e.preventDefault();
    axios
      .post(`${baseUrl}${url}`, body, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((auth) => {
        if (auth) {
          setLoading(false)
          p ? window.history.go(-1) : window.location.reload();
          setError("");
        }
      })
      .catch((e) => {
        setLoading(false)
        setError("خطأ في ادخال الحقول حاول مرة آخرى");
      });
  };

  return { postRe, error ,loading};
};
export default usePost;
