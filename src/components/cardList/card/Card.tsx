import Ratings from "@/components/rating/Ratings";
import { Product } from "@/types/types";
import Image from "next/image";
import Link from "next/link";

const Card = ({ product }: { product: Product }) => {
  return (
    <Link
      href={`/product/${product.id}`}
      className="min-h-44 w-full flex shadow-md m-1 rounded-md p-3 sm:w-2/5 md:flex-col md:w-[30%] md:min-h-[250px] gap-3 group hover:opacity-95 active:opacity-100 bg-white"
    >
      <div className="aspect-[5/3] min-w-[50%] relative ">
        <Image
          src={product.image}
          fill
          sizes="33vw"
          alt="product img"
          className="object-contain group-hover:scale-105 transition-all duration-300"
        />
      </div>
      <div className="flex flex-col  overflow-clip">
        <h2 className="font-semibold text-lg truncate">{product.title}</h2>
        <span className="capitalize text-center text-red-400 rounded-md p-1 text-sm">
          {product.category}
        </span>
        <span className="font-bold self-center">${product.price}</span>
        <span className="self-center">
          <Ratings rate={product.rating.rate} />
        </span>
      </div>
    </Link>
  );
};

export default Card;
