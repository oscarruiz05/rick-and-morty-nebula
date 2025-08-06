"use client";

import { Button } from "@/components/ui/button";
import { ChevronUp } from "lucide-react";
import { useScrollToTop } from "@/hooks/useScrollToTop";

export function ScrollToTopButton() {
  const { showScrollTop, scrollToTop } = useScrollToTop();

  if (!showScrollTop) return null;

  return (
    <Button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50 h-12 w-12 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
      size="icon"
      aria-label="Volver arriba"
    >
      <ChevronUp className="h-6 w-6" />
    </Button>
  );
}
