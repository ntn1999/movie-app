import { all, fork } from 'redux-saga/effects';

import { getWatchListMovie, removeMovieById } from './cart.action';
import { getListMovies, getMovieDetailById, getMovieVideoById } from './movie.action';

export function* rootSaga() {
	yield all([
		fork(getWatchListMovie),
		fork(removeMovieById),
		fork(getMovieDetailById),
		fork(getMovieVideoById),
		fork(getListMovies),
	]);
}
