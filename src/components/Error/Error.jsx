import React from "react";

const Error = (props) => {
  return (
    <div
      className={`flex bg-white justify-between fixed bottom-4 transition-all  ${props.error ?"right-7":"-right-10"} items-center py-3 px-5 w-[250px] my-2 mx-auto rounded-lg border  border-Brown ${
        props.error ? "" : "hidden"
      }`}
    >
      <h1>{props.error ? props.error : ""}</h1>
      <div
        onClick={props.onClick}
        className="bg-red-600 text-white w-5 h-5 rounded-full flex cursor-pointer items-center justify-center "
      >
        X
      </div>
    </div>
  );
};

export default Error;
