import { client } from "@/src/sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { notFound } from "next/navigation";
import ProductActions from "./ProductActions";

const PRODUCT_QUERY = `*[_type == "product" && slug.current == $slug][0]{
  _id,
  name,
  description,
  price,
  images[] {
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
    name
  }
}`;

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

export default async function ProductPage(props: { params: { slug: string } }) {
  const slug = props.params.slug;

  if (!slug) {
    notFound();
  }

  const product = await client.fetch(PRODUCT_QUERY, { slug });

  if (!product) {
    notFound();
  }

  const imageUrl = product.images?.[0]?.asset?.url;

  return (
    <main className="min-h-[calc(100vh+4rem)] flex items-center justify-center px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl w-full py-12">
        <div>
          {imageUrl && (
            <img
              src={imageUrl}
              alt={product.images?.[0]?.alt || product.name}
              className="rounded-md object-cover w-full aspect-square"
            />
          )}
        </div>

        <div className="flex flex-col justify-between gap-6">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">{product.name}</h1>
            <p>{product.description}</p>
            <p className="text-2xl font-semibold">${product.price}</p>
            {product.category?.name && (
              <p className="text-sm text-muted-foreground">
                Categoría: {product.category.name}
              </p>
            )}
          </div>

          <ProductActions product={product} />
        </div>
      </div>
    </main>
  );
}
