import { useEffect, useState } from "react";
import {
  Border,
  Button,
  ButtonApp,
  Container,
  Imports,
} from "../../components/index";
import usePost from "../../Context/usePost";
import {  useParams } from "react-router-dom";
import useFetch from "../../Context/useFetch";

const ProgramsAddDate = () => {
  const { id } = useParams();
  const { data } = useFetch(`admin/forum-program-days/${id}`);
  let dataAll = data?.data.data;
  const [postData, setPostData] = useState({
    date: "",
    day: "",
  });
  const { postRe, error ,loading } = usePost("admin/forum-program-days", {
    ...postData,
  },true);

  const { postRe: update, error: updateError ,loading :loading2} = usePost(
    `admin/forum-program-days/${id}`,
    {
      ...postData,
    },true
  );
  useEffect(() => {
    setPostData({
      date: dataAll?.date,
      day: dataAll?.day,
    })
  }, [dataAll]);
  return (
    <Container>
      {loading ? <div className="loading"></div> : ""}
      {loading2 ? <div className="loading"></div> : ""}
      <Border>
        <div className="space-y-10">
          <div className="flex gap-4 max-md:flex-wrap flex-row-reverse ">
            <Imports
              value={postData.day}
              onChange={(e) =>
                setPostData({ ...postData, day: e.target.value })
              }
              title=" : اليوم"
            />
            <Imports
            type="date"
              value={postData.date}
              onChange={(e) =>
                setPostData({ ...postData, date: e.target.value })
              }
              title=" : التاريخ"
            />
          </div>
          <div className="text-red-500">
            {error}
            {updateError}
          </div>
          {isNaN(id) ? (
            <Button click={postRe} />
          ) : (
            <div className="space-x-2">
              <ButtonApp onClick={update}>
                <span className="px-10">تعديل</span>
              </ButtonApp>
            </div>
          )}
        </div>
      </Border>
    </Container>
  );
};

export default ProgramsAddDate;
