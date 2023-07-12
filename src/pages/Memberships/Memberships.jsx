import useFetch from "../../Context/useFetch";
import { Add, Border, CardAll, Container, Error } from "../../components/index";

const Memberships = () => {
  const { data, loading, error, handlePageClick, deleteItem, deleteError } =
    useFetch("admin/memberships");
  let dataAll = data?.data.data;
  const deleteItemThis = (e) => {
    dataAll?.filter((p) => p.id !== e.id); //p.id !== e.id
    deleteItem(e);
    return dataAll;
  };
  return (
    <>
      <Error error={error} onClick={deleteError} />
      <Container>
        <div className="flex justify-center flex-wrap gap-2">
          {loading ? (
            <div className="loading"></div>
          ) : (
            dataAll?.map((e) => (
              <CardAll
                key={e.id}
                delete={() => deleteItemThis(e)}
                update={`/Memberships/${e.id}`}
              >
                <div className="px-10">{e.name}</div>
              </CardAll>
            ))
          )}
        </div>
        <Add link="/Memberships/create-Memberships" />
      </Container>
    </>
  );
};

export default Memberships;
