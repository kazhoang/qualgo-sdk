import { useEffect, useState } from 'react';
import { useDebounce } from '../utils';
import { Movie } from '../types';
import QualgoClient from '../services';

/**
 * Custom React hook for searching movies based on a user's query.
 *
 * @param {string} query - The search query from input.
 * @returns {object} The search results, loading status, is no result after query
 */

export const useSearchMovies = (query: string) => {
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [noResult, setNoResult] = useState<boolean>(false);

  const debouncedQuery = useDebounce(query, 500);
  const client = QualgoClient.getInstance();

  useEffect(() => {
    if (!debouncedQuery) {
      setSearchResults([]);
      setNoResult(false);
      return;
    }

    setIsLoading(true);

    client
      .searchMovies(debouncedQuery)
      .then(newResults => {
        setNoResult(newResults.length === 0);
        setSearchResults(newResults);
      })
      .catch(error => {
        console.error('Failed to fetch movies:', error);
      })
      .finally(() => setIsLoading(false));
  }, [debouncedQuery]);

  return { searchResults, isLoading, noResult };
};
