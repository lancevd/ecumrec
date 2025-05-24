import React from "react";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#184C85]"></div>
    </div>
  );
};

export default Spinner;
