import React, { useState } from "react";
import {
  Add,
  BodyCard,
  CardAll,
  Container,
  Error,
} from "../../components/index";
import useFetch from "../../Context/useFetch";
import ReactPaginate from "react-paginate";
import { imgUrl } from "../../Context/baseUrl";

const Assistance = () => {
  const [active, setActive] = useState("");
  const { data, loading, error, handlePageClick, deleteItem, deleteError } =
    useFetch(`admin/audiences`);
  let pageCount = Math.ceil(data?.data.data.total / data?.data.data.per_page);
  let dataAll = data?.data.data.data;

  const {
    data: dataImg,
    loading: loadingImg,
    deleteIte,
    deleteError: deleteErrorImg,
  } = useFetch(`admin/audiences/${active}/images`, `admin/audiences/images`);

  return (
    <Container>
      <Error error={error} onClick={deleteError} />
      <Error error={deleteIte} onClick={deleteErrorImg} />
      {dataAll == 0 ? <h1 className="text-center text-2xl">لايوجد بيانات</h1>:""}
      {loading ? (
        <div className="loading"></div>
      ) : (
        dataAll?.map((e) => (
          <div className="m-2">
            <CardAll
              update={`/assistance/${e.id}`}
              delete={() => deleteItem(e)}
              key={e.id}
            >
              <div className="flex items-center justify-around max-sm:flex-row-reverse flex-wrap space-x-3">
                <div className="max-sm:order-3">
                  <button
                    onClick={() => setActive(e.id)}
                    className=" mx-2 border border-Brown text-Brown font-semibold bg-white p-3  rounded-xl hover:bg-Brown hover:text-white transition-all"
                  >
                    <span className="px-5">الصور</span>
                  </button>
                </div>
                <div className="max-sm:order-2">
                  <BodyCard value={e.name} name=" : اسم الحزب" />
                </div>
                <div className="max-sm:order-1">
                  <img
                    src={`${imgUrl}${e.icon}`}
                    alt=""
                    className="my-3 w-[120px] h-[100px]"
                  />
                </div>
              </div>
              <div
                className={` flex justify-center flex-wrap ${
                  active === e.id ? "flex" : "hidden"
                } `}
              >
                {loadingImg ? (
                  <div className="loading"></div>
                ) : (
                  dataImg?.data.data.map((e) => (
                    <div>
                      <img
                        src={`${imgUrl}${e.image}`}
                        alt=""
                        className="mx-1 rounded-lg w-[150px] h-[100px]"
                      />
                    </div>
                  ))
                )}
              </div>
            </CardAll>
          </div>
        ))
      )}
      <div className="flex justify-center my-3">
        <ReactPaginate
          className="pagination flex"
          previousLabel=""
          nextLabel=""
          breakLabel="..."
          pageCount={pageCount}
          marginPagesDisplayed={1}
          pageRangeDisplayed={2}
          onPageChange={handlePageClick}
          pageClassName="page-item"
          pageLinkClassName="page-link"
        />
      </div>
      <Add link="/assistance/create-assistance" />
    </Container>
  );
};

export default Assistance;
