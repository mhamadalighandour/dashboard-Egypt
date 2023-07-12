import { useEffect, useState } from "react";
import {
  Border,
  Button,
  ButtonApp,
  Container,
  Imports,
} from "../../components/index";
import usePost from "../../Context/usePost";
import { useParams } from "react-router-dom";
import useFetch from "../../Context/useFetch";

const ProvincesAdd = () => {
  const { id } = useParams();
  const { data } = useFetch(`admin/provinces/${id}`);
  let dataAll = data?.data?.data?.name ;
  const [postData, setPostData] = useState("");
  const { postRe, error ,loading } = usePost("admin/provinces", {
    name: postData,
  },true);
  const { postRe: update, error: updateError ,loading:loading2} = usePost(
    `admin/provinces/${id}`,
    {
      name: postData,
    },true 
  );
  
  useEffect(()=>{setPostData(dataAll)},[dataAll])
  return (
    <Container>
      {loading ? <div className="loading"></div> : ""}
      {loading2 ? <div className="loading"></div> : ""}
      <Border>
        <div className="space-y-5">
          <div className="w-1/2 max-sm:w-full mx-auto">
            <Imports
              value={postData}
              title=":اضف محافظة"
              onChange={(e) => setPostData(e.target.value)}
            />
          </div>
          <div className="text-red-500">
            {error}
            {updateError}
          </div>
          {isNaN(id) ? (
            <Button click={postRe} />
          ) : (
            <ButtonApp onClick={update}>
              <span className="px-10">تعديل</span>
            </ButtonApp>
          )}
        </div>
      </Border>
    </Container>
  );
};

export default ProvincesAdd;
