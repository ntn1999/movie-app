import { all, fork } from 'redux-saga/effects';

import { addMovieById, getWatchListMovie, removeMovieById } from './cart.action';
import { getListMovies, getMovieDetailById } from './movie.action';

export function* rootSaga() {
	yield all([
		fork(getWatchListMovie),
		fork(removeMovieById),
		fork(getMovieDetailById),
		fork(getListMovies),
		fork(addMovieById),
	]);
}
