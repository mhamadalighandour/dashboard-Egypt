import React, { useEffect, useState } from "react";
import { Border, ButtonApp, Container, Imports } from "../../components";
import { useParams } from "react-router-dom";
import axios from "axios";
import { baseUrl, imgUrl } from "../../Context/baseUrl";
import useFetch from "../../Context/useFetch";
import userPhoto from "../../images/user.jpeg";
const CreateAdmin = () => {
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  const [image, setImage] = useState();
  const [file, setFile] = useState();
  const [error, setError] = useState("");
  const [postData, setPostData] = useState({
    name: "",
    username: "",
    job: "",
    age: "",
    phone_number: "",
    email: "",
    password: "",
    location: "",
    role_id: "",
  });
  const { data } = useFetch("admin/roles");

  const handleLogoChange = (event) => {
    const file = event.target.files[0];
    const logo = URL.createObjectURL(file);
    setImage(logo);
    setFile(file);
  };
  const { data: data2 } = useFetch(`admin/admins/${id}`);
  let dataAll = data2?.data.data;
  const postRe = (e) => {
    setLoading(true);
    setError("");
    e.preventDefault();
    let formdata = new FormData();
    formdata.append("name", postData.name);
    formdata.append("username", postData.username);
    formdata.append("job", postData.job);
    formdata.append(`${file ? "image" : ""}`, file);
    formdata.append("phone_number", postData.phone_number);
    formdata.append("age", postData.age);
    formdata.append("email", postData.email);
    formdata.append("password", postData.password);
    formdata.append("role_id", postData.role_id);
    formdata.append("location", postData.location);
    axios
      .post(
        `${baseUrl}${isNaN(id) ? "admin/admins" : `admin/admins/${id}`}`,
        formdata,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((auth) => {
        if (auth) {
          window.history.go(-1);
          setError("");
          setLoading(false);
        }
      })
      .catch((e) => {
        setError("خطأ في ادخال الحقول حاول مرة آخرى");
        setLoading(false);
      });
  };
  useEffect(() => {
    setPostData({
      name: dataAll?.name,
      username: dataAll?.username,
      job: dataAll?.job,
      age: dataAll?.age,
      phone_number: dataAll?.phone_number,
      email: dataAll?.email,
      location: dataAll?.location,
      role_id: dataAll?.role_id,
    });
  }, [dataAll]);
  return (
    <Container>
      {loading ? <div className="loading"></div> : ""}
      <Border>
        <div className="space-y-8">
          <div className="flex gap-4 max-md:flex-wrap flex-row-reverse">
            <Imports
              value={postData.name}
              title=":الاسم "
              onChange={(e) =>
                setPostData({ ...postData, name: e.target.value })
              }
            />
            <Imports
              value={postData.username}
              title=":اسم المستخدم"
              onChange={(e) =>
                setPostData({ ...postData, username: e.target.value })
              }
            />
            <Imports
              value={postData.job}
              title=":الوظيفة"
              onChange={(e) =>
                setPostData({ ...postData, job: e.target.value })
              }
            />
          </div>
          <div className="flex gap-4 max-md:flex-wrap flex-row-reverse">
            <Imports
              value={postData.age}
              title=":العمر"
              onChange={(e) =>
                setPostData({ ...postData, age: e.target.value })
              }
            />
            <Imports
              value={postData.email}
              title=":الايميل"
              onChange={(e) =>
                setPostData({ ...postData, email: e.target.value })
              }
            />
            <Imports
              value={postData.password}
              type="password"
              title=":كلمة السر"
              onChange={(e) =>
                setPostData({ ...postData, password: e.target.value })
              }
            />
          </div>
          <div className="flex gap-4 max-md:flex-wrap flex-row-reverse">
            <Imports
              value={postData.phone_number}
              title=":الهاتف"
              onChange={(e) =>
                setPostData({ ...postData, phone_number: e.target.value })
              }
            />
            <Imports
              value={postData.location}
              title=":العنوان"
              onChange={(e) =>
                setPostData({ ...postData, location: e.target.value })
              }
            />
            <pre className="flex items-center border-b font-semibold text-Brown border-Brown -ml-4 justify-end  max-md:p-0">
              :الصلاحية
            </pre>
            <select
              className="outline-none border-b w-full border-Brown"
              id=""
              value={postData.role_id}
              onChange={(e) =>
                setPostData({
                  ...postData,
                  role_id: e.target.value,
                })
              }
            >
              <option value=""></option>
              {data?.data.data.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.ar_name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-center flex-wrap gap-5">
            <div className="border-dashed border-[2px] border-Brown rounded-lg ">
              <div className="flex items-center justify-center ">
                <input
                  id="file-input"
                  type="file"
                  onChange={handleLogoChange}
                  style={{ display: "none" }}
                  accept="image/*"
                  multiple
                />
                <button
                  className="px-20 py-10"
                  onClick={() => document.getElementById("file-input").click()}
                >
                  أضف صورة الشخصية
                </button>
                <div className="flex flex-row-reverse">
                  {!image ? (
                    <div className="relative">
                      <img
                        src={`${dataAll?.image? imgUrl + dataAll?.image : userPhoto}`}
                        alt=""
                        className="w-[300px] h-[220px] mx-auto"
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  {image && (
                    <div className="relative">
                      <div
                        onClick={() => {
                          setImage("");
                          setFile("");
                        }}
                        className="bg-red-600 text-white w-5 h-5 rounded-full absolute -top-2 -left-1 z-10 flex cursor-pointer items-center justify-center "
                      >
                        X
                      </div>
                      <img
                        className="w-[300px] h-[220px] mx-auto"
                        src={image}
                        alt=""
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="text-red-500">{error}</div>
          <div>
            {isNaN(id) ? (
              <ButtonApp onClick={postRe}>
                <span className="px-10">انشاء</span>
              </ButtonApp>
            ) : (
              <ButtonApp onClick={postRe}>
                <span className="px-10">تعديل</span>
              </ButtonApp>
            )}
          </div>
        </div>
      </Border>
    </Container>
  );
};

export default CreateAdmin;
