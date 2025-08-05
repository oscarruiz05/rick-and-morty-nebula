import api from ".";
import { PAGINATION_CONFIG } from "@/constants";
import { ApiResponse, Character } from "@/types/api";

export const getCharacters = async (
  page: number = PAGINATION_CONFIG.DEFAULT_PAGE
): Promise<ApiResponse<Character>> => {
  return await api.get<ApiResponse<Character>>(`/character?page=${page}`).then((res) => res.data);
};

export const getCharacter = async (
  id: number
): Promise<Character> => {
  return await api.get<Character>(`/character/${id}`).then((res) => res.data);
};

export const getMultipleCharacters = async (
  ids: number[]
): Promise<Character[]> => {
  if (ids.length === 0) return [];
  if (ids.length === 1) {
    const character = await getCharacter(ids[0]);
    return [character];
  }
  return await api.get(`/character/${ids.join(",")}`).then((res) => res.data);
};
