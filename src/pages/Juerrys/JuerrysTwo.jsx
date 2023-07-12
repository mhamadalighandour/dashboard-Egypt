import React, { useEffect, useState } from "react";
import { Button, ButtonApp, Container, Imports } from "../../components/index";
import { useParams } from "react-router-dom";
import usePost from "../../Context/usePost";
import useFetch from "../../Context/useFetch";
const JuerrysTwo = () => {
  const [active, setActive] = useState(localStorage.getItem("active"));
  const { id, idU } = useParams();
  const { data: dataMembers } = useFetch(`admin/competent-committees/${id}/members/${idU}`);
  const { data:dataTasks } = useFetch(`admin/competent-committees/${id}/tasks/${idU}`);
  const [postData, setPostData] = useState({
    name: "",
  });
  localStorage.setItem("active",active)
  const { postRe, error , loading } = usePost(
    `${
      isNaN(idU)
        ? `admin/competent-committees/${id}/members`
        : `admin/competent-committees/${id}/members/${idU}`
    }`,
    {
      ...postData,
    },true
  );

  const { postRe: postRe2, error: error2 ,loading : loading2 } = usePost(
    `${
      isNaN(idU)
        ? `admin/competent-committees/${id}/tasks`
        : `admin/competent-committees/${id}/tasks/${idU}`
    }`,
    {
      ...postData,
    },true
  );
  useEffect(() => {
    setPostData({
      name: dataTasks?.data.data.name || dataMembers?.data.data.name
    });
  }, [dataTasks,dataMembers]);
  return (
    <Container>
      
      {loading2 ? <div className="loading"></div> : ""}
      {loading ? <div className="loading"></div> : ""}
      <div className="flex justify-around flex-wrap">
        <div className="max-w-[350px] w-[350px]">
          <button
            onClick={() => setActive("nav1")}
            className={`${
              active === "nav1" ? "bg-Brown text-white" : ""
            } my-3 border text-end border-Brown text-Brown font-semibold  w-[100%] p-2 py-4 rounded-xl hover:bg-Brown hover:text-white transition-all`}
          >
            {isNaN(idU) ? " أضافة مهام اللجنة":"تعديل مهام اللجنة"}
            
          </button>
          <div
            className={`${active === "nav1" ? "block" : "hidden"} space-y-6`}
          >
            <Imports
            value={postData.name}
              title={`${isNaN(idU) ?":أضف المهام": ":تعديل المهام" }`}
              onChange={(e) => setPostData({ name: e.target.value })}
            />
            <div>
              {error2}
              {/* {"updateError"} */}
            </div>
            <div>{error2}</div>
            {isNaN(idU) ? (
              <Button click={postRe2} />
            ) : (
              <ButtonApp onClick={postRe2}>
                <span className="px-10">تعديل</span>
              </ButtonApp>
            )}
          </div>
        </div>
        <div className="max-w-[350px] w-[350px]">
          <button
            onClick={() =>  setActive("nav2")}
            className={`${
              active === "nav2" ? "bg-Brown text-white" : ""
            } m-3 border text-end border-Brown text-Brown font-semibold  w-[100%] p-2 py-4 rounded-xl hover:bg-Brown hover:text-white transition-all`}
          >
            {isNaN(idU) ? " أضافة أعضاء اللجنة":"تعديل أعضاء اللجنة"}
          </button>
          <div
            className={`${active === "nav2" ? "block" : "hidden"} space-y-6`}
          >
            <Imports
            value={postData.name}
              title=":الاسم"
              onChange={(e) => setPostData({ name: e.target.value })}
            />
            <div className="text-red-500">{error}</div>
            {isNaN(idU) ? (
              <Button click={postRe} />
            ) : (
              <ButtonApp onClick={postRe}>
                <span className="px-10">تعديل</span>
              </ButtonApp>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default JuerrysTwo;
