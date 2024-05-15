import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  MovieCategory,
  QualgoClient,
  useMovieDetail,
  useSearchMovies,
} from '../.';

const client = QualgoClient.init('6abbffe6a33b23baa63f68b8e45e2dc5', 'en');

const App = () => {
  const { isLoading: detailLoading, movieDetail, error } = useMovieDetail(
    '343611'
  );
  console.log('useMovieDetail', detailLoading, movieDetail, error);

  const response = useSearchMovies('Ninja');
  console.log('useSearchMovies', response);

  client.getMovies(MovieCategory.NowPlaying).then(nowPlayingList => {
    console.log('nowPlayingList', nowPlayingList);
  });

  client.fetchMovieDetail(343611).then(movieDetail => {
    console.log('movieDetail', movieDetail);
  });

  client.searchMovies('Ninja').then(searcheds => {
    console.log('searchMovies', searcheds);
  });

  return <div>{/* <Thing /> */}</div>;
};

ReactDOM.render(<App />, document.getElementById('root'));
