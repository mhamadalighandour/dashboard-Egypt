import React from "react";

function Imports(props) {
  return (
    <div className="flex  max-sm:flex-col-reverse w-full mx-3">
      <input
        type={props.type ||"text"}
        value={props.value}
        onChange={props.onChange}
        autoComplete={props.autoComplete}
        placeholder={props.placeholder}
        className=" block max-md:w-full mx-auto w-[100%] border-b border-b-Brown py-3 pr-5 font-semibold outline-none text-end "
      />
      <pre className="flex items-center max-sm:border-none max-sm:text-end max-sm:block border-b font-semibold text-Brown border-Brown -ml-4 justify-end  max-md:p-0">
        {props.title}
      </pre>
    </div>
  );
}

export default Imports;
