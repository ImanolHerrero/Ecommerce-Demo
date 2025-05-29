import Link from "next/link";
import { type SanityDocument } from "next-sanity";

import { client } from "@/src/sanity/client";

const POSTS_QUERY = `*[
  _type == "product" && defined(slug.current)
]|order(_createdAt desc){
  _id,
  name,
  "slug": slug.current,
  description,
  price,
  price_id,
  images[]{
    asset->{
      _id,
      url,
      metadata {
        dimensions,
        lqip
      }
    },
    alt
  },
  category->{
    _id,
    title
  }
}
`;

const options = { next: { revalidate: 30 } };

export default async function Newest() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);

  return (
    <main className="mx-auto grid lg:grid-cols-2 gap-12">
      <h1 className="text-4xl font-bold mb-8">Lo nuevo</h1>
      <ul className="flex flex-col gap-y-4">
        {posts.map((post) => (
          <li className="hover:underline" key={post._id}>
            <Link href={`/${post.slug}`}>
              <h2 className="text-xl font-semibold">{post.name}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
