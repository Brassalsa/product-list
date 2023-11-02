"use client";
import { Product } from "@/types/types";
import Card from "./card/Card";
import Paging from "../paging/Paging";

const CardList = ({
  productList,
  size,
}: {
  productList: Product[];
  size?: number;
}) => {
  console.log(productList);

  return (
    <section className="min-h-[80vh] flex flex-col justify-between">
      <div className="flex flex-wrap justify-center items-center ">
        {productList?.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
      <Paging size={size} />
    </section>
  );
};

export default CardList;
