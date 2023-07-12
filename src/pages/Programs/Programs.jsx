import {
  Add,
  BodyCard,
  CardAll,
  Container,
  Error,
  Export,
} from "../../components/index";
import { useParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import useFetch from "../../Context/useFetch";

const Programs = () => {
  const { id } = useParams();
  const { data, loading, error, handlePageClick, deleteItem, deleteError } =
    useFetch(
      `admin/forum-program-days/${id}/lectures`,
      "admin/forum-program-days/lectures"
    );
  let pageCount = Math.ceil(
    data?.data.data.forum_program_day_lectures.total /
      data?.data.data.forum_program_day_lectures.per_page
  );
  let dataAll = data?.data.data.forum_program_day_lectures.data;
  const deleteItemThis = async (e) => {
    dataAll = dataAll?.filter((p) => p.id !== e.id);
    deleteItem(e);
  };
  return (
    <>
      <Export />
      <Error error={error} onClick={deleteError} />
      <Container>
        <div className="flex justify-center flex-wrap gap-3 ">
        {dataAll == 0 ? <h1 className="text-center text-2xl">لايوجد بيانات</h1>:""}
          {loading ? (
            <div className="loading"></div>
          ) : (
            dataAll?.map((e) => (
              <CardAll
                update={`/programs-Date/${id}/${e.id}`}
                delete={() => deleteItemThis(e)}
                key={e.id}
              >
                <div className="text-end space-y-2">
                  <BodyCard value={e.from.substring(0, 5)} name=":من " />
                  <BodyCard value={e.to.substring(0, 5)} name=":الى" />
                  <BodyCard value={e.content} name=":المحتوى" />
                  <BodyCard
                    value={e.competent_committee}
                    name=":اللجنة المختصة"
                  />
                  <BodyCard value={e.lecturer} name=":المحاضر" />
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
        <Add link={`/programs-Date/${id}/create-programs`} />
      </Container>
    </>
  );
};

export default Programs;
