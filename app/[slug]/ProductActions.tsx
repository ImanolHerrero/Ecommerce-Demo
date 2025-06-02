"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/src/hooks/useCart";
import { ShoppingCartIcon, TrashIcon } from "lucide-react";

type Props = {
  product: {
    _id: string;
    name: string;
    price: number;
    images?: { asset?: { url?: string } }[];
  };
};

export default function ProductActions({ product }: Props) {
  const { addItem, removeItem, isInCart } = useCart();
  const [size, setSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  const imageUrl = product.images?.[0]?.asset?.url ?? "";
  const composedId = size ? `${product._id}-${size}` : null;
  const inCart = composedId ? isInCart(composedId) : false;

  const handleToggleCart = () => {
    if (!size) return alert("Seleccioná un talle");

    if (inCart) {
      // QUITAR el producto del carrito
      removeItem(composedId!);
    } else {
      // AGREGAR el producto con la cantidad seleccionada
      addItem({
        id: composedId!,
        name: `${product.name} - Talle ${size}`,
        price: product.price,
        image: imageUrl,
        quantity,
      });
    }
  };

  return (
    <form className="space-y-4">
      <div>
        <label className="block mb-1">Talle</label>
        <div className="flex gap-2">
          {["XS", "S", "M", "L", "XL", "2XL"].map((s) => (
            <Button
              key={s}
              type="button"
              variant={size === s ? "default" : "outline"}
              onClick={() => setSize(s)}
              className="w-10 h-10 p-0"
            >
              {s}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <label className="block mb-1">Cantidad</label>
        <select
          className="w-20 border rounded-md p-2"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
        >
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>

      <div className="pt-4 flex gap-2">
        <Button className="font-semibold cursor-pointer">Comprar ahora</Button>

        <Button
          onClick={handleToggleCart}
          variant={"outline"}
          className="cursor-pointer"
          type="button"
        >
          {inCart ? (
            <>
              <TrashIcon className="mr-2 h-4 w-4 text-destructive" />
              Quitar del carrito
            </>
          ) : (
            <>
              <ShoppingCartIcon className="mr-2 h-4 w-4" />
              Agregar al carrito
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
