import axios from 'axios';
import type { AxiosInstance, AxiosError } from 'axios';
import { API_BASE_URL, PAGE_SIZE } from '../utils/constants';
import { translateToSpanish } from './translationApi';

// Custom error classes
export class NetworkError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NetworkError';
  }
}

export class APIError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'APIError';
  }
}

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
  }
}

// Anime interface based on Kitsu API response
export interface Anime {
  id: string;
  type: 'anime';
  attributes: {
    canonicalTitle: string;
    synopsis: string;
    startDate: string;
    endDate: string | null;
    status: 'current' | 'finished' | 'upcoming';
    subtype: 'TV' | 'movie' | 'OVA' | 'ONA' | 'special';
    episodeCount: number | null;
    posterImage: {
      tiny: string;
      small: string;
      medium: string;
      large: string;
      original: string;
    };
    coverImage: {
      tiny: string;
      small: string;
      large: string;
      original: string;
    } | null;
    averageRating: string | null;
    youtubeVideoId: string | null;
  };
}

export interface KitsuAPIResponse {
  data: Anime[];
  meta: {
    count: number;
  };
  links: {
    first: string;
    next: string | null;
    last: string;
  };
}

export interface KitsuAPIDetailResponse {
  data: Anime;
}

export interface GetAnimeParams {
  subtype?: 'TV' | 'movie';
  limit?: number;
  offset?: number;
  text?: string;
}

// Create Axios instance with base configuration
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Accept': 'application/vnd.api+json',
    'Content-Type': 'application/vnd.api+json',
  },
});

/**
 * Handle API errors and throw appropriate custom errors
 */
const handleError = (error: unknown): never => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    
    if (axiosError.code === 'ECONNABORTED' || axiosError.code === 'ERR_NETWORK') {
      throw new NetworkError('Error de conexión. Verifica tu internet.');
    } else if (axiosError.response?.status && axiosError.response.status >= 500) {
      throw new APIError('No se pudo cargar el contenido. Intenta de nuevo.');
    } else if (axiosError.response?.status === 404) {
      throw new NotFoundError('Anime no encontrado.');
    }
  }
  
  throw error;
};

/**
 * Translate anime synopsis to Spanish
 * @param anime - Anime object
 * @returns Anime with translated synopsis
 */
const translateAnimeSynopsis = async (anime: Anime): Promise<Anime> => {
  if (anime.attributes.synopsis) {
    try {
      const translatedSynopsis = await translateToSpanish(anime.attributes.synopsis);
      return {
        ...anime,
        attributes: {
          ...anime.attributes,
          synopsis: translatedSynopsis
        }
      };
    } catch (error) {
      console.error('Error translating synopsis:', error);
      return anime;
    }
  }
  return anime;
};

/**
 * Get anime list with optional filters
 * @param params - Query parameters including subtype, pagination, and search
 * @returns Promise with anime list response
 */
export const getAnime = async (params: GetAnimeParams = {}): Promise<KitsuAPIResponse> => {
  try {
    const queryParams: Record<string, string | number> = {
      'page[limit]': params.limit || PAGE_SIZE,
      'page[offset]': params.offset || 0,
    };

    if (params.subtype) {
      queryParams['filter[subtype]'] = params.subtype;
    }

    if (params.text) {
      queryParams['filter[text]'] = params.text;
    }

    const response = await axiosInstance.get<KitsuAPIResponse>('/anime', {
      params: queryParams,
    });

    // Validate response data
    if (!response.data || !response.data.data) {
      throw new APIError('Respuesta inválida del servidor');
    }

    // Translate synopses to Spanish
    const translatedData = await Promise.all(
      response.data.data.map(anime => translateAnimeSynopsis(anime))
    );

    return {
      ...response.data,
      data: translatedData
    };
  } catch (error) {
    return handleError(error);
  }
};

/**
 * Get anime series (TV shows)
 * @param limit - Number of items per page
 * @param offset - Pagination offset
 * @returns Promise with series list response
 */
export const getSeries = async (limit?: number, offset?: number): Promise<KitsuAPIResponse> => {
  return getAnime({ subtype: 'TV', limit, offset });
};

/**
 * Get anime movies
 * @param limit - Number of items per page
 * @param offset - Pagination offset
 * @returns Promise with movies list response
 */
export const getMovies = async (limit?: number, offset?: number): Promise<KitsuAPIResponse> => {
  return getAnime({ subtype: 'movie', limit, offset });
};

/**
 * Get anime details by ID
 * @param id - Anime ID
 * @returns Promise with anime detail response
 */
export const getAnimeById = async (id: string): Promise<Anime> => {
  try {
    const response = await axiosInstance.get<KitsuAPIDetailResponse>(`/anime/${id}`);
    
    // Validate response data
    if (!response.data || !response.data.data) {
      throw new NotFoundError('Anime no encontrado');
    }
    
    // Translate synopsis to Spanish
    const translatedAnime = await translateAnimeSynopsis(response.data.data);
    
    return translatedAnime;
  } catch (error) {
    return handleError(error);
  }
};

/**
 * Search anime by text query
 * @param query - Search query text
 * @param limit - Number of items per page
 * @param offset - Pagination offset
 * @returns Promise with search results response
 */
export const searchAnime = async (
  query: string,
  limit?: number,
  offset?: number
): Promise<KitsuAPIResponse> => {
  return getAnime({ text: query, limit, offset });
};

export default {
  getAnime,
  getSeries,
  getMovies,
  getAnimeById,
  searchAnime,
};
