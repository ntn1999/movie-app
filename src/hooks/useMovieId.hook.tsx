import { useSelector } from 'react-redux';

import { RootState } from '@/store';

/**
 * find 1 movie in list by Id
 */
function useMovieHook(movie_id: number | string | undefined): { movie: IMovies } {
	const movies = useSelector((state: RootState) => state.app.movies);

	// convert to number
	const id: number | undefined = typeof movie_id === 'string' ? Number(movie_id) : movie_id;

	// find movie in store by id
	const movie: IMovies = movies.find((mov: IMovies) => mov.id === id)!;

	return { movie };
}

export default useMovieHook;
