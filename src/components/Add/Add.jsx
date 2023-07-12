import React from "react";
import { Link } from "react-router-dom";

const Add = (props) => {
  return (
    <div className="fixed w-10 bottom-16 right-10">
      <Link to={props.link}>
        <div
          className="rounded-full relative font-semibold text-white w-[50px] text-5xl h-[50px] p-0 bg-Brown"
          onClick={props.click}
        >
          <span className="absolute  top-[43%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
            +
          </span>
        </div>
      </Link>
    </div>
  );
};

export default Add;
