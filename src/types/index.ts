export type Movie = {
  adult?: boolean;
  backdrop_path?: string;
  genre_ids?: [];
  id: number | string;
  original_language?: string;
  original_title?: string;
  overview?: string;
  popularity?: number;
  poster_path: string;
  release_date?: string;
  title: string;
  video: boolean;
  vote_average?: number;
  vote_count?: number;
  production_companies?: string;
};

export type Genres = { id: number; name: string };
export type ProductionCompany = {
  id: number;
  logo_path?: string | null;
  name: string;
  origin_country?: string;
};

export type Review = {
  author: string;
  author_details: {
    name: string;
    username: string;
    avatar_path: string;
    rating: number;
  };
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
};

export type Caster = {
  adult: string;
  gender: number;
  known_for_department: string;
  name: string;
  id: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
};

export type MovieDetail = Movie & {
  belongs_to_collection: {
    backdrop_path?: string;
    id: number;
    name: string;
    poster_path?: string;
  };
  budget?: number;
  genres: Genres[];
  homepage?: string;
  imdb_id?: string;
  origin_country?: string[];
  production_companies: ProductionCompany[];
  production_countries: { iso_3166_1: string; name: string }[];
  revenue?: number;
  runtime?: number;
  spoken_languages: { english_name: string; iso_639_1: string; name: string }[];
  status?: string;
  tagline?: string;
};

export enum MovieCategory {
  NowPlaying = 'now_playing',
  Upcoming = 'upcoming',
  Popular = 'popular',
}

export enum MoviePosterSizes {
  SIZE_W92 = 'w92',
  SIZE_W154 = 'w154',
  SIZE_W185 = 'w185',
  SIZE_W342 = 'w342',
  SIZE_W500 = 'w500',
  SIZE_W780 = 'w780',
  SIZE_ORIGINAL = 'original',
}

export enum ProfileSizes {
  SIZE_W45 = 'w45',
  SIZE_W185 = 'w185',
  SIZE_H632 = 'h632',
  SIZE_ORIGINAL = 'original',
}

export enum MovieError {
  CANT_FETCH_UPCOMING = 'Cannot fetch upcoming movies',
  CANT_FETCH_MOVIE_DETAIL = 'Cannot fetch movie details',
  CANT_FETCH_MOVIE_REVIEWS = 'Cannot fetch movie reviews',
  MOVIE_IMAGE_URL_EMPTY = 'Movie image URL is empty',
  CANT_FETCH_SEARCH_RESULTS = 'Cannot fetch search results',
}
