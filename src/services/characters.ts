import api from ".";
import { PAGINATION_CONFIG } from "@/constants";
import { ApiResponse, Character } from "@/types/api";

export const getCharacters = async (
  page: number = PAGINATION_CONFIG.DEFAULT_PAGE
): Promise<ApiResponse<Character>> => {
  return await api.get(`/characters?page=${page}`).then((res) => res.data);
};

export const getCharacter = async (
  id: number
): Promise<ApiResponse<Character>> => {
  return await api.get(`/characters/${id}`).then((res) => res.data);
};

export const searchCharacters = async (
  name: string,
  page: number = PAGINATION_CONFIG.DEFAULT_PAGE
): Promise<ApiResponse<Character>> => {
  return await api
    .get(`/characters?name=${name}&page=${page}`)
    .then((res) => res.data);
};
