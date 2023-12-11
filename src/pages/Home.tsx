import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '@/store';
import { MovieGenres } from '@/components/organisms';
import { SagaActions } from '@/enums/saga.enum';

function Home() {
	const dispatch = useDispatch();
	const { listMovieByGenres } = useSelector((state: RootState) => state.movie);

	// default input
	useEffect(() => {
		dispatch({ type: SagaActions.GET_LIST_MOVIES });
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
