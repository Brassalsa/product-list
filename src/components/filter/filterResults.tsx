import { useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";

export const FilterResults = ({
  isOpen,
  setOpen,
}: {
  isOpen: boolean;
  setOpen: Function;
}) => {
  const [cat, setCat] = useState(Array<string>);
  const [selectedCat, selectCat] = useState("");
  const [sort, setSort] = useState("");
  const router = useRouter();
  const [priceRange, setPriceRange] = useState([-Infinity, Infinity]);

  function submit() {
    setOpen(false);
    router.push(`/?cat=${selectedCat}&range=${priceRange}&sort=${sort}`);
  }

  function clear() {
    selectCat("");
    setSort("");
    setPriceRange([-Infinity, Infinity]);
  }

  useEffect(() => {
    const getCat = async () => {
      const res = await fetch("https://fakestoreapi.com/products/categories", {
        cache: "force-cache",
      });
      const json = await res.json();
      setCat(json);
    };
    getCat();
  }, []);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    submit();
  }

  if (isOpen)
    return (
      <div
        className="absolute top-0 bottom-0 right-0 left-0 bg-black/40 z-50 flex flex-col justify-center items-center"
        onClick={() => setOpen(false)}
      >
        <form
          className="flex flex-col justify-center items-center gap-3 bg-white p-4 rounded-lg w-80 relative"
          onClick={(e) => e.stopPropagation()}
          onSubmit={handleSubmit}
        >
          <button
            className="absolute right-4 top-2"
            onClick={() => setOpen(false)}
          >
            ❌
          </button>
          <h1>Category</h1>
          <select
            onChange={(e) => selectCat(e.target.value)}
            value={selectedCat}
            className="capitalize"
          >
            <option value={""}>Any</option>
            {cat.map((i) => (
              <option key={i} value={i} className="capitalize">
                {i}
              </option>
            ))}
          </select>
          <h1>Price</h1>
          <div className="flex gap-3">
            <span>
              From -
              <select
                onChange={(e) =>
                  setPriceRange([+e.target.value, priceRange[1]])
                }
                value={priceRange[0]}
              >
                <option value={-Infinity}>Any</option>
                <option value={10}>$ 10</option>
                <option value={50}>$ 50</option>
                <option value={100}>$ 100</option>
                <option value={500}>$ 500</option>
                <option value={1000}>$ 1000</option>
              </select>
            </span>
            <span>
              To -
              <select
                onChange={(e) =>
                  setPriceRange([priceRange[0], +e.target.value])
                }
                value={priceRange[1]}
              >
                <option value={Infinity}>Any</option>
                <option value={10}>$ 10</option>
                <option value={50}>$ 50</option>
                <option value={100}>$ 100</option>
                <option value={500}>$ 500</option>
                <option value={1000}>$ 1000</option>
              </select>
            </span>
          </div>
          <h1>
            Sort -{" "}
            <select
              className="capitalize bg-slate-300  py-2 rounded-md  text-sm font-normal"
              onChange={(e) => setSort(e.target.value)}
              value={sort}
            >
              <option value={""}>Any</option>
              <option value={"price-asc"}>Price - Asc</option>
              <option value={"price-desc"}>Price - Desc</option>
              <option value={"rating-desc"}>Ratings - High</option>
              <option value={"rating-asc"}>Ratings - Low</option>
            </select>
          </h1>
          <div className="flex gap-3">
            <button
              className="bg-blue-400 text-white px-3 py-2 rounded-md"
              type="submit"
            >
              Apply
            </button>
            <button
              className="bg-red-400 text-white px-3 py-2 rounded-md"
              type="button"
              onClick={clear}
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    );
};
