import React from "react";
import { Add, Container, Error } from "../../components/index";
import { BiEdit, BiTrashAlt } from "react-icons/bi";
import useFetch from "../../Context/useFetch";
import { Link } from "react-router-dom";

function Provinces() {
  const { data, loading, error, deleteItem, deleteError } =
    useFetch(`admin/provinces`);
  let dataAll = data?.data.data;

  return (
    <>
      <Error error={error} onClick={deleteError} />
      <Container>
        <div className=" mx-auto w-full  py-8 overflow-x-scroll">
          <table className=" text-2xl text-center w-full mx-auto ">
            <thead className="text-Brown">
              <tr>
                <td>المحافظات</td>
                <td>احداث</td>
              </tr>
            </thead>
            <tbody className="">
              {loading ? (
                <tr>
                  <td className="border-none" colSpan={5}>
                    <div className="loading"></div>
                  </td>
                </tr>
              ) : (
                dataAll?.map((e) => (
                  <tr kay={e.id}>
                    <td>{e.name}</td>
                    <td className="">
                      <div className="flex justify-center gap-6 ">
                        <Link to={`/provinces/${e.id}`}>
                          <button className="cursor">
                            <BiEdit size={35} color={"Brown"} />
                          </button>
                        </Link>
                        <button
                          className="cursor"
                          onClick={() => deleteItem(e)}
                        >
                          <BiTrashAlt size={35} color={"rgb(244,63,94)"} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <Add link="/provinces/create-provinc" />
      </Container>
    </>
  );
}

export default Provinces;
