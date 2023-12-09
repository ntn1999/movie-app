import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AxiosResponse } from 'axios';

import axiosClient from '@/api/axios.client';
import { RootState } from '@/store';
import { setListMovieByGenres } from '@/store/movie.reducer';
import CatchError from '@/errors/catch.error';
import { MovieGenres } from '@/components/organisms';
import { setTotalMovieInCart, setTotalPriceInCart } from '@/store/cart.reducer';

function Home() {
	const dispatch = useDispatch();
	const { listMovieByGenres } = useSelector((state: RootState) => state.movie);

	// default input
	useEffect(() => {
		(async () => {
			try {
				// get list Trending movie list in current week
				const responseTrending: AxiosResponse<TResponseListMovies> = await axiosClient.get(
					'/trending/movie/week',
				);
				// get list of film genres
				const responseGenres: AxiosResponse<TResponseGenres> = await axiosClient.get('/genre/movie/list');
				// get list Watchlist movie (called in Cart)
				const responseWatchlist: AxiosResponse<TResponseListMovies> = await axiosClient.get(
					`${import.meta.env.VITE_TMDB_ACCOUNT}/watchlist/movies`,
				);

				const { results: resultsTrending } = responseTrending.data;
				const { results: resultsWatchlist, total_results } = responseWatchlist.data;
				const { genres } = responseGenres.data;
				// decrease total API call
				genres.slice(0, 10);

				if (responseWatchlist) {
					const totalPrice: number = resultsWatchlist.reduce(
						(acc: number, movie: TMovie) => acc + Math.floor(movie.popularity),
						0,
					);
					dispatch(setTotalMovieInCart(total_results));
					dispatch(setTotalPriceInCart(totalPrice));
				}

				if (resultsTrending && genres) {
					const storeMovies: TMovieGenres[] = [];

					// Trending in TOP
					storeMovies.push({
						genre: 'Trending',
						movies: resultsTrending,
					});

					for (const genre of genres) {
						const response: AxiosResponse<TResponseListMovies> = await axiosClient.get('/discover/movie', {
							params: {
								with_genres: genre.id,
								sort_by: 'popularity.desc',
							},
						});
						const { results } = response.data;

						// push another movie into Array
						storeMovies.push({
							genre: genre.name,
							movies: results,
						});
					}

					storeMovies.forEach((movieGenre: TMovieGenres) => {
						// get Array include id of movie in Watchlist
						const allMovieIdInWatchList: number[] = resultsWatchlist.map(
							(watchlist: TMovie) => watchlist.id,
						);

						movieGenre.movies.forEach((movie: TMovie) => {
							if (allMovieIdInWatchList.includes(movie.id)) movie.isInCart = true;
							else movie.isInCart = false;
						});
					});

					dispatch(setListMovieByGenres(storeMovies));
				} else throw Error('Call API fail...');
			} catch (err) {
				const { message } = new CatchError(err);
				window.alert(message);
			}
		})();
	}, []);

	return (
		<>
			{listMovieByGenres.map((movie: TMovieGenres, index: number) => (
				<MovieGenres key={index} genre={movie.genre} movies={movie.movies} maxDisplay={4} />
			))}
		</>
	);
}

export default Home;
