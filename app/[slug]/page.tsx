import { client } from "@/src/sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Link from "next/link";

const PRODUCT_QUERY = `*[_type == "product" && slug.current == $slug][0]{
  _id,
  name,
  description,
  price,
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
    name
  }
}`;

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const options = { next: { revalidate: 30 } };

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = await client.fetch(PRODUCT_QUERY, { slug }, options);

  if (!product) {
    return (
      <main className="container mx-auto min-h-screen max-w-3xl p-8">
        <h1 className="text-2xl font-bold">Producto no encontrado</h1>
        <Link href="/" className="text-blue-500 underline">
          ← Volver al inicio
        </Link>
      </main>
    );
  }

  const imageUrl = product.images?.[0]?.asset?.url;

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-6">
      <Link href="/" className="text-blue-500 underline">
        ← Volver al catálogo
      </Link>

      {imageUrl && (
        <img
          src={imageUrl}
          alt={product.images?.[0]?.alt || product.name}
          className="rounded-xl aspect-video object-cover"
          width={550}
          height={310}
        />
      )}

      <h1 className="text-4xl font-bold">{product.name}</h1>

      <p className="text-lg text-gray-700">{product.description}</p>

      <p className="text-xl font-semibold text-green-600">
        Precio: ${product.price}
      </p>

      {product.category?.name && (
        <p className="text-sm text-gray-500">
          Categoría: {product.category.name}
        </p>
      )}
    </main>
  );
}
