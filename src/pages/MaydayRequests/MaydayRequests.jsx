import ReactPaginate from "react-paginate";
import useFetch from "../../Context/useFetch";
import { BodyCard, CardAll, Container, Error, Export } from "../../components/index";
import { useRef } from "react";

const MaydayRequests = () => {
  const { data, loading, error, handlePageClick, deleteItem } = useFetch(
    `admin/medical-reliefs_orders?filter=all` ,`admin/medical-reliefs_orders`
  );
  let pageCount = Math.ceil(data?.data.data.total / data?.data.data.per_page);
  let dataAll = data?.data.data.data;

  const selectedCheckboxesRef = useRef([]);

  function handleCheckboxChange(event) {
    const { value, checked } = event.target;
    if (checked) {
      selectedCheckboxesRef.current.push(value);
      window.sessionStorage.setItem("chackBox", [
        selectedCheckboxesRef.current,
      ]);
    } else {
      selectedCheckboxesRef.current = selectedCheckboxesRef.current.filter(
        (item) => item !== value
      );
    }
  }
  // console.log(selectedCheckboxesRef.current);
  return (
    <>
    <Error error={error} />
      <Export />
      <Container>
        <div className="flex flex-wrap justify-center gap-4">
          {loading ? (
            <div className="loading"></div>
          ) : (
            dataAll?.map((e) => (
              <div key={e.id}>
                <input
                  type="checkbox"
                  value={e.id}
                  onChange={handleCheckboxChange}
                />
                <CardAll delete={() => deleteItem(e)}>
                  <div className="text-end space-y-2 pl-">
                    <BodyCard
                      value={e.distressed_person_name}
                      name=":اسم المستغيث"
                    />
                    <BodyCard value={e.date} name=":التاريخ" />
                    <BodyCard value={e.time} name=":الساعة" />
                    <BodyCard value={e.Paramedic_name} name=": اسم المسعف" />
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
      </Container>
    </>
  );
};

export default MaydayRequests;
