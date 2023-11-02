import Ratings from "@/components/rating/Ratings";
import { Product } from "@/types/types";
import Image from "next/image";

async function getProduct(id: number) {
  const res = await fetch("https://fakestoreapi.com/products/" + id);
  if (!res.ok) {
    throw new Error("Not found");
  }
  const json: Product = await res.json();
  return json;
}

const ProductDeatails = async ({ params }: { params: { slug: number } }) => {
  const { slug } = params;
  const product = await getProduct(slug);
  return (
    <section className="flex flex-col gap-3 justify-center items-center bg-white p-4 rounded-lg">
      <h1 className="text-2xl font-semibold text-center">{product.title}</h1>
      <div className="aspect-[2/1] max-h-96 w-[80%] relative my-6">
        <Image
          src={product.image}
          fill
          sizes="90vw"
          alt="product img"
          className="object-contain"
        />
      </div>
      <Ratings rate={product.rating.rate} />
      <span>${product.price}</span>
      <span className="capitalize text-red-400 text-sm">
        {product.category}
      </span>
      <p>{product.description}</p>
    </section>
  );
};

export default ProductDeatails;
