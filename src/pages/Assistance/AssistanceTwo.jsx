import { useEffect, useState } from "react";
import {
  Border,
  Button,
  ButtonApp,
  Container,
  Error,
  Imports,
} from "../../components/index";
import axios from "axios";
import { baseUrl, imgUrl } from "../../Context/baseUrl";
import { useParams } from "react-router-dom";
import useFetch from "../../Context/useFetch";

const AssistanceTwo = () => {
  const { id } = useParams();
  const [imageUrls, setImageUrls] = useState([]);
  const [images, setImages] = useState([]);
  const [logo, setLogo] = useState([]);
  const [icon, setIcon] = useState();
  const [postData, setPostData] = useState();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
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
  const handleLogoChange = (event) => {
    const file = event.target.files[0];
    const logo = URL.createObjectURL(file);
    setLogo(logo);
    setIcon(file);
  };
  const { data } = useFetch(`admin/audiences/${id}`);
  let dataAll = data?.data.data;
  const postRe = (e) => {
    setLoading(true);
    setError("");
    e.preventDefault();
    let formdata = new FormData();
    formdata.append("name", postData);
    formdata.append(icon ? "icon" : "", icon);
    for (let i = 0; i < images.length; i++) {
      formdata.append("images[]", images[i]);
    }
    axios
      .post(
        `${baseUrl}${isNaN(id) ? "admin/audiences" : `admin/audiences/${id}`}`,
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
          setLoading(false);
          setError("");
        }
      })
      .catch((e) => {
        setError("خطأ في ادخال الحقول حاول مرة آخرى");
        setLoading(false);
      });
  };
  useEffect(() => {
    setPostData(dataAll?.name);
    setLogo(imgUrl+dataAll?.icon);
  }, [dataAll]);
  return (
    <>
      {loading ? <div className="loading"></div> : ""}

      <Container>
        <Border>
          <div className="space-y-10">
            <div className="w-[50%] mx-auto flex">
              <Imports
                value={postData}
                title=":اسم الحزب"
                onChange={(e) => setPostData(e.target.value)}
              />
            </div>
            <div className="flex justify-around flex-wrap max-lg:gap-5">
              {isNaN(id) ? (
                <div className="border-dashed border-[3px] border-Brown w-[400px] max-w-[400px] min-h-[220px] rounded-lg flex items-center flex-col justify-around">
                  <div className="flex items-center justify-center h-full min-h-[20vh] w-full">
                    <input
                      id="file-input"
                      type="file"
                      multiple
                      onChange={handleImageChange}
                      style={{ display: "none" }}
                    />
                    <button
                      className="w-full h-full block"
                      onClick={() =>
                        document.getElementById("file-input").click()
                      }
                    >
                      أضف صور الحزب
                    </button>
                  </div>
                  <div
                    className={`w-[90%] mb-5 mx-auto ${
                      imageUrls == 0 ? "hidden" : ""
                    }`}
                  >
                    <Border>
                      <div className="flex flex-wrap">
                        {imageUrls.map((imageUrl, i) => (
                          <>
                            <div
                              onClick={() => {
                                let total = [...imageUrls];
                                total.splice(i, 1);
                                setImageUrls(total);
                              }}
                              className="bg-red-600 text-white w-5 h-5 rounded-full -mr-4 z-10 flex cursor-pointer items-center justify-center "
                            >
                              X
                            </div>
                            <img
                              className="w-10 h-10  m-2"
                              key={imageUrl}
                              src={imageUrl}
                              alt=""
                            />
                          </>
                        ))}
                      </div>
                    </Border>
                  </div>
                </div>
              ) : (
                ""
              )}
              <div className="border-dashed border-[3px] border-Brown w-[400px] max-w-[400px] min-h-[220px] rounded-lg flex items-center  flex-col justify-around">
                <div className="flex items-center justify-center h-full min-h-[20vh] w-full">
                  <input
                    id="file-inputs"
                    type="file"
                    onChange={handleLogoChange}
                    style={{ display: "none" }}
                    accept="image/*"
                    multiple
                  />
                  <button
                    className="w-full h-full block"
                    onClick={() =>
                      document.getElementById("file-inputs").click()
                    }
                  >
                    أضف صورة شعار الحزب
                  </button>
                </div>
                <div
                  className={`w-[90%] mb-5 mx-auto ${
                    logo == 0 ? "hidden" : ""
                  }`}
                >
                  <Border>
                    <div className="flex flex-wrap">
                      {logo && (
                        <img className="w-10 h-10 mx-auto" src={logo} alt="" />
                      )}
                    </div>
                  </Border>
                </div>
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
        <br />
        {isNaN(id) ? "" : <UpdateImages />}
      </Container>
    </>
  );
};
export default AssistanceTwo;

