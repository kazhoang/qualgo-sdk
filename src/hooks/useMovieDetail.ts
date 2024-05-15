import { useState, useEffect } from 'react';
import { MovieDetail } from '../types';
import QualgoClient from '../services';

/**
 * Custom React hook for querying movie details.
 *
 * @param {number|string} query - The search query from input.
 * @returns {object} The movie details, loading status, and error information.
 */
export const useMovieDetail = (movieId: number | string) => {
  const [movieDetail, setMovieDetail] = useState<MovieDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const client = QualgoClient.getInstance();
  useEffect(() => {
    setIsLoading(true);
    client
      .fetchMovieDetail(movieId)
      .then(setMovieDetail)
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, [movieId]);

  return { movieDetail, isLoading, error };
};
