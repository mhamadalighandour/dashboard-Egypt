import { Border } from "../../components/index";
import ExportPdf from "../../images/Export.png";
import filter from "../../images/filter (3).png";

function Export() {
  return (
    <div className="flex justify-center gap-2 flex-wrap mt-5 my-3">
      <Border>
        <div className="flex items-center justify-end pl-10 cursor-pointer">
          <span className="mr-5 text-[#5B5B5B]">(PDF) تصدير كملف</span>
          <img src={ExportPdf} className="w-[20px]" alt="" />
        </div>
      </Border>
      <Border>
        <div className="flex items-center justify-end pl-10 cursor-pointer">
          <span className="mr-5 text-[#5B5B5B]">(Excel) تصدير كملف</span>
          <img src={ExportPdf} className="w-[20px]" alt="" />
        </div>
      </Border>
      <Border>
        <div className="flex items-center justify-end pl-10 cursor-pointer">
          <span className="mr-5 text-[#5B5B5B]">فرز حسب الاسم</span>
          <img src={filter} className="w-[20px]" alt="" />
        </div>
      </Border>
    </div>
  );
}
export default Export;
