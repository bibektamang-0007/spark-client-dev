import { useState } from "react";
import { Menu } from "lucide-react";
import type { NavbarProps } from "./navigation.types";
import { Link } from "react-router";
import { cn } from "@/shared/utils/utils";
import { Button } from "@/shared/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/components/ui/sheet";

export function Navbar({
  logo,
  navItems,
  loginText,
  loginHref = "#login",
  registerText,
  registerHref = "#register",
  className,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b border-white/10 bg-brand-header backdrop-blur-md",
        className,
      )}
    >
      <div className="container mx-auto flex items-center justify-between gap-4 px-6 py-2.5">
        {/* Brand / Logo */}
        <div className="flex gap-8">
          <Link
            to="/"
            className="flex shrink-0 items-center gap-3 transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          >
            <span className="grid place-items-center rounded-lg bg-white pb-1 px-1.5 shadow-sm">
              <img
                src={logo?.src}
                alt={logo?.alt}
                className="h-12 w-auto block mix-blend-multiply object-contain"
              />
            </span>
          </Link>
          {/* Desktop Navigation Links */}
          <nav
            className="hidden items-center gap-6 lg:flex lg:gap-8"
            aria-label="Main Navigation"
          >
            {navItems?.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={cn(
                  "text-[14.5px] whitespace-nowrap transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50",
                  item.isActive
                    ? "font-semibold text-white"
                    : "font-medium text-white/75 hover:text-white",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        {/* Desktop Action CTAs */}
        <div className="hidden items-center gap-2.5 lg:flex shrink-0">
          <Button className="h-auto rounded-sm border-2 border-white bg-white px-6 py-2.5 text-[12.5px] font-bold uppercase tracking-wider text-brand-primary transition-colors hover:bg-brand-surface hover:text-brand-dark">
            <Link to={loginHref}>{loginText}</Link>
          </Button>

          <Button
            variant="outline"
            className="h-auto rounded-[3px] border-2 border-white/85 bg-transparent px-6 py-2.5 text-[12.5px] font-bold uppercase tracking-wider text-white transition-colors hover:bg-white/10 hover:text-white"
          >
            <Link to={registerHref}>{registerText}</Link>
          </Button>
        </div>

        {/* Mobile Navbar */}
        <div className="flex lg:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10 focus-visible:ring-white/50"
                aria-label="Toggle navigation menu"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-brand-header border-white/10"
            >
              <SheetHeader className="text-left border-b border-white/10 pb-4">
                <SheetTitle className="text-white">Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-6 p-6">
                <nav className="flex flex-col gap-4">
                  {navItems?.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "text-base transition-colors",
                        item.isActive
                          ? "font-semibold text-white"
                          : "font-medium text-white/75 hover:text-white",
                      )}
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>

                <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
                  <Button
                    onClick={() => {
                      setIsOpen(false);
                    }}
                    className="w-full rounded-[3px] border-2 border-white bg-white text-[12.5px] font-bold uppercase tracking-wider text-brand-primary hover:bg-brand-surface"
                  >
                    <Link to={loginHref}>{loginText}</Link>
                  </Button>

                  <Button
                    onClick={() => {
                      setIsOpen(false);
                    }}
                    variant="outline"
                    className="w-full rounded-[3px] border-2 border-white/85 bg-transparent text-[12.5px] font-bold uppercase tracking-wider text-white hover:bg-white/10 hover:text-white"
                  >
                    <Link to={registerHref}>{registerText}</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
