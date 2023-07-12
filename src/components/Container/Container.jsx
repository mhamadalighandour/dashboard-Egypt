import React from "react";

const Container = ({ children }) => {
  return (
    <section className="py-5 ">
      <div className="w-[90%] mx-auto container">{children}</div>
    </section>
  );
};

export default Container;
