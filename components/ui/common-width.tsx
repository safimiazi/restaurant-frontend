import React from "react";

const CommonWidth = ({ children }: any) => {
  return (
    <div className="w-full max-w-screen-xl px-2 py-10 mx-auto">{children}</div>
  );
};

export default CommonWidth;
