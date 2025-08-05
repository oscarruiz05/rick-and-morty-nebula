import api from ".";
import { PAGINATION_CONFIG } from "@/constants";
import { ApiResponse, Episode } from "@/types/api";

export const getEpisodes = async (
  page: number = PAGINATION_CONFIG.DEFAULT_PAGE
): Promise<ApiResponse<Episode>> => {
  return await api
    .get<ApiResponse<Episode>>(`/episode?page=${page}`)
    .then((res) => res.data);
};

export const getEpisode = async (id: number): Promise<Episode> => {
  return await api.get<Episode>(`/episode/${id}`).then((res) => res.data);
};

export const getMultipleEpisodes = async (
  ids: number[]
): Promise<Episode[]> => {
  if (ids.length === 0) return [];
  if (ids.length === 1) {
    const episode = await getEpisode(ids[0]);
    return [episode];
  }
  return await api.get(`/episode/${ids.join(",")}`).then((res) => res.data);
};
