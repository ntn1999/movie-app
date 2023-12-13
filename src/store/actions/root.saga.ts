import { all, fork } from 'redux-saga/effects';

import { getListMovies } from './movie.action';
import { addMovieById, getWatchListMovie, removeMovieById } from './cart.action';

export function* rootSaga() {
	yield all([fork(getWatchListMovie), fork(removeMovieById), fork(getListMovies), fork(addMovieById)]);
}
