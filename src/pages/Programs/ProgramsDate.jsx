import {
  Add,
  BodyCard,
  CardAll,
  Container,
  Error,
} from "../../components/index";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import useFetch from "../../Context/useFetch";

const ProgramsDate = () => {
  const { data, loading, error, handlePageClick, deleteItem, deleteError } =
    useFetch("admin/forum-program-days");

  let pageCount = Math.ceil(data?.data.data.total / data?.data.data.per_page);
  let dataAll = data?.data.data.data;

  const deleteItemThis = (e) => {
    dataAll = dataAll?.filter((p) => p.id !== e.id); //p.id !== e.id
    deleteItem(e);
    return dataAll;
  };

  return (
    <>
      <Error error={error} onClick={deleteError} />
      <Container>
        <div className="flex justify-center flex-wrap gap-2 text-end ">
          {loading ? (
            <div className="loading"></div>
          ) : (
            dataAll?.map((e) => (
              <CardAll
                key={e.id}
                update={`/programs/${e.id}`}
                delete={() => deleteItemThis(e)}
              >
                <Link to={`/programs-Date/${e.id}`}>
                  <BodyCard value={e.day} name=":اليوم" />
                  <BodyCard value={e.date} name=":التاريخ" />
                </Link>
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
        <Add link="/programs/create-programDate" />
      </Container>
    </>
  );
};

export default ProgramsDate;