const UpdateImages = () => {
  const { id } = useParams();
  const [imageUrls, setImageUrls] = useState([]);
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
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

  const postRe = (e) => {
    setLoading(true);
    setError("");
    e.preventDefault();
    let formdata = new FormData();
    for (let i = 0; i < images.length; i++) {
      formdata.append("images[]", images[i]);
    }
    axios
      .post(`${baseUrl}${`admin/audiences/${id}/images`}`, formdata, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((auth) => {
        if (auth) {
          window.history.go(-1);
          window.location.reload(false);
          setLoading(false);
          setError("");
        }
      })
      .catch((e) => {
        setError("خطأ في ادخال الحقول حاول مرة آخرى");
        setLoading(false);
      });
  };
  const {
    data: dataImg,
    loading: loadingImg,
    deleteIte,
    deleteItem: deleteItemImg,
    deleteError: deleteErrorImg,
  } = useFetch(`admin/audiences/${id}/images`, `admin/audiences/images`);
  return (
    <>
      {loading ? <div className="loading"></div> : ""}
      <Error error={deleteIte} onClick={deleteErrorImg} />
      <Border>
        <div className="space-y-10">
          <div className="flex justify-around flex-wrap max-lg:gap-5">
            <div className="border-dashed border-[3px] border-Brown w-[400px] max-w-[400px] min-h-[220px] rounded-lg flex items-center flex-col justify-around">
              <div className="flex items-center justify-center h-full min-h-[20vh] w-full">
                <input
                  id="file-input"
                  type="file"
                  multiple
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
                <button
                  className="w-full h-full block"
                  onClick={() => document.getElementById("file-input").click()}
                >
                  أضف صور الحزب
                </button>
              </div>
              <div
                className={`w-[90%] mb-5 mx-auto ${
                  imageUrls == 0 ? "hidden" : ""
                }`}
              >
                <Border>
                  <div className="flex flex-wrap">
                    {imageUrls.map((imageUrl, i) => (
                      <>
                        <div
                          onClick={() => {
                            let total = [...imageUrls];
                            total.splice(i, 1);
                            setImageUrls(total);
                          }}
                          className="bg-red-600 text-white w-5 h-5 rounded-full -mr-4 z-10 flex cursor-pointer items-center justify-center "
                        >
                          X
                        </div>
                        <img
                          className="w-10 h-10  m-2"
                          key={imageUrl}
                          src={imageUrl}
                          alt=""
                        />
                      </>
                    ))}
                  </div>
                </Border>
              </div>
            </div>
          </div>
          <div className=" flex justify-center flex-wrap ">
            {loadingImg ? (
              <div className="loading"></div>
            ) : (
              dataImg?.data.data.map((e) => (
                <div>
                  <div
                    onClick={() => deleteItemImg(e)}
                    className="bg-red-600 text-white w-5 h-5 rounded-full -mb-4 relative -mr-4 z-10 flex cursor-pointer items-center justify-center "
                  >
                    X
                  </div>
                  <img
                    src={`${imgUrl}${e.image}`}
                    alt=""
                    className="mx-1 rounded-lg w-[150px] h-[100px]"
                  />
                </div>
              ))
            )}
          </div>
          <div className="text-red-500">{error}</div>
          <ButtonApp onClick={postRe}>
            <span className="px-5">تعديل</span>
          </ButtonApp>
        </div>
      </Border>
    </>
  );
};
