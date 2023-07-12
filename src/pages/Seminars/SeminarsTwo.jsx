import { Link, useParams } from "react-router-dom";
import {
  Border,
  Button,
  ButtonApp,
  Container,
  Imports,
} from "../../components/index";
import usePost from "../../Context/usePost";
import { useEffect, useState } from "react";
import useFetch from "../../Context/useFetch";
const SeminarsTwo = () => {
  const { id } = useParams();
  const { data } = useFetch(`admin/seminars/${id}`);
  let dataAll = data?.data.data;
  const [postData, setPostData] = useState({
    Job_site: "",
    lecturer: "",
    title: "",
    time: "",
    date: "",
  });
  const { postRe, error ,loading} = usePost(
    isNaN(id) ? "admin/seminars" : `admin/seminars/${id}`,
    {
      Job_site: postData.Job_site,
      lecturer: postData.lecturer,
      title: postData.title,
      time: postData.date + " " + postData.time ,
    },
    true
  );
  useEffect(() => {
    setPostData({
      Job_site: dataAll?.Job_site,
      lecturer: dataAll?.lecturer,
      title: dataAll?.title,
      date: dataAll?.date,
      time: dataAll?.time,
    });
  }, [dataAll]);

  return (
    <Container>
      {loading ? <div className="loading"></div> : ""}
      <Border>
        <div className="space-y-6">
          <div className="flex gap-4 max-md:flex-wrap flex-row-reverse lg:gap-15">
            <Imports
              value={postData.title}
              title="  :عنوان الندوة "
              onChange={(e) =>
                setPostData({ ...postData, title: e.target.value })
              }
            />
            <Imports
              value={postData.lecturer}
              title=" : محاضر الندوة"
              onChange={(e) =>
                setPostData({ ...postData, lecturer: e.target.value })
              }
            />
          </div>
          <div className="flex gap-4 max-md:flex-wrap flex-row-reverse">
            <Imports
              value={postData.Job_site}
              title=": الموقع الوظيفي للمحاضر"
              onChange={(e) =>
                setPostData({ ...postData, Job_site: e.target.value })
              }
            />
            <Imports
              value={postData.time}
              type="time"
              title=": وقت الندوة"
              onChange={(e) =>
                setPostData({ ...postData, time: e.target.value })
              }
            />
            <Imports
              value={postData.date}
              type="date"
              title=": تاريخ الندوة"
              onChange={(e) =>
                setPostData({ ...postData, date: e.target.value })
              }
            />
          </div>

          <div>{error}</div>
          {isNaN(id) ? (
            <Button click={postRe} />
          ) : (
            <div className="space-x-2">
              <ButtonApp onClick={postRe}>
                <span className="px-10">تعديل</span>
              </ButtonApp>
            </div>
          )}
        </div>
      </Border>
    </Container>
  );
};

export default SeminarsTwo;
