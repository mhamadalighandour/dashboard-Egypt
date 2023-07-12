import React from "react";
import { Add, CardAll, Container, Error } from "../../components/index";
import useFetch from "../../Context/useFetch";
import ReactPaginate from "react-paginate";
import { imgUrl } from "../../Context/baseUrl";

function Meeting() {
  const { data, loading, error, deleteItem, deleteError, handlePageClick } =
    useFetch(`admin/forum-videos`);
  let pageCount = Math.ceil(data?.data.data.total / data?.data.data.per_page);
  let dataAll = data?.data.data.data;

  const deleteItemThis = (e) => {
    dataAll?.filter((p) => p.id !== e.id); //
    deleteItem(e);
  };
  return (
    <>
      <Error error={error} onClick={deleteError} />
      <Container>
        <div className="flex justify-center max-md:flex-col gap-3 flex-wrap">
          {loading ? (
            <div className="loading"></div>
          ) : (
            dataAll?.map((e) => (
              <div className="max-md:w-full w-[450px] ">
                <CardAll
                  update={`/meeting/${e.id}`}
                  key={e.id}
                  delete={() => deleteItemThis(e)}
                >
                  <div className="text-end space-y-2">
                    <div>
                      <span className="text-Brown font-semibold">{e.name}</span>
                    </div>
                    <div className=" font-semibold">{e.description}</div>
                    <div className="flex items-center h-[230px]">
                      <video
                        className="rounded-2xl container mx-auto w-full h-full "
                        controls
                      >
                        <source src={`${imgUrl}${e.video}`} />
                      </video>
                    </div>
                  </div>
                </CardAll>
              </div>
            ))
          )}
        </div>
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
        <Add link="/meeting/create-meeting" />
      </Container>
    </>
  );
}

export default Meeting;
