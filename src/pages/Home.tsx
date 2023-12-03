import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { MovieCard, MovieFilter } from '@/components/organisms';

import axiosClient from '@/api/axios.client';
import { RootState } from '@/store';
import { setMovies } from '@/store/app.reducer';
import CatchError from '@/errors/catch.error';
import { Select } from '@/components/atoms';

function Home() {
	const { movies } = useSelector((state: RootState) => state.app);
	const dispatch = useDispatch();

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

	return (
		<>
			<MovieFilter />
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
