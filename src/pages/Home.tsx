import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios, { AxiosResponse } from 'axios';

import { Select } from '@/components/atoms';
import { SearchInput } from '@/components/molecules';
import { MovieCard } from '@/components/organisms';

import axiosClient from '@/api/axios.client';
import { RootState } from '@/store';
import { setListMovies, setSearchInput, setMovieSearchQuery, setSearchByType } from '@/store/movie.reducer';
import CatchError from '@/errors/catch.error';
import { EResults, ESearchValue } from '@/enums';

function Home() {
	const dispatch = useDispatch();
	const { listMovies, searchInput, searchPage, movieSearchQuery, searchByType } = useSelector(
		(state: RootState) => state.movie,
	);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		dispatch(setMovieSearchQuery(searchInput));
		e.preventDefault();
	};

	// default input
	useEffect(() => {
		(async () => {
			try {
				const responseAPI: AxiosResponse<TResponseAPI> = await axiosClient.get(
					`${import.meta.env.VITE_TMDB_ACCOUNT}/watchlist/movies`,
				);
				const responseDB: AxiosResponse<TResponseDB<TCarts>> = await axios.get(
					`${import.meta.env.VITE_LOCAL_DB}/movies`,
				);
				const { results: resultsAPI } = responseAPI.data;
				const { results: resultsDB, dataPart } = responseDB.data;

				if (resultsAPI && resultsDB === EResults.OK) {
					resultsAPI.forEach((movie: TMovie) => {
						// get all movie is saved in DB
						const allMovieIdFromDB: number[] | [] = dataPart.map((cart: TCart) => cart.movie_id);

						if (allMovieIdFromDB.includes(movie.id)) movie.isInCart = true;
						else movie.isInCart = false;
					});

					dispatch(setListMovies(resultsAPI));
				} else {
					window.alert('Call API fail...');
				}
			} catch (err) {
				const { message } = new CatchError(err);
				window.alert(message);
			}
		})();
	}, []);

	// Search by keyword
	useEffect(() => {
		(async () => {
			try {
				const response: AxiosResponse<TResponseAPI> = await axiosClient.get(`/search/${searchByType}`, {
					params: {
						query: searchInput,
						page: searchPage,
					},
				});
				const { results } = response.data;
				// dispatch(setListMovies(searchByType === ESearchValue.PERSON ? results[0].known_for : results));
			} catch (err) {
				const { message } = new CatchError(err);
				window.alert(message);
			}
		})();
	}, [movieSearchQuery]);

	return (
		<>
			<div className="flex justify-center items-center m-10">
				<Select
					label="Search by..."
					options={[
						{ value: ESearchValue.MULTI, text: 'All' },
						{ value: ESearchValue.MOVIE, text: 'Movie' },
						{ value: ESearchValue.KEYWORD, text: 'Keyword' },
						{ value: ESearchValue.PERSON, text: 'Actor / Actress' },
					]}
					changeHandler={(value: string) => dispatch(setSearchByType(value))}
				/>
				<SearchInput
					value={searchInput}
					placeHolder="Search movie..."
					changeHandler={(value) => dispatch(setSearchInput(value))}
					submitHandler={handleSubmit}
				/>
			</div>

			<main className="flex justify-center items-center">
				<div className="grid grid-cols-3 gap-x-10 gap-y-20 place-items-center">
					{listMovies.map((movie: TMovie, index: number) => (
						<MovieCard key={index} movie_id={movie.id} />
					))}
				</div>
			</main>
		</>
	);
}

export default Home;
