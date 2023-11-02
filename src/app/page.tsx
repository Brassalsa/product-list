import { Product } from "@/types/types";
import CardList from "@/components/cardList/CardList";

type Filter = {
  cat?: string;
  page?: number;
  range?: string;
  sort?: string;
};

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

async function processData({ cat = "", page = 0, range, sort }: Filter) {
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
  let retValue: [Product[], number] = [
    result.slice(page * 5, page * 5 + 5),
    data.length,
  ];
  return retValue;
}

export default async function Home({ searchParams }: { searchParams: object }) {
  const data = await processData({ ...searchParams });
  let productList: Product[] = [];
  let length = 0;
  if (data.length > 0) {
    productList = data[0];
    length = data[1];
  }
  return (
    <main className="max-w-7xl  mx-auto gap-2 justify-center px-3  overflow-hidden">
      <CardList productList={productList} size={length} />
    </main>
  );
}
