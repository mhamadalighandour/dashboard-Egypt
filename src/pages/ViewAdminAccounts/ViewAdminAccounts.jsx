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
import imgUser from "../../images/user.jpeg";
const ViewAdminAccounts = () => {
  const { data, loading, error, handlePageClick, deleteItem, deleteError } =
    useFetch("admin/admins");
  let dataAll = data?.data.data.data;
  let pageCount = Math.ceil(data?.data.data.total / data?.data.data.per_page);
  const deleteItemThis = (e) => {
    dataAll?.filter((p) => p.id !== e.id);
    deleteItem(e);
    return dataAll;
  };
  return (
    <>
      <Error error={error} onClick={deleteError} />
      <Container>
        <div className="flex items-center justify-center flex-wrap gap-3">
          {loading ? (
            <div className="loading"></div>
          ) : (
            dataAll?.map((e) => (
              <CardAll
                update={`/admin-account/${e.id}`}
                delete={() => deleteItemThis(e)}
                key={e.id}
              >
                <div className="">
                  <img
                    src={e.image ? imgUrl + e.image : imgUser}
                    alt=""
                    className="w-[70px] h-[70px] mx-auto -mt-12 rounded-full"
                  />
                </div>
                <div className="text-end space-y-2 px-2 pt-5 ">
                  <BodyCard value={e.name} name=":الاسم" />
                  <BodyCard value={e.username} name=":اسم المستخدم" />
                  <BodyCard value={e.role} name=":الصلاحية" />
                  <BodyCard value={e.job} name=":الوظيفة" />
                  <BodyCard value={e.age} name=":العمر" />
                  <BodyCard value={e.phone_number} name=":الهاتف" />
                  <BodyCard value={e.email} name=":الإيميل" />
                  <BodyCard value={e.location} name=":عنوان السكن" />
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
        <Add link="/admin-account/create-account" />
      </Container>
    </>
  );
};

export default ViewAdminAccounts;
