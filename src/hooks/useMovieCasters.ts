import { useState, useEffect } from 'react';
import { Caster } from '../types';
import QualgoClient from '../services';

/**
 * Custom React hook for querying movie casters.
 *
 * @param {number|string} query - The search query from input.
 * @returns {object} The movie casters, loading status, and error information.
 */
export const useMovieCasters = (movieId: number | string) => {
  const [casters, setCasters] = useState<Caster[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const client = QualgoClient.getInstance();
  useEffect(() => {
    client
      .fetchMovieCasters(movieId)
      .then(setCasters)
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, [movieId]);
  return { casters, isLoading, error };
};
