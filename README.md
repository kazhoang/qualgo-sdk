
## ⭐ Features

### Singleton Client Instance

- **Singleton Pattern**: `qualgo-sdk` implements a singleton pattern for its main client class, `QualgoClient`. This ensures that there is only one instance of the client throughout the application, which helps manage API usage and maintain state more efficiently.

### Movie Data Retrieval

- **Fetch Movie Lists**: Allows fetching lists of movies, such as popular, upcoming, or top-rated movies through simple API calls.
- **Search Movies**: Users can search for movies, with the search optimized by debouncing queries to reduce API load.
- **Movie Details**: Retrieve detailed information about a specific movie.
- **Movie Reviews**: Fetch reviews for a particular movie, providing insights from various viewers.
- **Movie Cast Information**: Get detailed cast information, including actors.

### Custom React Hooks

- **useMovieDetail**: A React hook that fetches and stores details of a specific movie, managing loading states and errors seamlessly.
- **useSearchMovies**: Provides functionalities to search for movies using a user-provided query string, including handling of loading states and empty results.
- **useMovieReviews**: Fetches and manages movie reviews, useful for displaying user-generated content related to specific movies.
- **useMovieCasters**: Retrieves and tracks information about the cast of specific movies.

## ⚙️ Installation

Install `qualgo-sdk` using npm:

```bash
npm install qualgo-sdk
```

Or using yarn:

```bash
yarn add qualgo-sdk
```

## Usage

Before using the SDK, initialize it with your API key:

```js
import { QualgoClient } from 'qualgo-sdk';

// Initialize the client
QualgoClient.init('your_api_key_here');
```

### Fetching Movies

To fetch movies based on category:

```typescript
import { MovieCategory } from 'qualgo-sdk';
const client = QualgoClient.getInstance();

client.getMovies(MovieCategory.NowPlaying).then(movies => {
  console.log(movies);
}).catch(error => {
  console.error(error);
});
```

### Fetching Movie Details

#### Movie Details

```js
client.fetchMovieDetail(movieId).then(movieDetail => {
  console.log(movieDetail);
}).catch(error => {
  console.error(error);
});
```

### Using Custom Hooks

```js
import { useMovieDetail } from 'qualgo-sdk';

const MovieDetailComponent = ({ movieId }) => {
  const { movieDetail, isLoading, error } = useMovieDetail(movieId);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading details!</p>;
  
  return (
    <div>
      <h1>{movieDetail.title}</h1>
      <p>{movieDetail.overview}</p>
    </div>
  );
};
```

#### Movie Details

```js
import React, { useState } from 'react';
import { useSearchMovies } from 'qualgo-sdk';

const MovieSearchComponent = () => {
    const [query, setQuery] = useState('');
    const { searchResults, isLoading, noResult } = useSearchMovies(query);

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search movies..."
            />
            {isLoading && <div>Loading...</div>}
            {!isLoading && noResult && <div>No results found.</div>}
            <ul>
                {searchResults.map(movie => (
                    <li key={movie.id}>{movie.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default MovieSearchComponent;
```

### Using Utils

#### getMovieImageUrlPath

Constructs a full URL for movie poster images from a path and specified size.

Parameters

- posterPath: string | undefined - The path to the poster image.
- size: MoviePosterSizes - The size of the poster (defaults to original size).

```typescript
const posterUrl = getMovieImageUrlPath('/path/to/poster.jpg', MoviePosterSizes.ORIGINAL);
```

#### getProfileCasterUrlPath

Generates a full URL for profile images from a path and specified size.

Parameters

- profilePath: string | undefined - The path to the profile image.
- size: ProfileSizes - The size of the profile image (defaults to original size).

```typescript
const profileUrl = getProfileCasterUrlPath('/path/to/profile.jpg', ProfileSizes.ORIGINAL);
```
