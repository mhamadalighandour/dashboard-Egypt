import { useEffect, useState } from "react";
import {
  BodyCard,
  Border,
  Button,
  ButtonApp,
  Container,
  Imports,
} from "../../components/index";
import axios from "axios";
import { baseUrl, imgUrl } from "../../Context/baseUrl";
import { useParams } from "react-router-dom";
import useFetch from "../../Context/useFetch";

const EducationalTwo = () => {
  const [selectedFile, setSelectedFile] = useState();

  const { id } = useParams();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [postData, setPostData] = useState({
    name: "",
    lecturer: "",
  });
  const { data } = useFetch(`admin/educational-subjects/${id}`);
  let dataAll = data?.data.data;
  const postRe = (e) => {
    setLoading(true);
    setError("");
    e.preventDefault();
    let formdata = new FormData();
    formdata.append("name", postData.name);
    formdata.append("lecturer", postData.lecturer);
    formdata.append(`${selectedFile ? "pdf_file" : ""}`, selectedFile);

    axios
      .post(
        `${baseUrl}${
          isNaN(id)
            ? "admin/educational-subjects"
            : `admin/educational-subjects/${id}`
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
      lecturer: dataAll?.lecturer,
    });
  }, [dataAll]);

  return (
    <Container>
      {loading ? <div className="loading"></div> : ""}
      <Border>
        <div className="space-y-6 ">
          <div className="flex gap-4 max-md:flex-wrap flex-row-reverse">
            <Imports
              value={postData.name}
              title=" :اسم الندوة"
              onChange={(e) =>
                setPostData({ ...postData, name: e.target.value })
              }
            />
            <Imports
              value={postData.lecturer}
              title=":اسم المحاضر"
              onChange={(e) =>
                setPostData({ ...postData, lecturer: e.target.value })
              }
            />
          </div>
          <div className="inline-flex w-[70%] max-md:w-[100%]  max-md:flex-wrap flex-row-reverse">
            <button
              className="block w-[30%] border-Brown border rounded-3xl mx-2"
              onClick={() => document.querySelector(".pdf").click()}
            >
              اختر ملف
            </button>
            <Imports
              value={`${
                selectedFile ? selectedFile.name + ": PDF اسم الملف" : ""
              } `}
            />
            <input
              type="file"
              className="hidden pdf"
              accept="application/pdf"
              onChange={(e) => setSelectedFile(e.target.files[0])}
            />
          </div>
          {isNaN(id) ? (
            ""
          ) : (
            <a
              href={`${imgUrl}${dataAll?.pdf_file}`}
              target="_blank"
              className="  px-5 py-2 border-Brown border rounded-3xl mx-2"
            >
              عرض الملف
            </a>
          )}
          <div className="text-red-500">{error}</div>
          <div>
            {isNaN(id) ? (
              <Button click={postRe} />
            ) : (
              <ButtonApp onClick={postRe}>
                <span className="px-5">تعديل</span>
              </ButtonApp>
            )}
          </div>
        </div>
      </Border>
    </Container>
  );
};

export default EducationalTwo;
