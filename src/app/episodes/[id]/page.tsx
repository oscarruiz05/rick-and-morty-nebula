"use client";

import EntityWrapper from "@/components/EntityWrapper";
import { EpisodeRelations } from "@/components/episode/EpisodeRelations";
import { useEntityLoader } from "@/hooks/useEntityLoader";
import { useEntityNavigation } from "@/hooks/useEntityNavigation";
import { getEpisode } from "@/services/episodes";
import { Episode } from "@/types/api";
import { useParams } from "next/navigation";

export default function EpisodeRelationPage() {
  const params = useParams();
  const episodeId = params.id as string;
  const { navigateToList } = useEntityNavigation({ entityType: "episodes" });

  const {
    entity: episode,
    loading,
    error,
  } = useEntityLoader<Episode>({
    id: episodeId,
    fetchFunction: getEpisode,
    entityName: "episodio",
  });

  return (
    <EntityWrapper
      loading={loading}
      error={error}
      entity={episode}
      entityName="Episodio"
      backRoute="/episodes"
    >
      <EpisodeRelations episode={episode!} onBack={navigateToList} />
    </EntityWrapper>
  );
}
