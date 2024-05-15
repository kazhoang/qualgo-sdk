import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  MovieCategory,
  QualgoClient,
  useMovieDetail,
  useSearchMovies,
  useMovieCasters,
  useMovieReviews,
} from '../.';

const client = QualgoClient.init('6abbffe6a33b23baa63f68b8e45e2dc5', 'en');

const App = () => {
  const { isLoading: detailLoading, movieDetail, error } = useMovieDetail(
    '343611'
  );
  console.log('useMovieDetail', detailLoading, movieDetail, error);

  const res1 = useSearchMovies('Ninja');
  console.log('useSearchMovies', res1);

  const res2 = useMovieCasters('343611');
  console.log('useMovieCasters', res2);

  const res3 = useMovieReviews('343611');
  console.log('useMovieReviews', res3);

  client.getMovies(MovieCategory.NowPlaying).then(nowPlayingList => {
    console.log('nowPlayingList', nowPlayingList);
  });

  client.fetchMovieDetail(343611).then(movieDetail => {
    console.log('movieDetail', movieDetail);
  });

  client.searchMovies('Ninja').then(searcheds => {
    console.log('searchMovies', searcheds);
  });

  client.getNewReleases().then(searcheds => {
    console.log('getNewReleases', searcheds);
  });

  client.fetchMovieReviews(823464).then(reviews => {
    console.log('fetchMovieReviews', reviews);
  });
  client.fetchMovieCasters(823464).then(casters => {
    console.log('fetchMovieCasters', casters);
  });
  return <div>{/* <Thing /> */}</div>;
};

ReactDOM.render(<App />, document.getElementById('root'));
