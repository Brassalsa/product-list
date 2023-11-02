"use client";

import { Product } from "@/types/types";
import CardList from "@/components/cardList/CardList";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

function filterRange(arr: Product[], range: string) {
  const newRange = range.split(",");
  const res = arr.filter(
    (i) => i.price >= +newRange[0] && i.price <= +newRange[1]
  );
  return res;
}

function filterCategory(arr: Product[], cat: string) {
  return arr.filter((i) => i.category === cat);
}

function filterSort(arr: Product[], sortBy: string) {
  const newSortBy = sortBy.split("-");
  const sortType = (a: number, b: number) =>
    newSortBy[1] == "asc" ? a - b : b - a;
  let res: Product[] = arr;
  if (newSortBy[0] == "price") {
    res = arr.sort((a, b) => sortType(a.price, b.price));
  } else if (newSortBy[0] == "rating") {
    res = arr.sort((a, b: Product) => sortType(a.rating.rate, b.rating.rate));
  }
  return res;
}

async function fetchData() {
  const data: Response = await fetch("https://fakestoreapi.com/products", {
    cache: "force-cache",
  });
  const json: Product[] = await data.json();
  return json;
}

async function processData(searchParams: ReadonlyURLSearchParams) {
  const cat = searchParams.get("cat");
  const range = searchParams.get("range");
  const sort = searchParams.get("sort");
  const page = searchParams.get("page") || 0;

  const data = await fetchData();
  let result: Product[] = data;
  if (cat) {
    result = filterCategory(result, cat);
  }
  if (range) {
    result = filterRange(result, range);
  }
  if (sort) {
    result = filterSort(result, sort);
  }
  const retVal: [Product[], number] = [
    result.slice(+page * 5, +page * 5 + 5),
    result.length,
  ];
  return retVal;
}

export default async function Home() {
  const searchParams = useSearchParams();
  const [data, setData]: [Product[], Function] = useState([]);
  const [size, setSize] = useState(0);
  useEffect(() => {
    const render = async () => {
      const [data, size] = await processData(searchParams);
      setData(data);
      setSize(size);
    };
    render();
  }, [searchParams.toString()]);

  return (
    <main className="max-w-7xl  mx-auto gap-2 justify-center px-3  overflow-hidden">
      <CardList productList={data} size={size} />
    </main>
  );
}
