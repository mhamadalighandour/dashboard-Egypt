const ButtonApp = (props) => {
  return (
    <>
      <button
        onClick={props.onClick}
        className=" mx-2 border border-Brown text-Brown font-semibold bg-white p-3  rounded-xl hover:bg-Brown hover:text-white transition-all"
      >
        {props.children}
      </button>
      <button
        onClick={()=> window.history.go(-1)}
        className=" border border-Brown text-Brown font-semibold bg-white p-3  rounded-xl hover:bg-Brown hover:text-white transition-all"
      >
        <span className="px-5">رجوع</span>
      </button>
    </>
  );
};

export default ButtonApp;
