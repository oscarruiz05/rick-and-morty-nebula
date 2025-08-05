"use client";
import { cn } from "@/lib/utils";
import { Heart, MapPin, Tv, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const navigationItems = [
  {
    href: "/characters",
    label: "Personajes",
    icon: Users,
  },
  {
    href: "/locations",
    label: "Ubicaciones",
    icon: MapPin,
  },
  {
    href: "/episodes",
    label: "Episodios",
    icon: Tv,
  },
  {
    href: "/favorites",
    label: "Favoritos",
    icon: Heart,
  },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Rick and Morty
          </h1>
          <p className="text-muted-foreground mt-2">
            Explora el universo de Rick and Morty - Personajes, Ubicaciones y
            Episodios
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <div className="grid grid-cols-4 gap-1 bg-muted p-1 rounded-lg mb-4">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center justify-center gap-2 px-6 py-3 rounded-md text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
