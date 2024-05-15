import { useEffect, useState } from 'react';
import {
  Genres,
  MoviePosterSizes,
  ProductionCompany,
  ProfileSizes,
} from '../types';
import CONFIG from '../config';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

export function getMovieImageUrlPath(
  posterPath: string | undefined,
  size: MoviePosterSizes = MoviePosterSizes.SIZE_ORIGINAL
): string {
  if (!posterPath) {
    return '';
  }
  return `${CONFIG.TMBDImageServicesBaseUrl}${size}${posterPath}`;
}

export function getProfileCasterUrlPath(
  profilePath: string | undefined,
  size: ProfileSizes = ProfileSizes.SIZE_ORIGINAL
): string {
  if (!profilePath) {
    return '';
  }
  return `${CONFIG.TMBDImageServicesBaseUrl}${size}${profilePath}`;
}

export function getGenreNames(genres: Genres[] | undefined): string {
  if (!genres) {
    return '';
  }
  return genres.map(genre => genre.name).join(', ');
}

export function getDistributionNames(
  companies: ProductionCompany[] | undefined
): string {
  if (!companies) {
    return '';
  }
  return companies.map(company => company.name).join(', ');
}
