import axios, { AxiosInstance } from 'axios';
import CONFIG from '../config';
import { Movie, MovieCategory, MovieDetail, MovieError } from '../types';

class QualgoClient {
  private static instance: QualgoClient;
  private client: AxiosInstance;

  private constructor(apiKey: string, language: string = 'en') {
    this.client = axios.create({
      baseURL: CONFIG.TMBDBaseUrl,
      params: { api_key: apiKey, language },
    });
  }

  /**
   * Initializes a new instance of the QualgoClient if it has not been initialized yet.
   * This method must be called before accessing the client instance via getInstance.
   *
   * @param apiKey - The API key used for authenticating requests to the API.
   * @param language - (Optional) The language parameter to be sent in each API request. Defaults to 'en'.
   * @returns The singleton instance of QualgoClient.
   */
  public static init(apiKey: string, language: string = 'en'): QualgoClient {
    if (!QualgoClient.instance) {
      QualgoClient.instance = new QualgoClient(apiKey, language);
    }
    return QualgoClient.instance;
  }

  /**
   * Returns the singleton instance of the QualgoClient. Throws an error if the client
   * has not been initialized yet.
   *
   * This method ensures that the QualgoClient is a singleton and that it has been
   * properly initialized before use. Call 'init' before calling this method.
   *
   * @throws {Error} Throws an error if the QualgoClient has not been initialized.
   * @returns The singleton instance of QualgoClient.
   */
  public static getInstance(): QualgoClient {
    if (!QualgoClient.instance) {
      throw new Error(
        "QualgoClient is not initialized. Call 'init' with API key first."
      );
    }
    return QualgoClient.instance;
  }

  /**
   * Fetches a list of movies based on the specified category.
   *
   * @param {MovieCategory} category - The category of movies to fetch (e.g., 'upcoming', 'popular').
   * @returns {Promise<Movie[]>} A promise that resolves to an array of movies.
   * @throws {Error} Throws an error if the API call fails.
   */
  async getMovies(category: MovieCategory): Promise<Movie[]> {
    try {
      const response = await this.client.get(`/movie/${category}`);
      return response.data.results as Movie[];
    } catch (error) {
      throw new Error(MovieError.CANT_FETCH_UPCOMING);
    }
  }

  /**
   * Fetches detailed information about a specific movie by its ID.
   *
   * @param {number|string} movieId - The identifier for the movie, either a number or a string.
   * @returns {Promise<MovieDetail>} A promise that resolves to the detailed information of the movie.
   * @throws {Error} Throws an error if the movie details cannot be fetched from the API.
   */
  async fetchMovieDetail(movieId: number | string): Promise<MovieDetail> {
    try {
      const response = await this.client.get(`/movie/${movieId}`);
      return response.data as MovieDetail;
    } catch (error) {
      throw new Error(MovieError.CANT_FETCH_MOVIE_DETAIL);
    }
  }

  /**
   * Searches for movies based on a user-provided query string.
   *
   * This function sends a request to the TMDb API's search endpoint to retrieve movies that match the given query. It is designed to return an empty array if the query is just whitespace to prevent unnecessary API calls.
   *
   * @param {string} query - The search text to query for movies.
   * @returns {Promise<Movie[]>} A promise that resolves to an array of movies matching the search query.
   * @throws {Error} Throws an error if the search operation fails.
   */
  async searchMovies(query: string): Promise<Movie[]> {
    if (!query.trim()) {
      return [];
    }
    try {
      const response = await this.client.get('/search/movie', {
        params: { query },
      });
      return response.data.results as Movie[];
    } catch (error) {
      console.error('Failed to search movies:', error);
      throw new Error(MovieError.CANT_FETCH_SEARCH_RESULTS);
    }
  }
}

export default QualgoClient;
