import { useState } from "react";
import {
  Add,
  BodyCard,
  Border,
  CardAll,
  Container,
  Error,
} from "../../components/index";
import { useParams } from "react-router-dom";
import useFetch from "../../Context/useFetch";

const Juerrys = () => {
  const [active, setActive] = useState(localStorage.getItem("active"));
  const { id } = useParams();
  localStorage.setItem("active", active);
  const { data, loading, error, deleteError } = useFetch(
    `admin/competent-committees/${id}`
  );
  const { deleteItem: delete1 } = useFetch(
    `admin/competent-committees/${id}/tasks`
  );
  const { deleteItem: delete2 } = useFetch(
    `admin/competent-committees/${id}/members`
  );
  let dataAll = data?.data.data;

  return (
    <>
      <Error error={error} onClick={deleteError} />
      
      <Container>
        <div className="flex justify-center">
          <Border>
            {loading ? (
              <div className="loading"></div>
            ) : (
              <>
                <BodyCard value={dataAll?.name} name=":اسم اللجنة" />
                <BodyCard value={dataAll?.purview} name=":اختصاصها" />
              </>
            )}
          </Border>
        </div>
        <div className="flex justify-around flex-wrap">
          <div className="max-w-[350px] w-[350px] ">
            <button
              onClick={() => setActive("nav1")}
              className={`${
                active === "nav1" ? "bg-Brown text-white" : ""
              } my-3 border text-end border-Brown text-Brown font-semibold  w-[100%] p-2 py-4 rounded-xl hover:bg-Brown hover:text-white transition-all`}
            >
              مهام اللجنة
            </button>
            <div
              className={`${active === "nav1" ? "block" : "hidden"} space-y-3 `}
            >{dataAll?.tasks == 0 ? <h1 className="text-center text-2xl">لايوجد بيانات</h1>:""}
              {loading ? (
                <div className="loading"></div>
              ) : (
                dataAll.tasks?.map((e, i) => (
                  <CardAll
                    update={`/juerrys/${id}/${e.id}`}
                    delete={() => delete1(e)}
                    key={i}
                  >
                    {e.name}
                  </CardAll>
                ))
              )}
            </div>
          </div>
          <div className="max-w-[350px] w-[350px]">
            <button
              onClick={() => setActive("nav2")}
              className={`${
                active === "nav2" ? "bg-Brown text-white" : ""
              } my-3 border text-end border-Brown text-Brown font-semibold  w-[100%] p-2 py-4 rounded-xl hover:bg-Brown hover:text-white transition-all`}
            >
              أعضاء اللجنة
            </button>
            <div
              className={`${active === "nav2" ? "block" : "hidden"} space-y-3 `}
            >{dataAll?.members == 0 ? <h1 className="text-center text-2xl">لايوجد بيانات</h1>:""}
              {loading ? (
                <div className="loading"></div>
              ) : (
                dataAll.members?.map((e, i) => (
                  <CardAll
                    update={`/juerrys/${id}/${e.id}`}
                    delete={() => delete2(e)}
                    key={i}
                  >
                    {e.name}
                  </CardAll>
                ))
              )}
            </div>
          </div>
        </div>
        <Add link={`/juerrys/${id}/create-juerrys`} />
      </Container>
    </>
  );
};

export default Juerrys;
