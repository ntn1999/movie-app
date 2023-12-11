import { call, put, takeEvery } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosError, AxiosResponse } from 'axios';

import axiosClient from '@/api/axios.client';
import { SagaActions } from '@/enums/saga.enum';
import { setMovieDetail, setOneMovieVideoKey } from '@/store/reducers/movie.reducer';

function* fetchMovieDetailById(action: PayloadAction<number>) {
	try {
		const response: AxiosResponse<TMovieDetail> = yield call(axiosClient.get, `/movie/${action.payload}`, {
			params: {
				// get actors information
				append_to_response: 'credits',
			},
		});
		yield put(setMovieDetail(response.data));
	} catch (err) {
		if (err instanceof AxiosError) {
			throw Error(err.message);
		}
	}
}

function* fetchMovieVideosById(action: PayloadAction<number>) {
	try {
		const response: AxiosResponse<TResponseMovieVideos> = yield call(
			axiosClient.get,
			`/movie/${action.payload}/videos`,
		);
		const { results } = response.data;
		const [firstTrailer] = results;

		yield put(setOneMovieVideoKey(firstTrailer.key));
	} catch (err) {}
}

export function* getMovieDetailById() {
	yield takeEvery(SagaActions.GET_DETAIL_MOVIE_BY_ID, fetchMovieDetailById);
}

export function* getMovieVideoById() {
	yield takeEvery(SagaActions.GET_VIDEO_MOVIE_BY_ID, fetchMovieVideosById);
}
