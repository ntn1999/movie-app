import axiosClient from '../api/axios.client';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setListMovies } from '../store/app.reducer';
import { MovieCard } from '../components/organisms';
import { RootState } from '../store';

function Home() {
	const { movies } = useSelector((state: RootState) => state.app);
	const dispatch = useDispatch();

	useEffect(() => {
		(async () => {
			try {
				const response = await axiosClient.get('/watchlist/movies');

				dispatch(setListMovies(response.data));
			} catch (err) {
				console.log(err);
			}
		})();
	}, []);

	return (
		<>
			<main className="flex justify-center items-center">
				<div className="grid grid-cols-3 gap-x-10 gap-y-20 place-items-center">
					{movies.map((movie: IMovie, index: number) => (
						<MovieCard key={index} movieId={movie.id} />
					))}
				</div>
			</main>
		</>
	);
}

export default Home;
