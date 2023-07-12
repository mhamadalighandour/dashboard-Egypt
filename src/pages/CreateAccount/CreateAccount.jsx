import { useEffect, useState } from "react";
import {
  Border,
  Button,
  ButtonApp,
  Container,
  Imports,
} from "../../components/index";
import useFetch from "../../Context/useFetch";
import { useParams } from "react-router-dom";
import axios from "axios";
import { baseUrl, imgUrl } from "../../Context/baseUrl";
import userPhoto from "../../images/user.jpeg";

const CreateAccount = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [image, setImage] = useState();
  const [file, setFile] = useState(null);

  const [error, setError] = useState("");
  const [postData, setPostData] = useState({
    name: "",
    username: "",
    job: "",
    age: "",
    phone_number: "",
    email: "",
    password: "",
    role_id: "",
    party_name: "",
    room_id: "",
    membership_id: "",
    location: "",
    hotel_id: "",
    other1: "",
    other2: "",
    other3: "",
  });
  const { data } = useFetch("admin/hotels?paginate=none");
  const { data: dataRooms } = useFetch(
    `admin/hotels/${postData.hotel_id}/rooms?housing=1`
  );
  const { data: dataRole } = useFetch(`admin/memberships`);

  const handleLogoChange = (event) => {
    const file = event.target.files[0];
    const logo = URL.createObjectURL(file);
    setImage(logo);
    setFile(file);
  };
  const { data: datas } = useFetch(`admin/users/${id}`);
  let dataAll = datas?.data.data;
  const postRe = (e) => {
    setError("");
    setLoading(true);
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
    formdata.append("membership_id", postData.membership_id);
    formdata.append(
      `${postData.room_id === "-1" ? "" : postData.room_id ? "room_id" : ""}`,
      postData.room_id
    );
    formdata.append(
      `${postData.hotel_id ? "hotel_id" : ""}`,
      postData.hotel_id
    );
    formdata.append(
      `${postData.location ? "location" : ""}`,
      postData.location
    );
    formdata.append(`${postData.other1 ? "other1" : ""}`, postData.other1);
    formdata.append(`${postData.other2 ? "other2" : ""}`, postData.other2);
    formdata.append(`${postData.other3 ? "other3" : ""}`, postData.other3);
    formdata.append("party_name", postData.party_name);

    axios
      .post(
        `${baseUrl}${isNaN(id) ? "admin/users" : `admin/users/${id}`}`,
        formdata,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((auth) => {
        if (auth) {
          setError("");
          window.history.go(-1);
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
      ...postData,
      name: dataAll?.name,
      username: dataAll?.username,
      job: dataAll?.job,
      age: dataAll?.age,
      phone_number: dataAll?.phone_number,
      email: dataAll?.email,
      membership_id: dataAll?.membership_id,
      hotel_id: dataAll?.hotel_id || "",
      password: dataAll?.password,
      party_name: dataAll?.party_name,
      location: dataAll?.location,
      other1: dataAll?.other1,
      other2: dataAll?.other2,
      other3: dataAll?.other3,
      room_id: dataAll?.room_id,
    });
  }, [dataAll]);
  return (
    <Container>
      {loading ? <div className="loading"></div> : ""}
      <Border>
        <div className="space-y-6">
          <div className="flex gap- max-md:flex-wrap flex-row-reverse">
            <Imports
              value={postData.name}
              onChange={(e) =>
                setPostData({ ...postData, name: e.target.value })
              }
              title=":الاسم*"
              placeholder=""
            />
            <Imports
              value={postData.username}
              onChange={(e) =>
                setPostData({ ...postData, username: e.target.value })
              }
              title=":اسم المستخدم*"
              placeholder=""
            />
            <Imports
              value={postData.job}
              onChange={(e) =>
                setPostData({ ...postData, job: e.target.value })
              }
              title=" :الوظيفة*"
            />
          </div>
          <div className="flex gap-4 max-md:flex-wrap flex-row-reverse">
            <div className="w-[50%] max-md:w-full mr-4">
              <Imports
                value={postData.age}
                onChange={(e) =>
                  setPostData({ ...postData, age: e.target.value })
                }
                title=" :العمر*"
              />
            </div>
            <div className="w-[70%] max-md:w-full">
              <Imports
                value={postData.phone_number}
                onChange={(e) =>
                  setPostData({ ...postData, phone_number: e.target.value })
                }
                title=":الهاتف*"
              />
            </div>
            <Imports
              value={postData.email}
              type="email"
              onChange={(e) =>
                setPostData({ ...postData, email: e.target.value })
              }
              title=":بريد الكتروني*"
            />
          </div>
          <div className="flex  max-md:flex-wrap flex-row-reverse">
            <Imports
              value={postData.password}
              type="password"
              onChange={(e) =>
                setPostData({ ...postData, password: e.target.value })
              }
              title=":كلمة السر*"
            />
            <Imports
              value={postData.party_name}
              onChange={(e) =>
                setPostData({ ...postData, party_name: e.target.value })
              }
              title=":اسم الحزب"
            />
            <Imports
              value={postData.location}
              onChange={(e) =>
                setPostData({ ...postData, location: e.target.value })
              }
              title=":عنوان السكن"
            />
          </div>
          <div className="flex gap-4 max-sm:flex-wrap flex-row-reverse">
            <pre className="flex items-center border-b font-semibold text-Brown border-Brown -ml-4 justify-end  max-md:p-0">
              :اسم الفندق*
            </pre>
            <select
              defaultValue=""
              name=""
              value={postData.hotel_id}
              className="outline-none border-b w-full border-Brown"
              onChange={(e) =>
                setPostData({
                  ...postData,
                  hotel_id: e.target.value,
                })
              }
            >
              <option value=""></option>
              {data?.data.data.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.name}
                </option>
              ))}
            </select>
            <pre className="flex items-center border-b font-semibold text-Brown border-Brown -ml-4 justify-end  max-md:p-0">
              :رقم الغرفة
            </pre>
            <select
              defaultValue=""
              className="outline-none border-b w-full border-Brown"
              id=""
              value={postData.room_id}
              onChange={(e) =>
                setPostData({
                  ...postData,
                  room_id: e.target.value,
                })
              }
            >
              <option value=""></option>
              {dataRooms?.data.data?.map((e) => (
                <option key={e.id} value={e.id}>
                  رقم الغرفة {e.number} || السعة {e.number_of_reserved_places} /{" "}
                  {e.number_of_places}
                </option>
              ))}
            </select>
            <pre className="flex items-center border-b font-semibold text-Brown border-Brown -ml-4 justify-end  max-md:p-0">
              :نوع العضوية*
            </pre>
            <select
              defaultValue="0"
              value={postData.membership_id}
              className="outline-none border-b border-Brown w-full"
              onChange={(e) =>
                setPostData({
                  ...postData,
                  membership_id: e.target.value,
                })
              }
            >
              <option value="0"></option>
              {dataRole?.data.data.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex  max-md:flex-wrap flex-row-reverse">
            <Imports
              value={postData.other1}
              onChange={(e) =>
                setPostData({ ...postData, other1: e.target.value })
              }
              title=":معلومات أخرى1"
            />
            <Imports
              value={postData.other2}
              onChange={(e) =>
                setPostData({ ...postData, other2: e.target.value })
              }
              title=":معلومات أخرى2"
            />
            <Imports
              value={postData.other3}
              onChange={(e) =>
                setPostData({ ...postData, other3: e.target.value })
              }
              title=" :معلومات أخرى3"
            />
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
                <div className=" flex flex-row-reverse">
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
          {isNaN(id) ? (
            <Button click={postRe} />
          ) : (
            <ButtonApp onClick={postRe}>
              <span className="px-10">تعديل</span>
            </ButtonApp>
          )}
        </div>
      </Border>
    </Container>
  );
};

export default CreateAccount;
