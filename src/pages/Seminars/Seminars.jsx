import ReactPaginate from "react-paginate";
import useFetch from "../../Context/useFetch";
import {
  Add,
  BodyCard,
  CardAll,
  Container,
  Error,
  Export,
} from "../../components/index";
// import { useRef } from "react";

function Seminars() {
  const { data, loading, error, handlePageClick, deleteItem, deleteError } =
    useFetch(`admin/seminars`);
  let pageCount = Math.ceil(data?.data.data.total / data?.data.data.per_page);
  let dataAll = data?.data.data.data;
  const deleteItemThis = async (e) => {
    dataAll?.filter((p) => p.id !== e.id);
    deleteItem(e);
  };

  // const selectedCheckboxesRef = useRef([]);

  // function handleCheckboxChange(event) {
  //   const { value, checked } = event.target;
  //   if (checked) {
  //     selectedCheckboxesRef.current.push(value);
  //     window.sessionStorage.setItem("chackBox", [
  //       selectedCheckboxesRef.current,
  //     ]);
  //   } else {
  //     selectedCheckboxesRef.current = selectedCheckboxesRef.current.filter(
  //       (item) => item !== value
  //     );
  //   }
  // }
  return (
    <>
      <Export />
      <Error error={error} onClick={deleteError} />
      <Container>
        <div className="flex justify-center flex-wrap gap-3 ">
          {loading ? (
            <div className="loading"></div>
          ) : (
            dataAll?.map((e) => (
              <>
                {/* <input
                  type="checkbox"
                  value={e.id}
                  onChange={handleCheckboxChange}
                /> */}
                <CardAll
                  update={`/seminars/${e.id}`}
                  delete={() => deleteItemThis(e)}
                  key={e.id}
                >
                  <div className="text-end space-y-2">
                    <BodyCard value={e.title} name=":عنوان الندوة" />
                    <BodyCard value={e.lecturer} name=":محاضر الندوة" />
                    <BodyCard value=" " name=":الموقع الوظيفي للمحاضر" />
                    <BodyCard value={e.Job_site} />
                    <BodyCard
                      value={e.date + "  " + e.time.substring(0, 5)}
                      name=":تاريخ الندوة"
                    />
                  </div>
                </CardAll>
              </>
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
        <Add link="/seminars/create-seminars" />
      </Container>
    </>
  );
}

export default Seminars;
