import api from ".";
import { PAGINATION_CONFIG } from "@/constants";
import { ApiResponse, Location } from "@/types/api";

export const getLocations = async (
  page: number = PAGINATION_CONFIG.DEFAULT_PAGE
): Promise<ApiResponse<Location>> => {
  return await api
    .get<ApiResponse<Location>>(`/location?page=${page}`)
    .then((res) => res.data);
};

export const getLocation = async (id: number): Promise<Location> => {
  return await api.get<Location>(`/location/${id}`).then((res) => res.data);
};

export const getMultipleLocations = async (
  ids: number[]
): Promise<Location[]> => {
  if (ids.length === 0) return [];
  if (ids.length === 1) {
    const location = await getLocation(ids[0]);
    return [location];
  }
  return await api.get(`/location/${ids.join(",")}`).then((res) => res.data);
};
