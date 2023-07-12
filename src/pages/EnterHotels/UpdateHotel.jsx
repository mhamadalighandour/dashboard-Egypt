import {
  BodyCard,
  Border,
  ButtonApp,
  CardAll,
  Container,
  Imports,
} from "../../components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../Context/useFetch";
import usePost from "../../Context/usePost";
import { baseUrl, imgUrl } from "../../Context/baseUrl";
import axios from "axios";

const UpdateHotel = () => {
  const { id } = useParams();
  const { data } = useFetch(`admin/hotels/${id}`);
  const { data: data2 } = useFetch("admin/provinces");
  let dataAll = data?.data.data;
  const [postData, setPostData] = useState({
    name: "",
    province_id: "",
    location: "",
    rooms_count: "",
    floor_number: "",
  });

  const { postRe, error, loading } = usePost(
    `${`admin/hotels/${id}`}`,
    {
      ...postData,
    },
    true
  );
  useEffect(() => {
    setPostData({
      name: dataAll?.name,
      province_id: dataAll?.province_id,
      location: dataAll?.location,
      rooms_count: dataAll?.rooms_count,
      floor_number: dataAll?.floor_number,
    });
  }, [dataAll]);
  return (
    <Container>
      {loading ? <div className="loading"></div> : ""}
      <Border>
        <div className="flex gap-4 max-md:flex-wrap flex-row-reverse ">
          <Imports
            value={postData.name}
            title=":اسم الفندق*"
            onChange={(e) => setPostData({ ...postData, name: e.target.value })}
          />
          <pre className="flex items-center border-b font-semibold text-Brown border-Brown -ml-4 justify-end  max-md:p-0">
            : المحافظة*
          </pre>
          <select
            value={postData.province_id}
            defaultValue=""
            name=""
            className="outline-none border-b w-full border-Brown"
            onChange={(e) =>
              setPostData({ ...postData, province_id: e.target.value })
            }
          >
            <option value=""></option>
            {data2?.data.data.map((e) => (
              <option key={e.id} value={e.id}>
                {e.name}
              </option>
            ))}
          </select>
        </div>
        <br />
        <div className="flex gap-4 max-md:flex-wrap flex-row-reverse ">
          <Imports
            value={postData.location}
            title=":العنوان*"
            onChange={(e) =>
              setPostData({ ...postData, location: e.target.value })
            }
          />
          <Imports
            value={postData.floor_number}
            title=":عدد الطوابق*"
            onChange={(e) =>
              setPostData({ ...postData, floor_number: e.target.value })
            }
          />
        </div>
        <br />
        <div className="text-red-500">{error}</div>
        <ButtonApp onClick={postRe}>
          <span className="px-5 ">تعديل</span>
        </ButtonApp>
      </Border>
      <br />
      <Hotel />
    </Container>
  );
};

export default UpdateHotel;

