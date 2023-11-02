import React from "react";

const loading = () => {
  return (
    <section className="flex flex-col gap-3 justify-center items-center px-3 py-2 animate-pulse">
      <h1 className="text-2xl font-semibold text-center bg-gray-300 w-4/5  h-6 rounded"></h1>
      <div className="aspect-[2/1] max-h-96 w-[80%] relative my-6 bg-gray-300 rounded"></div>
      <div className="bg-gray-300 w-20 h-4 rounded"></div>
      <span className="bg-gray-300 w-11 h-4 rounded"></span>
      <span className="capitalize text-red-400 text-sm bg-gray-300 w-11 h-4 rounded"></span>
      <p className="bg-gray-300 w-full h-28 rounded"></p>
    </section>
  );
};

export default loading;
