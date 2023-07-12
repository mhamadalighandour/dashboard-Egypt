import { BiMenu } from "react-icons/bi";
import Logo from "../../images/photo1686213216_clipdrop-background-removal.png";
import { useContextHook } from "../../Context/ContextOPen";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const { changeMenu } = useContextHook();
  return (
    <div className="bg-white sticky z-40 top-0  border-b border-b-Brown   flex items-center justify-between flex-wrap">
      <div>
        <BiMenu
          size={35}
          className="text-Brown cursor-pointer"
          onClick={changeMenu}
        />
      </div>
      <div className="">
        <img src={Logo} alt="" className="w-[100px]" />
      </div>
      <div className="flex gap-9">
        <div className="m-1">
          <NavLink to="/publicInformation" className={"link"}>
            <button

              className=" mx-2 border border-Brown text-Brown font-semibold bg-white p-3  rounded-xl hover:bg-Brown hover:text-white transition-all"
            >
              معلومات عامة
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
