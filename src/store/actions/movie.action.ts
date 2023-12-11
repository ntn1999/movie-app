import { call, put, takeEvery } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosError, AxiosResponse } from 'axios';

import axiosClient from '@/api/axios.client';
import { SagaActions } from '@/enums/saga.enum';
import { setListMovieByGenres, setMovieDetail, setOneMovieVideoKey } from '@/store/reducers/movie.reducer';
import { setTotalMovieInCart, setTotalPriceInCart } from '@/store/reducers/cart.reducer';

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

function* fetchListMovies() {
	const storeListMoviesByGenres: TMovieGenres[] = [];

	//* API 1
	const responseWatchlist: AxiosResponse<TResponseListMovies> = yield call(
		axiosClient.get,
		`${import.meta.env.VITE_TMDB_ACCOUNT}/watchlist/movies`,
	);
	const { results: resultsWatchlist, total_results } = responseWatchlist.data;

	//* API 2
	const responseGenres: AxiosResponse<TResponseGenres> = yield call(axiosClient.get, '/genre/movie/list');
	const { genres } = responseGenres.data;

	//* API 3
	const responseTrending: AxiosResponse<TResponseListMovies> = yield call(axiosClient.get, '/trending/movie/week');
	const { results: resultsTrending } = responseTrending.data;

	if (responseWatchlist) {
		const totalPrice: number = resultsWatchlist.reduce(
			(acc: number, movie: TMovie) => acc + Math.floor(movie.popularity),
			0,
		);
		yield put(setTotalMovieInCart(total_results));
		yield put(setTotalPriceInCart(totalPrice));
	}

	if (resultsTrending && genres) {
		// Trending in TOP
		storeListMoviesByGenres.push({
			genre: 'Trending',
			movies: resultsTrending,
		});

		// only get 10 api about genres
		for (const genre of genres.slice(0, 10)) {
			//* API 4
			const response: AxiosResponse<TResponseListMovies> = yield call(axiosClient.get, '/discover/movie', {
				params: {
					with_genres: genre.id,
					sort_by: 'popularity.desc',
				},
			});
			const { results } = response.data;

			// push another movie into Array
			storeListMoviesByGenres.push({
				genre: genre.name,
				movies: results,
			});
		}

		storeListMoviesByGenres.forEach((movieGenre: TMovieGenres): void => {
			// get Array include id of movie in Watchlist
			const allMovieIdInWatchList: number[] = resultsWatchlist.map((watchlist: TMovie) => watchlist.id);

			movieGenre.movies.forEach((movie: TMovie) => {
				if (allMovieIdInWatchList.includes(movie.id)) movie.isInCart = true;
				else movie.isInCart = false;
			});
		});

		yield put(setListMovieByGenres(storeListMoviesByGenres));
	}
}

export function* getMovieDetailById() {
	yield takeEvery(SagaActions.GET_DETAIL_MOVIE_BY_ID, fetchMovieDetailById);
}

export function* getMovieVideoById() {
	yield takeEvery(SagaActions.GET_VIDEO_MOVIE_BY_ID, fetchMovieVideosById);
}

export function* getListMovies() {
	yield takeEvery(SagaActions.GET_LIST_MOVIES, fetchListMovies);
}
