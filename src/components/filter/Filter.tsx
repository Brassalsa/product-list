"use client";

import { useState } from "react";
import { FilterResults } from "./filterResults";

function Filter() {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <button
        className=" bg-blue-500 text-white rounded-md px-2 py-1 sticky mb-3"
        onClick={() => setOpen(true)}
      >
        Filter
      </button>
      <FilterResults isOpen={isOpen} setOpen={setOpen} />
    </>
  );
}

export default Filter;
