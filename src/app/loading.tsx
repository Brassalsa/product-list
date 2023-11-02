"use client";

const Loading = () => {
  const repeate = [1, 2, 3, 4, 5];
  return (
    <div className="flex flex-wrap justify-center items-center">
      {" "}
      {repeate.map((i) => (
        <div
          key={i}
          className="min-h-44 w-full flex shadow-md m-1 rounded-md p-3 sm:w-2/5 md:flex-col md:w-[30%] md:min-h-[250px] gap-3 group hover:opacity-95 active:opacity-100 bg-white animate-pulse"
        >
          <div className="aspect-[5/3] min-w-[50%] relative bg-gray-300 rounded"></div>
          <div className="flex flex-col overflow-clip">
            <h2 className="font-semibold text-lg truncate bg-gray-300 w-full h-6 rounded"></h2>
            <span className="capitalize text-center text-red-400 p-1 text-sm bg-gray-300 w-full h-4 rounded-md"></span>
            <span className="font-bold self-center bg-gray-300 w-full h-4 rounded"></span>
            <span className="self-center bg-gray-300 w-full h-4 rounded"></span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Loading;