const Hotel = () => {
  const { id } = useParams();
  const [rooms, setRooms] = useState(false);
  const [img, setImg] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);
  const [images, setImages] = useState([]);
  const [loadings, setLoadings] = useState(false);
  const [roomId, setRoomId] = useState();
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
  const [roomsName, setRoomsName] = useState({
    number: "",
    preview_url: "",
    number_of_places: "",
    floor_number: "",
  });
  const { data: dataImg, deleteItem: deleteItemImg } = useFetch(
    `admin/hotels/${id}/images`,
    `admin/hotels/images`
  );
  const { data: dataRooms, deleteItem: deleteItemRoom } = useFetch(
    `admin/hotels/${id}/rooms`,
    `admin/hotels/rooms`
  );
  const { data: dataRoom } = useFetch(
    isNaN(roomId) ? "" : `admin/hotels/rooms/${roomId} `
  );
  const { postRe, error, loading } = usePost(
    `${
      isNaN(roomId)
        ? `admin/hotels/${id}/rooms`
        : `admin/hotels/rooms/${roomId}`
    }`,
    {
      ...roomsName,
    }
  );

  const postRee = (e) => {
    e.preventDefault();
    setLoadings(true);
    let formdata = new FormData();
    for (let i = 0; i < images.length; i++) {
      formdata.append("images[]", images[i]);
    }
    axios
      .post(`${baseUrl}admin/hotels/${id}/images`, formdata, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((auth) => {
        if (auth) {
          setLoadings(false);
          window.location.reload();
        }
      })
      .catch((e) => {
        setLoadings(false);
      });
  };
  useEffect(() => {
    isNaN(roomId)
      ? setRoomsName({
          number: "",
          preview_url: "",
          number_of_places: "",
          floor_number: "",
        })
      : setRoomsName({
          number: dataRoom?.data.data.number,
          preview_url: dataRoom?.data.data.preview_url,
          number_of_places: dataRoom?.data.data.number_of_places,
          floor_number: dataRoom?.data.data.floor_number,
        });
  }, [dataRoom?.data.data, roomId]);
  return (
    <>
      {loading ? <div className="loading"></div> : ""}
      {loadings ? <div className="loading"></div> : ""}
      <Border>
        {loadings ? (
          <div className="loading"></div>
        ) : (
          <>
            <div>
              <div className="flex justify-center gap-3 flex-wrap">
                {dataImg?.data.data.map((e) => (
                  <div className="w-[200px] ">
                    <div
                      onClick={() => deleteItemImg(e)}
                      className="bg-red-600 -mb-2 relative text-white w-5 h-5 rounded-full -mr-5 z-10 flex cursor-pointer items-center justify-center "
                    >
                      X
                    </div>
                    <img
                      src={imgUrl + e.image}
                      alt=""
                      className="w-[250px] h-[150px] rounded-2xl "
                    />
                  </div>
                ))}
              </div>
              <div className="my-2">
                <button
                  onClick={() => setImg(!img)}
                  className="m-3 border border-Brown text-Brown font-semibold bg-white px-12 py-1 rounded-xl hover:bg-Brown hover:text-white transition-all"
                >
                  <span className="px-5">أضافة صور</span>
                </button>
              </div>

              <div className={`${img ? "" : "hidden"}`}>
                <div className="border-dashed border-[2px] border-Brown rounded-lg w-fit mx-auto p-3">
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
                      onClick={() =>
                        document.getElementById("file-inputs").click()
                      }
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
                          className="bg-red-600 text-white w-5 h-5 rounded-full -mr-7 z-10 flex cursor-pointer items-center justify-center "
                        >
                          X
                        </div>
                        <img
                          key={i}
                          className="w-[150px] h-[150px] m-2"
                          src={e}
                          alt=""
                        />
                      </>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={postRee}
                    className="m-3 border border-Brown text-Brown font-semibold bg-white px-12 py-1 rounded-xl hover:bg-Brown hover:text-white transition-all"
                  >
                    <span className="px-5">أضافة </span>
                  </button>
                </div>
              </div>
              <br />
              <div className="flex justify-center gap-3 flex-wrap">
                {dataRooms?.data.data.map((e, i) => (
                  <CardAll
                    key={i}
                    edit={() => {
                      setRooms(true);
                      setRoomId(e.id);
                    }}
                    delete={() => deleteItemRoom(e)}
                  >
                    <div className="flex flex-col px-2 text-end ">
                      <BodyCard value={e.number} name=":رقم الغرفة" />
                      <BodyCard value={e.floor_number} name=":رقم الطابق" />
                      <BodyCard
                        value={e.number_of_places}
                        name=":عدد الأماكن"
                      />
                      <BodyCard
                        value={e.preview_url.substring(0, 30) + "..."}
                        name=":رابط"
                      />
                    </div>
                  </CardAll>
                ))}
              </div>
              <div className="my-2">
                <button
                  onClick={() => {
                    setRooms(!rooms);
                    setRoomId("m");
                  }}
                  className="m-3 border border-Brown text-Brown font-semibold bg-white px-12 py-1 rounded-xl hover:bg-Brown hover:text-white transition-all"
                >
                  <span className="px-5">أضافة غرف</span>
                </button>
              </div>
              <div className={`${rooms ? "" : "hidden"} space-y-2`}>
                <div className="flex gap-4 max-md:flex-wrap flex-row-reverse ">
                  <div className="w-[50%] max-md:w-full">
                    <Imports
                      value={roomsName.number}
                      autoComplete="off"
                      title=":رقم الغرفة"
                      onChange={(e) =>
                        setRoomsName({ ...roomsName, number: e.target.value })
                      }
                    />
                  </div>
                  <div className="w-[50%] max-md:w-full">
                    <Imports
                      value={roomsName.floor_number}
                      autoComplete="off"
                      title=":رقم الطابق"
                      onChange={(e) =>
                        setRoomsName({
                          ...roomsName,
                          floor_number: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="w-[50%] max-md:w-full">
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
                  </div>
                  <Imports
                    value={roomsName.preview_url}
                    autoComplete="off"
                    title=":رابط"
                    onChange={(e) =>
                      setRoomsName({
                        ...roomsName,
                        preview_url: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="flex justify-end">
                  <div className="text-red-500">{error}</div>
                  <button
                    onClick={() => {
                      setRoomId("m");

                      setRooms(!rooms);
                    }}
                    className="m-3 border border-Brown text-Brown font-semibold bg-white px-12 py-1 rounded-xl hover:bg-Brown hover:text-white transition-all"
                  >
                    <span className="px-5">إلغاء</span>
                  </button>
                  <button
                    onClick={postRe}
                    className="m-3 border border-Brown text-Brown font-semibold bg-white px-12 py-1 rounded-xl hover:bg-Brown hover:text-white transition-all"
                  >
                    <span className="px-5">
                      {isNaN(roomId) ? "أضافة" : "تعديل"}{" "}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </Border>
    </>
  );
};
