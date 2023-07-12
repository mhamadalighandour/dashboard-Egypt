import { Link } from "react-router-dom";
import Img1 from "../../images/Path 2281.png";
import Img2 from "../../images/edit (2).png";
import { useState } from "react";

const CardAll = (props) => {
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
      <div
        className={`border border-Brown p-5  max-sm:m-0 rounded-xl space-y-3`}
      >
        <div className="flex justify-start">
          <div className="flex items-center justify-center space-x-4 ">
            <img
              src={Img1}
              alt=""
              onClick={() => setSure(true)}
              className="cursor-pointer"
            />

            <Link to={props.update || ""}>
              <img src={Img2} alt="" className="cursor-pointer" onClick={props.edit}/>
            </Link>
          </div>
        </div>
        <div className="text-end">{props.children}</div>
      </div>
    </>
  );
};

export default CardAll;