import { Link, useParams } from "react-router-dom";
import { BodyCard, Border, Container } from "../../components/index";
import { imgUrl } from "../../Context/baseUrl";
import useFetch from "../../Context/useFetch";
import Img2 from "../../images/edit (2).png";

const Hotel = () => {
  const { id } = useParams();

  const { data } = useFetch(`admin/hotels/${id}`);
  const { data: dataImg } = useFetch(`admin/hotels/${id}/images`);
  const { data: dataRooms } = useFetch(`admin/hotels/${id}/rooms`);

  return (
    <Container>
      <Border>
        <Link to={`/hotels/UpdateHotel/${data?.data.data.id}`}>
          <img src={Img2} alt="" className="cursor-pointer" />
        </Link>
        <div>
          <div className="flex justify-around gap-1 items-center max-sm:flex-col">
            <img
              src={`${imgUrl}${data?.data.data.main_image}`}
              alt=""
              className="rounded-full w-[200px] h-[200px]"
            />
            <div className="flex flex-col space-y-5 ">
              <BodyCard value={data?.data.data.name} name=":اسم الفندق" />
              <BodyCard value={data?.data.data.province} name=":المحافظة" />
              <BodyCard value={data?.data.data.location} name=":الموقع" />
              <BodyCard
                value={data?.data.data.floor_number}
                name=":عدد الطوابق"
              />
              <BodyCard value={data?.data.data.rooms_count} name=":عدد الغرف" />
            </div>
          </div>
          <br />
          <div className="flex justify-center gap-3 flex-wrap">
            {dataImg?.data.data.map((e) => (
              <div className="w-[200px] ">
                <img
                  src={imgUrl + e.image}
                  alt=""
                  className="w-[250px] h-[150px] rounded-2xl "
                />
              </div>
            ))}
          </div>
          <br />
          <div className="flex justify-center gap-3 flex-wrap">
            {dataRooms?.data.data.map((e, i) => (
              <div className="border border-Brown p-5  max-sm:m-0 rounded-xl space-y-3">
                <div className="flex flex-col px-2 text-end ">
                  <BodyCard value={e.number} name=":رقم الغرفة" />
                  <BodyCard value={e.floor_number} name=":رقم الطابق" />
                  <BodyCard value={e.number_of_places} name=":عدد الأماكن" />
                  <BodyCard
                    value={e.preview_url.substring(0, 30) + "..."}
                    name=":رابط"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Border>
    </Container>
  );
};

export default Hotel;
