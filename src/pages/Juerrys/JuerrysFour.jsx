import { useParams } from "react-router-dom";
import { Border, ButtonApp, Container, Imports } from "../../components/index";
import usePost from "../../Context/usePost";
import { useEffect, useState } from "react";
import useFetch from "../../Context/useFetch";

const JuerrysFour = () => {
  const { id } = useParams();
  const { data } = useFetch(`admin/competent-committees/${id}`);
  let dataAll = data?.data.data;
  const [postData, setPostData] = useState({
    name: "",
    purview: "",
  });
  const { postRe, error ,loading} = usePost(
    `${
      isNaN(id)
        ? "admin/competent-committees"
        : `admin/competent-committees/${id}`
    }`,
    {
      ...postData,
    },true
  );
  useEffect(() => {
    setPostData({
      name: dataAll?.name,
      purview: dataAll?.purview,
    });
  }, [dataAll]);
  return (
    <Container>
      {loading ? <div className="loading"></div> : ""}
      <Border>
        <div className=" py-4">
          <div className="flex max-sm:flex-col py-5">
            <Imports
              value={postData.purview}
              title=" : اختصاص اللجنة"
              onChange={(e) =>
                setPostData({ ...postData, purview: e.target.value })
              }
            />
            <Imports
              value={postData.name}
              title=" : اسم اللجنة"
              onChange={(e) =>
                setPostData({ ...postData, name: e.target.value })
              }
            />
          </div>
          <div className="text-red-500">{error}</div>
          {isNaN(id) ? (
            <ButtonApp onClick={postRe}>
              <span className="px-5">انشاء</span>
            </ButtonApp>
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

export default JuerrysFour;
