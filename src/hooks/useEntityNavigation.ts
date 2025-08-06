import { useRouter } from "next/navigation";
import { Character, Location, Episode } from "@/types/api";

type Entity = Character | Location | Episode;

interface UseEntityNavigationOptions {
  entityType: "characters" | "locations" | "episodes";
}

interface UseEntityNavigationResult {
  navigateToEntity: (entity: Entity) => void;
  navigateToList: () => void;
}

export function useEntityNavigation({
  entityType,
}: UseEntityNavigationOptions): UseEntityNavigationResult {
  const router = useRouter();

  const navigateToEntity = (entity: Entity) => {
    router.push(`/${entityType}/${entity.id}`);
  };

  const navigateToList = () => {
    router.push(`/${entityType}`);
  };

  return {
    navigateToEntity,
    navigateToList,
  };
}
