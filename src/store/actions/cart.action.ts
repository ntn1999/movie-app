import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { AxiosError, AxiosResponse } from 'axios';

import axiosClient from '@/api/axios.client';
import { setListMovieInCart, setRemoveMovieById, setTotalMovieInCart } from '@/store/reducers/cart.reducer';
import { EStatusWatchlist } from '@/enums';
import { SagaActions } from '@/enums/saga.enum';
import { PayloadAction } from '@reduxjs/toolkit';
import { setMovieIsInCartById } from '../reducers/movie.reducer';

function* fetchWathlistMovies() {
	try {
		const response: AxiosResponse<TResponseListMovies> = yield call(
			axiosClient.get,
			`${import.meta.env.VITE_TMDB_ACCOUNT}/watchlist/movies`,
		);
		const { results } = response.data;

		yield put(setListMovieInCart(results));
	} catch (err: unknown) {
		if (err instanceof AxiosError) {
			throw Error(err.message);
		}
	}
}

function* removeWatchListByMovieId(action: PayloadAction<number>) {
	try {
		const response: AxiosResponse<TResponseWatchlist> = yield call(
			axiosClient.post,
			`${import.meta.env.VITE_TMDB_ACCOUNT}/watchlist`,
			{
				media_type: 'movie',
				media_id: action.payload,
				watchlist: false, // FOR REMOVE
			},
		);
		yield put(setRemoveMovieById(action.payload));

		const { status_code, status_message } = response.data;

		if (status_code === EStatusWatchlist.ADDED) return status_message;
		else if (status_code === EStatusWatchlist.REMOVED) return status_message;
		else throw Error('Watchlist fail...');
	} catch (err: unknown) {
		if (err instanceof AxiosError) {
			throw Error(err.message);
		}
	}
}

function* addWatchListByMovieId(action: PayloadAction<number>) {
	try {
		const response: AxiosResponse<TResponseWatchlist> = yield call(
			axiosClient.post,
			`${import.meta.env.VITE_TMDB_ACCOUNT}/watchlist`,
			{
				media_type: 'movie',
				media_id: action.payload,
				watchlist: true, // FOR ADD
			},
		);
		const { status_code, status_message } = response.data;

		if (status_code === EStatusWatchlist.ADDED || status_code === EStatusWatchlist.UPDATED) {
			yield put(setMovieIsInCartById(action.payload));
			// yield put();
		}
	} catch (err: unknown) {
		if (err instanceof AxiosError) {
			throw Error(err.message);
		}
	}
}

export function* getWatchListMovie() {
	yield takeLatest(SagaActions.FETCH_LIST_MOVIE_IN_CART, fetchWathlistMovies);
}

export function* removeMovieById() {
	yield takeEvery(SagaActions.REMOVE_MOVIE_BY_ID, removeWatchListByMovieId);
}

export function* addMovieById() {
	yield takeEvery(SagaActions.ADD_MOVIE_BY_ID, addWatchListByMovieId);
}
