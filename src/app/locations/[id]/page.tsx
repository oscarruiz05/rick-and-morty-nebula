"use client";

import EntityWrapper from "@/components/EntityWrapper";
import LocationRelations from "@/components/location/LocationRelations";
import { useEntityLoader } from "@/hooks/useEntityLoader";
import { useEntityNavigation } from "@/hooks/useEntityNavigation";
import { getLocation } from "@/services/locations";
import { Location } from "@/types/api";
import { useParams } from "next/navigation";

export default function LocationDetailPage() {
  const params = useParams();
  const locationId = params.id as string;
  const { navigateToList } = useEntityNavigation({ entityType: "locations" });

  const {
    entity: location,
    loading,
    error,
  } = useEntityLoader<Location>({
    id: locationId,
    fetchFunction: getLocation,
    entityName: "ubicación",
  });

  return (
    <EntityWrapper
      loading={loading}
      error={error}
      entity={location}
      entityName="Ubicación"
      backRoute="/locations"
    >
      <LocationRelations
        location={location!}
        onBack={navigateToList}
      />
    </EntityWrapper>
  );
}
