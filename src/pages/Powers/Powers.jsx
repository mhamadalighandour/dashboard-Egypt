import { BiEdit } from "react-icons/bi";
import { Border, Container } from "../../components/index";
import useFetch from "../../Context/useFetch";
import { Link } from "react-router-dom";
const Powers = () => {
  const { data, loading} =
    useFetch(`admin/roles`);
  let dataAll = data?.data.data;
  return (
    <Container>
      <div className="flex justify-center flex-wrap gap-4">
        {loading ? (
          <div className="loading"></div>
        ) : (
          dataAll?.map((e) => (
            <Border key={e.id}>
              <div className="text-end w-[200px]">
                <div className="flex justify-between">
                  <Link to={`/Powers/updete/${e.id}`}>
                    <BiEdit
                      size={35}
                      color={"Brown"}
                      className="cursor-pointer"
                    />
                  </Link>
                  <div>
                    <h6 className="text-Brown">:اسم الصلاحية</h6>
                    {e.ar_name}
                  </div>
                </div>
              </div>
            </Border>
          ))
        )}
      </div>
    </Container>
  );
};

export default Powers;
