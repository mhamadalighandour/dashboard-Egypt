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
import { Link } from "react-router-dom";
import { useRef } from "react";
import { imgUrl } from "../../Context/baseUrl";
import imgUser from "../../images/user.jpeg";

const Users = () => {
  const { data, loading, error, handlePageClick, deleteItem, deleteError } =
    useFetch("admin/users");
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
      window.sessionStorage.setItem("chackBox", [
        selectedCheckboxesRef.current,
      ]);
    }
  }

  return (
    <>
      <Export />
      <Error error={error} onClick={deleteError} />
      <Container>
        <div className="flex items-center justify-center flex-wrap gap-3">
          {loading ? (
            <div className="loading"></div>
          ) : (
            dataAll?.map((e) => (
              <div className="relative">
                <input
                  type="checkbox"
                  value={e.id}
                  onChange={handleCheckboxChange}
                />
                <CardAll
                  key={e.id}
                  delete={() => deleteItem(e)}
                  update={`/users/account/${e.id}`}
                >
                  <Link to={`/users/${e.id}`}>
                    <div className="">
                      <img
                        src={e.image ? imgUrl + e.image : imgUser}
                        alt="QR"
                        className="w-[60px] h-[60px] mx-auto -mt-12 rounded-full"
                      />
                    </div>
                    <div className="text-end space-y-2 px-2 pt-5">
                      <BodyCard value={e.name} name=":اسم المحاضر" />
                      <BodyCard value={e.job} name=":الوظيفة" />
                      <BodyCard value={e.age} name=":العمر" />
                      <BodyCard value={e.phone_number} name=":الهاتف" />
                      <BodyCard value={e.email} name=":الإيميل" />
                      <BodyCard value={e.party_name} name=":اسم الحزب" />
                      <BodyCard value={e.location} name=": عنوان السكن" />
                      <BodyCard value={e.hotel_name} name=":اسم الفندق" />
                      <BodyCard
                        value={
                          dataAll?.has_been_housed
                            ? "تم تسكينه"
                            : "لم يتم تسكينه"
                        }
                        name=": التسكين"
                      />
                    </div>
                  </Link>
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
        <Add link={`/users/account/Create-account`} />
      </Container>
    </>
  );
};

export default Users;
