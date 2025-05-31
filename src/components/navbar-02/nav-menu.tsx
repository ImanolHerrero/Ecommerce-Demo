"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { NavigationMenuProps } from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { name: "Home", href: "/" },
  { name: "Zapatillas", href: "/Shoes" },
  { name: "Camisas", href: "/Shirts" },
  { name: "Pantalones", href: "/Pants" },
];

export const NavMenu = (props: NavigationMenuProps) => {
  const pathname = usePathname();

  return (
    <NavigationMenu {...props}>
      <NavigationMenuList className="gap-6 space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start data-[orientation=vertical]:p-4">
        {links.map((link, idx) => (
          <NavigationMenuItem key={idx}>
            <NavigationMenuLink asChild>
              <Link
                href={link.href}
                className={cn(
                  "text-lg font-semibold transition duration-100",
                  pathname === link.href ? "text-primary" : "hover:text-primary"
                )}
              >
                {link.name}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
