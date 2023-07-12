import React from "react";
import { BodyCard, CardAll, Container } from "../../components/index";
import { useParams } from "react-router-dom";
import useFetch from "../../Context/useFetch";
import { imgUrl } from "../../Context/baseUrl";
import imgUser from "../../images/user.jpeg";
const UsersTwo = () => {
  const { id } = useParams();
  const { data, deleteItem } = useFetch(`admin/users/${id}`,`admin/users`);
  let dataAll = data?.data.data;
  return (
    <Container>
      <CardAll
        delete={() => deleteItem(dataAll?.id)}
        update={`/users/account/${dataAll?.id}`}
      >
        <div className="max-sm:m-0 -mt-[30px]">
          <div className="flex justify-around max-md:flex-col gap-10">
            <img
              src={`${imgUrl}${dataAll?.qrimage}`}
              alt=""
              className="w-[170px] h-[170px] mx-auto"
            />
            <img
              src={dataAll?.image ? imgUrl + dataAll?.image : imgUser}
              alt=""
              className="w-[130px] h-[130px] mx-auto rounded-full"
            />
          </div>
          <div className="flex flex-wrap justify-start flex-row-reverse gap-5 py-5">
            <BodyCard value={dataAll?.name} name=":اسم المحاضر" />
            <BodyCard value={dataAll?.job} name=":الوظيفة" />
            <BodyCard value={dataAll?.age} name=":العمر" />
            <BodyCard value={dataAll?.phone_number} name=":الهاتف" />
            <BodyCard value={dataAll?.email} name=":الإيميل" />
            <BodyCard value={dataAll?.party_name} name=":اسم الحزب" />
            <BodyCard value={dataAll?.role} name=":العضوية" />
            <BodyCard value={dataAll?.hotel_name} name=":اسم الفندق" />
            <BodyCard value={dataAll?.hotel_name} name=":اسم الفندق" />
            <BodyCard value={dataAll?.location} name=": عنوان السكن" />
            <BodyCard value={dataAll?.hotel_name} name=":اسم الفندق" />
            <BodyCard value={dataAll?.room_number} name=":رقم الطابق" />
            <BodyCard value={dataAll?.room_number} name=":رقم الغرفة" />
            <BodyCard value={dataAll?.other1} name=":معلومات آخرى" />
            <BodyCard value={dataAll?.other2} name=":معلومات آخرى" />
            <BodyCard value={dataAll?.other3} name=":معلومات آخرى" />
            <BodyCard
              value={dataAll?.has_been_housed ? "تم تسكينه" : "لم يتم تسكينه"}
              name=": التسكين"
            />
          </div>
        </div>
      </CardAll>
    </Container>
  );
};

export default UsersTwo;
