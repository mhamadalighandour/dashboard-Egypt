import { useEffect, useState } from "react";
import {
  Border,
  Button,
  ButtonApp,
  Container,
  Imports,
} from "../../components/index";
import {  useParams } from "react-router-dom";
import usePost from "../../Context/usePost";
import useFetch from "../../Context/useFetch";

const ProgramsTwo = () => {
  const { id, idU } = useParams();
  const { data: dataPost } = useFetch(
    `admin/forum-program-days/lectures/${idU}`
  );
  let dataAll = dataPost?.data.data;
  const [postData, setPostData] = useState({
    start_time: "",
    end_time: " ",
    lecturer: "",
    content: "",
    competent_committee_id: "",
  });
  const {
    postRe,
    error,
    loading: loading2,
  } = usePost(
    `admin/forum-program-days/${id}/lectures`,
    {
      start_time: `${postData.start_time}:00`,
      end_time: `${postData.end_time}:00`,
      lecturer: postData.lecturer,
      content: postData.content,
      competent_committee_id: postData.competent_committee_id,
    },
    true
  );
  const {
    postRe: update,
    error: updateError,
    loading,
  } = usePost(
    `admin/forum-program-days/lectures/${idU}`,
    {
      start_time: `${postData.start_time}`,
      end_time: `${postData.end_time}`,
      lecturer: postData.lecturer,
      content: postData.content,
      competent_committee_id: postData.competent_committee_id,
    },
    true
  );
  
  const { data } = useFetch("admin/competent-committees?paginate=none");
  useEffect(() => {
    setPostData({
      start_time: dataAll?.from,
      end_time: dataAll?.to,
      lecturer: dataAll?.lecturer,
      content: dataAll?.content,
      competent_committee_id: dataAll?.competent_committee_id,
    });
  }, [dataAll]);
  return (
    <Container>
      {loading ? <div className="loading"></div> : ""}
      {loading2 ? <div className="loading"></div> : ""}
      <Border>
        <div className="space-y-6">
          <div className="flex gap-4 max-md:flex-wrap flex-row-reverse">
            <Imports
              type="time"
              value={postData.start_time}
              placeholder="00:00:00"
              onChange={(e) =>
                setPostData({ ...postData, start_time: e.target.value })
              }
              title=":من الساعة"
            />
            <Imports
              type="time"
              value={postData.end_time}
              placeholder="00:00:00"
              onChange={(e) =>
                setPostData({ ...postData, end_time: e.target.value })
              }
              title=":الى الساعة"
            />
          </div>
          <div className="flex gap-4 max-md:flex-wrap flex-row-reverse">
            <Imports
              value={postData.content}
              onChange={(e) =>
                setPostData({ ...postData, content: e.target.value })
              }
              title=":المحتوى"
            />
            <Imports
              value={postData.lecturer}
              onChange={(e) =>
                setPostData({ ...postData, lecturer: e.target.value })
              }
              title=":المحاضر"
            />
            <pre className="flex items-center border-b font-semibold text-Brown border-Brown -ml-4 justify-end  max-md:p-0">
              اللجنة المختصة
            </pre>
            <select
              className="outline-none border-b border-Brown"
              id=""
              value={postData.competent_committee_id}
              onChange={(e) =>
                setPostData({
                  ...postData,
                  competent_committee_id: e.target.value,
                })
              }
            >
              <option></option>
              {data?.data.data.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            {error}
            {updateError}
          </div>
          {isNaN(idU) ? (
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

export default ProgramsTwo;
