"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { useState } from "react";

export const CartButton = () => {
  const [cartItems, setCartItems] = useState(3);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative cursor-pointer">
          <ShoppingCart className="h-5 w-5" />
          {cartItems > 0 && (
            <span className="absolute -top-1 -right-1 inline-flex items-center justify-center h-4 w-4 text-xs rounded-full bg-primary text-white">
              {cartItems}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="p-4">
        <SheetTitle className="sr-only">Carrito</SheetTitle>
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">Carrito</h2>
          <p className="text-sm text-muted-foreground">
            Tu carrito tiene {cartItems} producto(s).
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
};
