import { useParams } from "react-router-dom";
import { baseUrl, imgUrl } from "../../Context/baseUrl";
import { Border, Button, ButtonApp, Imports } from "../../components";
import { Container } from "../../components/index";
import { useEffect, useState } from "react";
import axios from "axios";
import useFetch from "../../Context/useFetch";

const MeetingTwo = () => {
  const [videoUrl, setVideoUrl] = useState();
  const [video, setVideo] = useState();
  const { id } = useParams();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [postData, setPostData] = useState({
    name: "",
    description: "",
  });
  const { data } = useFetch(`admin/forum-videos/${id}`);
  let dataAll = data?.data.data;
  const handleVideoChange = (event) => {
    const file = event.target.files[0];
    const videoUrl = URL.createObjectURL(file);
    setVideoUrl(videoUrl);
    setVideo(file);
  };
  const postRe = (e) => {
    setLoading(true);
    setError("")
    e.preventDefault();
    let formdata = new FormData();
    formdata.append("name", postData.name);
    formdata.append("description", postData.description);
    formdata.append(video ? "video" : "", video);
    axios
      .post(
        `${baseUrl}${
          isNaN(id) ? "admin/forum-videos" : `admin/forum-videos/${id}`
        }`,
        formdata,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
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
  useEffect(() => {
    setPostData({
      name: dataAll?.name,
      description: dataAll?.description,
    });
  }, [dataAll]);
  return (
    <Container>
      {loading ? <div className="loading"></div> : ""}
      <Border>
        <div className="space-y-10 ">
          <div className="flex gap-4 max-md:flex-wrap flex-row-reverse lg:gap-15">
            <Imports
              value={postData.name}
              title=" : اسم الفيديو"
              onChange={(e) =>
                setPostData({ ...postData, name: e.target.value })
              }
            />
            <Imports
              value={postData.description}
              title=" : شرح الفيديو"
              onChange={(e) =>
                setPostData({ ...postData, description: e.target.value })
              }
            />
          </div>
          <div className=" min-h-[150px] border-2 font-semibold border-dashed border-slate-400 text-Brown w-[75%] mx-auto rounded-lg ">
            <div
              className={`${
                videoUrl
                  ? "hidden "
                  : "flex items-center justify-center h-[30vh]"
              }`}
            >
              <input
                id="file-input"
                type="file"
                onChange={handleVideoChange}
                accept="video/mp4,video/x-m4v,video/*"
                style={{ display: "none" }}
              />
              <button
                onClick={() => document.getElementById("file-input").click()}
                className="block w-full h-full"
              >
                <div className="flex items-center justify-center mx-auto text-lg hover:text-orange-800">
                  أضف فيديو
                </div>
              </button>
            </div>

            {videoUrl && (
              <div className="relative">
                <div
                  onClick={() => {
                    setVideo();
                    setVideoUrl();
                  }}
                  className="bg-red-600 text-white w-5 h-5 rounded-full absolute -top-2 -left-1 z-10 flex cursor-pointer items-center justify-center "
                >
                  X
                </div>
                <video controls className="w-full h-[400px] rounded-lg">
                  <source src={videoUrl} type="video/mp4" />
                </video>
              </div>
            )}
            <div className="flex items-center">
              <video
                className={`${!videoUrl ? "":"hidden"} rounded-2xl container w-full h-[350px]`}
                controls
              >
                <source src={`${imgUrl}${dataAll?.video}`} />
              </video>
            </div>
          </div>
          <div className="text-red-500">{error}</div>
          {isNaN(id) ? (
            <Button click={postRe} />
          ) : (
            <ButtonApp onClick={postRe}>
              <span className="px-5">تعديل</span>
            </ButtonApp>
          )}
        </div>
      </Border>
    </Container>
  );
};

export default MeetingTwo;
