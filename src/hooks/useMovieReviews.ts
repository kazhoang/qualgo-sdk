import { useState, useEffect } from 'react';
import { Review } from '../types';
import QualgoClient from '../services';

/**
 * Custom React hook for querying movie reviews.
 *
 * @param {number|string} query - The search query from input.
 * @returns {object} The movie reviews, loading status, and error information.
 */
export const useMovieReviews = (movieId: number | string) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const client = QualgoClient.getInstance();
  useEffect(() => {
    client
      .fetchMovieReviews(movieId)
      .then(setReviews)
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, [movieId]);
  return { reviews, isLoading, error };
};
