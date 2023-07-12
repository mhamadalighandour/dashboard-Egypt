import { Link } from "react-router-dom";

const Button = (props) => {
  return (
    <>
      <button
        onClick={props.click}
        className="m-3 border border-Brown text-Brown font-semibold bg-white px-12 py-1 rounded-xl hover:bg-Brown hover:text-white transition-all"
      >
        اضافة
      </button>

      <button
        onClick={() => window.history.go(-1)}
        className="m-3 border border-Brown text-Brown font-semibold bg-white px-12 py-1 rounded-xl hover:bg-Brown hover:text-white transition-all"
      >
        رجوع
      </button>
    </>
  );
};

export default Button;
