import ReactPaginate from "react-paginate";
import useFetch from "../../Context/useFetch";
import { Container, Export } from "../../components/index";
import Delete from "../../images/Path 2281.png";
const AttendanceList = () => {
  const { data, loading, error, handlePageClick, deleteItem, deleteError } =
    useFetch(`admin/attendants`);
  let pageCount = Math.ceil(data?.data.data.total / data?.data.data.per_page);
  let dataAll = data?.data.data.data;
  const deleteItemThis = async (e) => {
    dataAll = dataAll?.filter((p) => p.id !== e.id);
    deleteItem(e);
  };
  return (
    <>
      <Export />
      <Container>
        <div className=" mx-auto  w-full overflow-x-scroll">
          <table className=" text-2xl text-center w-full ">
            <thead className="text-Brown">
              <tr>
                <td>اسم الزائر</td>
                <td>الحزب</td>
                <td>رقم الهاتف</td>
                <td>تاريخ الدخول</td>
                <td>الساعة</td>
                <td>الاحداث</td>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td className="border-none" colSpan={7}>
                    <div className="loading"></div>
                  </td>
                </tr>
              ) : (
                dataAll?.map((e) => (
                  <tr>
                    <td>{e.name}</td>
                    <td>{e.party_name}</td>
                    <td>{e.phone_number}</td>
                    <td>{e.date_of_entry}</td>
                    <td>{e.time_of_entry}</td>
                    <td>
                      <img
                        src={Delete}
                        alt=""
                        className="mx-auto cursor-pointer"
                        onClick={() => deleteItemThis(e)}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
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

export default AttendanceList;
