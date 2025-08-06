import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function useScrollToTopOnRouteChange() {
  const pathname = usePathname();

  useEffect(() => {
    // Hacer scroll al inicio inmediatamente al cambiar de ruta
    window.scrollTo(0, 0);
  }, [pathname]);
}
