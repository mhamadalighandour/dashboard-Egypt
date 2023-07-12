import React from "react";
import {
  BodyCard,
  Border,
  ButtonApp,
  Container,
  Imports,
} from "../../components/index";
import { useState } from "react";
import axios from "axios";
import { baseUrl } from "../../Context/baseUrl";
import useFetch from "../../Context/useFetch";
import Img1 from "../../images/Path 2281.png";

const EnterHotelsTwo = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);
  const [error, setError] = useState("");
  const [rooms, setRooms] = useState([]);
  const [roomsName, setRoomsName] = useState({
    number: "",
    preview_url: "",
    number_of_places: "",
    floor_number: "",
  });
  const [postData, setPostData] = useState({
    name: "",
    province_id: "",
    location: "",
    rooms_count: "",
    floor_number: "",
  });
  const { data } = useFetch("admin/provinces");
  postData.rooms_count = rooms.length;
  const postRe = (e) => {
    setLoading(true);
    setError("");
    e.preventDefault();
    let formdata = new FormData();
    formdata.append("name", postData.name);
    formdata.append("province_id", postData.province_id);
    formdata.append("location", postData.location);
    formdata.append("rooms_count", postData.rooms_count);
    formdata.append("floor_number", postData.floor_number);
    formdata.append(rooms ? "rooms" : "", JSON.stringify(rooms));
    for (let i = 0; i < images.length; i++) {
      formdata.append("images[]", images[i]);
    }
    axios
      .post(`${baseUrl}admin/hotels`, formdata, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((auth) => {
        if (auth) {
          setLoading(false);
          window.history.go(-1);
          setError("");
        }
      })
      .catch((e) => {
        setError("خطأ في ادخال الحقول حاول مرة آخرى");
        setLoading(false);
      });
  };

  let { number, preview_url, number_of_places, floor_number } = roomsName;
  const clickAddRoom = () => {
    if (
      roomsName.number &&
      roomsName.floor_number &&
      roomsName.number_of_places &&
      roomsName.preview_url
    ) {
      setRooms([
        ...rooms,
        { number, preview_url, number_of_places, floor_number },
      ]);
      setRoomsName({
        number: "",
        preview_url: "",
        number_of_places: "",
        floor_number: "",
      });
    }
  };

  const handleImageChange = (event) => {
    const inputFiles = event.target.files;
    for (let i = 0; i < inputFiles.length; i++) {
      setImages((prevFiles) => [...prevFiles, inputFiles[i]]);
    }
    const files = event.target.files;
    const imageUrls = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    setImageUrls((prevImageUrls) => [...prevImageUrls, ...imageUrls]);
  };

  return (
    <>
      {loading ? <div className="loading"></div> : ""}
      <Container>
        <Border>
          <div className="space-y-2">
            <div className="flex gap-4 max-md:flex-wrap flex-row-reverse ">
              <Imports
                title=":اسم الفندق*"
                onChange={(e) =>
                  setPostData({ ...postData, name: e.target.value })
                }
              />
              <pre className="flex items-center border-b font-semibold text-Brown border-Brown -ml-4 justify-end  max-md:p-0">
                : المحافظة*
              </pre>
              <select
                defaultValue=""
                name=""
                className="outline-none border-b w-full border-Brown"
                onChange={(e) =>
                  setPostData({ ...postData, province_id: e.target.value })
                }
              >
                <option value=""></option>
                {data?.data.data.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-4 max-md:flex-wrap flex-row-reverse ">
              <Imports
                title=":العنوان*"
                onChange={(e) =>
                  setPostData({ ...postData, location: e.target.value })
                }
              />
              <Imports
                title=":عدد الطوابق*"
                onChange={(e) =>
                  setPostData({ ...postData, floor_number: e.target.value })
                }
              />
            </div>
            <div className="w-3/4 border-Brown border-b mx-auto py-2"></div>
            <div className="flex gap-4 max-md:flex-wrap flex-row-reverse ">
              <Imports
                value={roomsName.number}
                autoComplete="off"
                title=":رقم الغرفة"
                onChange={(e) =>
                  setRoomsName({ ...roomsName, number: e.target.value })
                }
              />
              <Imports
                value={roomsName.floor_number}
                autoComplete="off"
                title=":رقم الطابق"
                onChange={(e) =>
                  setRoomsName({ ...roomsName, floor_number: e.target.value })
                }
              />
              <Imports
                value={roomsName.number_of_places}
                autoComplete="off"
                title=":عدد الأماكن"
                onChange={(e) =>
                  setRoomsName({
                    ...roomsName,
                    number_of_places: e.target.value,
                  })
                }
              />
              <Imports
                value={roomsName.preview_url}
                autoComplete="off"
                title=":رابط"
                onChange={(e) =>
                  setRoomsName({ ...roomsName, preview_url: e.target.value })
                }
              />
            </div>
            <div className="flex justify-between items-center">
              <div className="bg-Brown px-5 py-3 rounded-xl text-white ">
                عدد الغرف : {rooms.length}
              </div>
              <button
                onClick={() => clickAddRoom()}
                className="m-3 border border-Brown text-Brown font-semibold bg-white px-12 py-1 rounded-xl hover:bg-Brown hover:text-white transition-all"
              >
                اضافة
              </button>
            </div>
            <div className="flex justify-center text-Brown gap-4 flex-wrap">
              {rooms.map((e, i) => (
                <div
                  key={i}
                  className={`border border-Brown p-5  max-sm:m-0 rounded-xl space-y-3`}
                >
                  <div className="flex justify-start">
                    <div className="flex items-center justify-center space-x-4 ">
                      <img
                        src={Img1}
                        alt=""
                        onClick={() => {
                          let total = [...rooms];
                          total.splice(i, 1);
                          setRooms(total);
                        }}
                        className="cursor-pointer"
                      />
                    </div>
                  </div>
                  <div className="text-end">
                    <div className="flex flex-col px-2 text-end ">
                      <BodyCard value={e.number} name=":رقم الغرفة" />
                      <BodyCard value={e.floor_number} name=":رقم الطابق" />
                      <BodyCard
                        value={e.number_of_places}
                        name=":عدد الأماكن"
                      />
                      <BodyCard value={e.preview_url} name=":رابط" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-dashed border-[2px] border-Brown rounded-lg w-fit mx-auto  p-3">
              <div className="flex items-center justify-center">
                <input
                  id="file-inputs"
                  type="file"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                  accept="image/*"
                  multiple
                />
                <button
                  className={`px-20 py-10 `}
                  onClick={() => document.getElementById("file-inputs").click()}
                >
                  أضف صور للفندق
                </button>
              </div>
              <div className="flex gap-3 flex-wrap">
                {imageUrls.map((e, i) => (
                  <>
                    <div
                      onClick={() => {
                        let total = [...imageUrls];
                        total.splice(i, 1);
                        setImageUrls(total);
                      }}
                      className="bg-red-600 text-white w-5 h-5 rounded-full -mr-7 z-10 flex cursor-pointer items-center justify-center"
                    >
                      X
                    </div>
                    <img
                      key={i}
                      className="w-[150px] h-[150px]  m-2"
                      src={e}
                      alt=""
                    />
                  </>
                ))}
              </div>
            </div>
            <div className="text-red-500">{error}</div>
            <div className="">
              <ButtonApp onClick={postRe}>
                <span className="px-5 ">انشاء</span>
              </ButtonApp>
            </div>
          </div>
        </Border>
      </Container>
    </>
  );
};

export default EnterHotelsTwo;
