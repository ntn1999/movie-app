import { all, fork } from 'redux-saga/effects';
import { getWatchListMovie, removeMovieById } from './cart.action';

export function* rootSaga() {
	yield all([fork(getWatchListMovie), fork(removeMovieById)]);
}
