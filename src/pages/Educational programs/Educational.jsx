import ReactPaginate from "react-paginate";
import useFetch from "../../Context/useFetch";
import {
  Add,
  BodyCard,
  CardAll,
  Container,
  Error,
} from "../../components/index";
import { imgUrl } from "../../Context/baseUrl";

function Educational() {
  const { data, loading, error, deleteItem, deleteError, handlePageClick } =
    useFetch(`admin/educational-subjects`);
  let pageCount = Math.ceil(data?.data.data.total / data?.data.data.per_page);
  let dataAll = data?.data.data.data;
  const deleteItemThis = (e) => {
    dataAll = dataAll?.filter((p) => p.id !== e.id); //
    deleteItem(e);
  };
  return (
    <>
      <Error error={error} onClick={deleteError} />
      <Container>
        <div className="flex  justify-center flex-wrap gap-3 ">
          {loading ? (
            <div className="loading"></div>
          ) : (
            dataAll?.map((e) => (
              <CardAll
                key={e.id}
                update={`/educational/${e.id}`}
                delete={() => deleteItemThis(e)}
              >
                <div className="text-end space-y-2">
                  <BodyCard value={e.name} name=":اسم الندوة" />
                  <BodyCard value={e.lecturer} name=":اسم المحاضر" />
                  <a href={`${imgUrl}${e.pdf_file}`} target="_blank">
                    <BodyCard value="عرض الملف" name=":اسم الملف" />
                  </a>
                </div>
              </CardAll>
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
        <Add link="/educational/create-educational" />
      </Container>
    </>
  );
}

export default Educational;
