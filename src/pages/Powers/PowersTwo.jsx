import { useEffect, useState } from "react";
import {
  Border,
  ButtonApp,
  Container,
  Imports,
} from "../../components/index";
import usePost from "../../Context/usePost";
import { useParams } from "react-router-dom";
import useFetch from "../../Context/useFetch";
const PowersTwo = () => {

  const { id  } = useParams();
  const [postData, setPostData] = useState("");
  const { postRe, error ,loading} = usePost(`admin/roles/${id}`, {
    ar_name: postData,
  },true);
  
  const { data} = useFetch(`admin/roles/${id}`);

  useEffect(()=>{setPostData(data?.data.data.ar_name)},[data])
  return (
    <>
    {loading ? <div className="loading"></div> : ""}
      <Container>
        <Border>
          <div className="space-y-5">
            <div className="flex gap-4 max-md:flex-wrap flex-row-reverse w-1/2 mx-auto ">
              <Imports
              value={postData}
                title=":تعديل اسم الصلاحية" 
                onChange={(e) => setPostData(e.target.value)}
              />
            </div>
            <div className="text-red-500">{error}</div>
            <ButtonApp onClick={postRe}>
              <span className="px-10">تعديل</span>
            </ButtonApp>
          </div>
        </Border>
      </Container>
    </>
  );
};

export default PowersTwo;
