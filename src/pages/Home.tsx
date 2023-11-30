import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { MovieCard } from '@/components/organisms';

import axiosClient from '@/api/axios.client';
import { RootState } from '@/store';
import { setMovies } from '@/store/app.reducer';

function Home() {
	const { movies } = useSelector((state: RootState) => state.app);
	const dispatch = useDispatch();

	useEffect(() => {
		(async () => {
			try {
				const { data } = await axiosClient.get(`${import.meta.env.VITE_TMDB_ACCOUNT}/watchlist/movies`);

				dispatch(setMovies(data.results));
			} catch (err) {
				console.log(err);
			}
		})();
	}, []);

	return (
		<>
			<main className="flex justify-center items-center">
				<div className="grid grid-cols-3 gap-x-10 gap-y-20 place-items-center">
					{movies.map((movies: IMovies, index: number) => (
						<MovieCard key={index} movie_id={movies.id} />
					))}
				</div>
			</main>
		</>
	);
}

export default Home;
