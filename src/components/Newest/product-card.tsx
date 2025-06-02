"use client";

import { Button } from "@/components/ui/button";
import { ShoppingCartIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/src/hooks/useCart";

export const ProductCard = ({ product }: { product: any }) => {
  const { addItem, removeItem, isInCart } = useCart();
  const image = product.images?.[0]?.asset;

  const inCart = isInCart(product._id);

  return (
    <li className="border rounded-md overflow-hidden hover:shadow-lg transition">
      <Link href={`/${product.slug}`}>
        <div className="relative w-full aspect-square">
          {image?.url && (
            <Image
              src={image.url}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
              placeholder="blur"
              blurDataURL={image.metadata?.lqip}
            />
          )}
        </div>
      </Link>
      <div className="p-4">
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <p>${product.price}</p>
        <div className="flex items-center gap-2 mt-4">
          <Button className="cursor-pointer font-semibold">Comprar</Button>

          {inCart ? (
            <Button
              variant="outline"
              onClick={() => removeItem(product._id)}
              className="cursor-pointer"
            >
              <TrashIcon className="mr-1 h-4 w-4 text-destructive" />
              <p className="lg:inline hidden">Quitar del carrito</p>
            </Button>
          ) : (
            <Button
              variant="outline"
              onClick={() =>
                addItem({
                  id: product._id,
                  name: product.name,
                  price: product.price,
                  image: image?.url || "",
                  quantity: 1,
                })
              }
              className="cursor-pointer"
            >
              <ShoppingCartIcon className="mr-1 h-4 w-4" />
              <p className="lg:inline hidden">Agregar al carrito</p>
            </Button>
          )}
        </div>
      </div>
    </li>
  );
};
