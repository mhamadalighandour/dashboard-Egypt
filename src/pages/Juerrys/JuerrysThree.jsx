import { Link } from "react-router-dom";
import {
  Add,
  BodyCard,
  CardAll,
  Container,
  Error,
} from "../../components/index";
import useFetch from "../../Context/useFetch";
import ReactPaginate from "react-paginate";

const JuerrysThree = () => {
  const { data, loading, error, handlePageClick, deleteItem, deleteError } =
    useFetch(`admin/competent-committees`);
  let pageCount = Math.ceil(data?.data.data.total / data?.data.data.per_page);
  let dataAll = data?.data.data.data;
  return (
    <>
      <Error error={error} onClick={deleteError} />
      <Container>
        <div className="flex justify-center flex-wrap  gap-4">
          {loading ? (
            <div className="loading"></div>
          ) : (
            dataAll?.map((e) => (
              <CardAll
                key={e.id}
                delete={() => deleteItem(e)}
                update={`/juerrys/item/${e.id}`}
              >
                <Link key={e.id} to={`/juerrys/${e.id}`}>
                  <BodyCard value={e.name} name=":اسم اللجنة" />
                  <BodyCard value={e.purview} name=":اختصاصها" />
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
        <Add link="/juerrys/item/Create-juerry" />
      </Container>
    </>
  );
};

export default JuerrysThree;
