import { Link } from "react-router-dom";
import {
  Add,
  BodyCard,
  Border,
  Container,
  Error,
} from "../../components/index";
import Img1 from "../../images/Path 2281.png";
import Img2 from "../../images/edit (2).png";
import { imgUrl } from "../../Context/baseUrl";
import useFetch from "../../Context/useFetch";
import ReactPaginate from "react-paginate";
import React, { useState } from "react";
const EnterHotels = () => {
  const { data, loading, error, handlePageClick, deleteError, deleteItem } =
    useFetch("admin/hotels");
  let pageCount = Math.ceil(data?.data.data.total / data?.data.data.per_page);
  let dataAll = data?.data.data.data;
  return (
    <>
      <Error error={error} onClick={deleteError} />
      <Container>
        <Border>
          <div className="flex gap-3 justify-center flex-wrap">
            {loading ? (
              <div className="loading"></div>
            ) : (
              dataAll?.map((e) => (
                <div
                  className="border border-Brown rounded-xl min-h-[360px] w-[300px] overflow-hidden"
                  key={e.id}
                >
                  <Link to={`/hotels/${e.id}`}>
                    <div className="h-[70%]">
                      <img
                        src={imgUrl + e.main_image}
                        className="w-full h-full"
                        alt=""
                      />
                    </div>
                    <div className="flex flex-col px-5 text-end ">
                      <BodyCard value={e.name} name=":اسم الفندق" />
                      <BodyCard value={e.province} name=":المحافظة" />
                      <BodyCard value={e.location} name=":الموقع" />
                    </div>
                  </Link>
                  <CardThis
                    delete={() => deleteItem(e)}
                    link={`/hotels/UpdateHotel/${e.id}`}
                  />
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
        </Border>
        <Add link="/hotels/create-Enter-hotels" />
      </Container>
    </>
  );
};

export default EnterHotels;

const CardThis = (props) => {
  const [sure, setSure] = useState(false);
  return (
    <>
      <div
        onClick={() => setSure(false)}
        className={`${
          sure ? "" : "hidden"
        } fixed w-full h-full top-0 left-0 popup z-40 flex justify-center items-center`}
      >
        <div className="bg-white z-50 rounded-3xl w-[500px] max-w-[500px] min-h-[200px]">
          <p className="font-semibold text-3xl text-center py-7">
            هل انت متأكد من حذف هذا العنصر؟
          </p>
          <div className="flex items-end m-5">
            <button
              onClick={props.delete}
              className=" border px-10 border-Brown bg-Brown text-white font-semibold  p-3 rounded-xl"
            >
              نعم
            </button>
            <button
              onClick={() => setSure(false)}
              className=" border px-10 border-Brown text-Brown bg-white font-semibold  p-3 rounded-xl ml-5"
            >
              تراجع
            </button>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center space-x-4 ">
        <img
          src={Img1}
          alt=""
          onClick={() => setSure(true)}
          className="cursor-pointer"
        />
        <Link to={props.link}>
          <img src={Img2} alt="" className="cursor-pointer" />
        </Link>
      </div>
    </>
  );
};
