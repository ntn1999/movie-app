import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AxiosResponse } from 'axios';

import axiosClient from '@/api/axios.client';
import store, { RootState } from '@/store';
import { setListMovies, setListMovieByGenres } from '@/store/movie.reducer';
import CatchError from '@/errors/catch.error';
import { MovieGenres } from '@/components/organisms';

function Home() {
	const dispatch = useDispatch();
	const { listMovies, listMovieByGenres } = useSelector((state: RootState) => state.movie);

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
				const { results: resultsWatchlist } = responseWatchlist.data;
				const { genres } = responseGenres.data;

				if (resultsTrending && responseWatchlist && genres) {
					resultsTrending.forEach((movie: TMovie) => {
						// get all id of movie in cart
						const allMovieIdInWatchList: number[] = resultsWatchlist.map(
							(watchlist: TMovie) => watchlist.id,
						);

						if (allMovieIdInWatchList.includes(movie.id)) movie.isInCart = true;
						else movie.isInCart = false;
					});

					// save all movie was changed
					dispatch(setListMovies(resultsTrending));

					// fetch each
					const storeMovies: TMovieGenres[] = [];
					// decrease total API call
					genres.slice(0, 10);

					for await (const genre of genres) {
						const response: AxiosResponse<TResponseListMovies> = await axiosClient.get('/discover/movie', {
							params: {
								with_genres: genre.id,
								sort_by: 'popularity.desc',
							},
						});
						const { results } = response.data;

						storeMovies.push({
							genre: genre.name,
							movies: results,
						});
					}
					// save list movie
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
			<MovieGenres genre="Trending" movies={listMovies} maxDisplay={4} />
			{listMovieByGenres.map((movie: TMovieGenres, index: number) => (
				<MovieGenres key={index} genre={movie.genre} movies={movie.movies} maxDisplay={4} />
			))}
		</>
	);
}

export default Home;
