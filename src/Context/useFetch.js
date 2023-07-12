import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "./baseUrl";

const useFetch = (url, urlDelete) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteIte, setDeleteIte] = useState("");
  //fetch  data
  useEffect(() => {
    axios
      .get(`${baseUrl}${url}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((req) => {
        if (req) {
          setData(req);
          
          setLoading(false);
          setError("");
        }
      })
      .catch((e) => {
        setLoading(false);
        setError("خطأ في جلب البيانات");
      });
  }, [url]);

  // pagination
  const handlePageClick = (event) => {
    setLoading(true);
    axios
      .get(`${baseUrl}${url}?page=${event.selected + 1}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((req) => {
        setData(req);
        setLoading(false);
        return req;
      })
      .catch((e) => setLoading(false));
  };

  // delete item
  const deleteItem = async (e) => {
    setLoading(true);
    axios
      .delete(`${baseUrl}${urlDelete || url}/${e.id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((req) => {
        setDeleteIte("تم الحذف  بنجاح");
        setError("تم الحذف  بنجاح");
        window.location.reload();
        setLoading(false);
      })
      .catch((e) => {
        setError(" خطأ في الحذف  حاول مرة آخرى");
        setDeleteIte(" خطأ في الحذف  حاول مرة آخرى");
        setLoading(false);
      });
  };
  //
  const deleteError = () => {
    setDeleteIte("");
    setError("");
  };
  return {
    data,
    loading,
    error,
    handlePageClick,
    deleteIte,
    deleteItem,
    deleteError,
  };
};

export default useFetch;
