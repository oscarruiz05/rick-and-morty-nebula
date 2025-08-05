"use client";

import CharacterRelations from "@/components/character/CharacterRelations";
import EntityWrapper from "@/components/EntityWrapper";
import { useEntityLoader } from "@/hooks/useEntityLoader";
import { useEntityNavigation } from "@/hooks/useEntityNavigation";
import { getCharacter } from "@/services/characters";
import { Character } from "@/types/api";
import { useParams } from "next/navigation";

export default function CharacterRelationPage() {
  const params = useParams();
  const characterId = params.id as string;
  const { navigateToList } = useEntityNavigation({ entityType: "characters" });

  const {
    entity: character,
    loading,
    error,
  } = useEntityLoader<Character>({
    id: characterId,
    fetchFunction: getCharacter,
    entityName: "personaje",
  });

  return (
    <EntityWrapper
      loading={loading}
      error={error}
      entity={character}
      entityName="Personaje"
      backRoute="/characters"
    >
      <CharacterRelations
        character={character!}
        onBack={navigateToList}
      />
    </EntityWrapper>
  );
}
