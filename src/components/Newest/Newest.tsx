import { client } from "@/src/sanity/client";
import { ProductCard } from "./product-card";
import { type SanityDocument } from "next-sanity";

const POSTS_QUERY = `*[ _type == "product" && defined(slug.current) ]|order(_createdAt desc){
  _id,
  name,
  "slug": slug.current,
  description,
  price,
  price_id,
  images[] {
    asset-> {
      _id,
      url,
      metadata {
        dimensions,
        lqip
      }
    },
    alt
  },
  category-> {
    _id,
    title
  }
}`;

export default async function Newest() {
  const products: SanityDocument[] = await client.fetch(POSTS_QUERY);

  return (
    <main className="mx-auto px-4 py-6">
      <h1 className="text-4xl font-bold mb-8">Lo nuevo</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </ul>
    </main>
  );
}
