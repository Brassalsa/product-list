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
  return (
    <>
      <div className="flex flex-wrap justify-center items-center">
        {productList?.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
      <Paging size={size} />
    </>
  );
};

export default CardList;
