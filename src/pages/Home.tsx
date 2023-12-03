import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { MovieCard, MovieFilter } from '@/components/organisms';

import axiosClient from '@/api/axios.client';
import { RootState } from '@/store';
import { setMovies, setSearchInput, setMovieSearchQuery, setSearchByType } from '@/store/app.reducer';
import CatchError from '@/errors/catch.error';
import { SearchInput } from '@/components/molecules';
import { Select } from '@/components/atoms';
import { ESearchValue } from '@/enums';

function Home() {
	const { movies, searchInput, searchPage, movieSearchQuery, searchByType } = useSelector(
		(state: RootState) => state.app,
	);
	const dispatch = useDispatch();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		dispatch(setMovieSearchQuery(searchInput));
		e.preventDefault();
	};

	// default input
	useEffect(() => {
		(async () => {
			try {
				const { data } = await axiosClient.get(`${import.meta.env.VITE_TMDB_ACCOUNT}/watchlist/movies`);

				dispatch(setMovies(data.results));
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
				const { data } = await axiosClient.get(`/search/${searchByType}`, {
					params: {
						query: searchInput,
						page: searchPage,
					},
				});

				dispatch(setMovies(searchByType === ESearchValue.PERSON ? data.results[0].known_for : data.results));
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
						{ value: ESearchValue.MOVIE, text: 'Movie' },
						{ value: ESearchValue.KEYWORD, text: 'Keyword' },
						{ value: ESearchValue.MOVIE, text: 'Actor / Actress' },
					]}
					changeHandler={(value: string) => setSearchByType(value)}
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
					{movies.map((movies: TMovies, index: number) => (
						<MovieCard key={index} movie_id={movies.id} />
					))}
				</div>
			</main>
		</>
	);
}

export default Home;
