import { useContextHook } from "../../Context/ContextOPen";
import "./SideBar.css";
import { NavLink } from "react-router-dom";
import {
  AiOutlineUser,
  AiOutlineUserAdd,
  AiOutlineProfile,
  AiOutlineFolderView,
  AiFillYoutube,
  AiOutlineRightSquare,
} from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdCastForEducation } from "react-icons/md";
import { BsFillDiagram3Fill } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { BiFirstAid } from "react-icons/bi";

function SideBar() {
  const { openMenu, changeMenu } = useContextHook();
  return (
    <div
      className={`${openMenu ? "w-[25%]" : " w-[0%] "} ${
        openMenu
          ? " max-sm:translate-x-0 max-sm:w-[100%] "
          : " max-sm:-translate-x-full"
      }  h-[100vh] max-sm:h-[100%]  sticky bg-Brown max-sm:fixed left-0 top-0 transition-all overflow-y-scroll  py-10 z-[90]`}
    >
      <div
        className={`max-sm:block hidden text-start mx-4 text-2xl font-semibold text-white cursor-pointer sticky top-1`}
        onClick={changeMenu}
      >
        X
      </div>
      <div className="flex  h-full justify-end">
        <ul className="text-black  text-end font-semibold space-y-4">
          <li className="">
            <NavLink
              to={"/users"}
              className="text-white p-2 px-7  my rounded-s-3xl hover:text-Brown hover:bg-white flex justify-end"
            >
              المستخدمين
              <AiOutlineUser size={25} />
            </NavLink>
          </li>
          <li className="">
            <NavLink
              to={"/programs-Date"}
              className="text-white p-2 px-7  my rounded-s-3xl hover:text-Brown hover:bg-white flex justify-end"
            >
              برنامج المنتدي
              <AiOutlineProfile size={25} />
            </NavLink>
          </li>
          <li className="">
            <NavLink
              to={"/seminars"}
              className="text-white p-2 px-7  my rounded-s-3xl hover:text-Brown hover:bg-white flex justify-end"
            >
              الندوات والحاضرين
              <BsFillDiagram3Fill size={25} />
            </NavLink>
          </li>
          <li className="">
            <NavLink
              to={"/juerrys"}
              className="text-white p-2 px-7  my rounded-s-3xl hover:text-Brown hover:bg-white flex justify-end"
            >
              اللجان المختصة
              <FaUsers size={25} />
            </NavLink>
          </li>
          <li className="">
            <NavLink
              to={"/assistance"}
              className="text-white p-2 px-7  my rounded-s-3xl hover:text-Brown hover:bg-white flex justify-end"
            >
              الحضور
              <FaUsers size={25} />
            </NavLink>
          </li>
          <li className=" ">
            <NavLink
              to={"/firstaid"}
              className="text-white p-2 px-7  my rounded-s-3xl hover:text-Brown hover:bg-white flex justify-end"
            >
              المسعفين
              <BiFirstAid size={25} />
            </NavLink>
          </li>
          <li className=" ">
            <NavLink
              to={"/meeting"}
              className="text-white p-2 px-7  my rounded-s-3xl  hover:text-Brown hover:bg-white flex justify-end"
            >
              فيديوهات الملتقى
              <AiFillYoutube size={25} />
            </NavLink>
          </li>
          <li className=" ">
            <NavLink
              to={"/educational"}
              className="text-white p-2 px-7  my rounded-s-3xl  hover:text-Brown hover:bg-white flex justify-end"
            >
              مواد تعليمية
              <MdCastForEducation size={25} />
            </NavLink>
          </li>
          <li className=" ">
            <NavLink
              to={"/Memberships"}
              className="text-white p-2 px-7  my rounded-s-3xl  hover:text-Brown hover:bg-white flex justify-end"
            >
              العضويات
              <FiUsers size={25} />
            </NavLink>
          </li>
          <li className=" ">
            <NavLink
              to={"/Powers"}
              className="text-white p-2 px-7  my rounded-s-3xl  hover:text-Brown hover:bg-white flex justify-end"
            >
              الصلاحيات
              <AiOutlineRightSquare size={25} />
            </NavLink>
          </li>
          <li className=" ">
            <NavLink
              to={"/View-admin-accounts"}
              className="text-white p-2 px-7  my rounded-s-3xl  hover:text-Brown hover:bg-white flex justify-end"
            >
               حسابات الادمن
              <AiOutlineFolderView size={25} />
            </NavLink>
          </li>
          <li className="">
            <NavLink
              to={"/hotels"}
              className="text-white p-2 px-7  my rounded-s-3xl  hover:text-Brown hover:bg-white flex justify-end"
            >
               الفنادق
              <IoIosAddCircleOutline size={25} />
            </NavLink>
          </li>
          <li className="">
            <NavLink
              to={"/MaydayRequests"}
              className="text-white p-2 px-7  my rounded-s-3xl  hover:text-Brown hover:bg-white flex justify-end"
            >
              طلبات الاستغاثة
              <IoIosAddCircleOutline size={25} />
            </NavLink>
          </li>
          <li className="">
            <NavLink
              to={"/AttendanceList"}
              className="text-white p-2 px-7  my rounded-s-3xl  hover:text-Brown hover:bg-white flex justify-end"
            >
              قائمة الحاضرين
              <FaUsers size={25} />
            </NavLink>
          </li>
          <li className="pb-10">
            <NavLink
              to={"/provinces"}
              className="text-white p-2 px-7  my rounded-s-3xl  hover:text-Brown hover:bg-white flex justify-end"
            >
              المحافظات
              <FaUsers size={25} />
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
