import React, { useEffect, useState } from "react";
import { Border, Button, ButtonApp, Container, Imports } from "../../components/index";
import { useParams } from "react-router-dom";
import usePost from "../../Context/usePost";
import useFetch from "../../Context/useFetch";

const MembershipsTwo = () => {
  const { id } = useParams();
  const [postData, setPostData] = useState("")
  const { postRe, error ,loading} = usePost(`${isNaN(id)?"admin/memberships":`admin/memberships/${id}`}`, {
    name: postData,
  },true);
  const { data } = useFetch(`admin/memberships/${id}`);
  let dataAll = data?.data.data;
  useEffect(() => {
    setPostData(dataAll?.name);
  }, [dataAll]);
  return (
    <>
    {loading ? <div className="loading"></div> : ""}
      <Container>
        <Border>
          <div className="space-y-10 ">
            <div className="w-[80%] max-sm:w-full max-sm:mx-auto max-sm:px-0 ml-auto px-10">
              <Imports value={postData} onChange={(e)=>setPostData(e.target.value)} title=" : اضف اسم العضوية الجديدة" />
            </div>
            <div className="text-red-500">{error}</div>
            {isNaN(id) ? (
              <Button click={postRe}  />
            ) : (
              <ButtonApp onClick={postRe}>
                <span className="px-10">تعديل</span>
              </ButtonApp>
            )}
          </div>
        </Border>
      </Container>
    </>
  );
};

export default MembershipsTwo;
