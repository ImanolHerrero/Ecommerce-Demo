import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";
import { CartButton } from "./cart-button";

const Navbar02Page = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-background border-b h-16">
      <nav className="h-16 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Logo />
          <NavMenu className="hidden md:block" />
        </div>

        <div className="flex items-center gap-3">
          <CartButton />
          <div className="md:hidden">
            <NavigationSheet />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar02Page;
