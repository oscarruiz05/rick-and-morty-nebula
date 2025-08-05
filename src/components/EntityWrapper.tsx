import { Character, Episode, Location } from "@/types/api";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

interface EntityPageWrapperProps {
  loading: boolean;
  error: string | null;
  entity: Character | Episode | Location | null;
  entityName: string;
  backRoute: string;
  children: ReactNode;
}

export default function EntityWrapper({
  loading,
  error,
  entity,
  entityName,
  backRoute,
  children,
}: EntityPageWrapperProps) {
  const router = useRouter();

  const handleBack = () => {
    router.push(backRoute);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Cargando {entityName}...</span>
        </div>
      </div>
    );
  }

  if (error || !entity) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <p className="text-destructive">
          {error || `${entityName} no encontrado`}
        </p>
        <button
          onClick={handleBack}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
        >
          Volver a {entityName}s
        </button>
      </div>
    );
  }

  return <>{children}</>;
}
