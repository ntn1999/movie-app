import { useSelector } from 'react-redux';

import { RootState } from '@/store';

/**
 * find 1 movie in list by Id
 */
function useFindMovieHook(movie_id: number | string | undefined): { movie: TMovie } {
	const listMovies: TListMovies = useSelector((state: RootState) => state.movie.listMovies);

	// convert to number
	const id: number | undefined = typeof movie_id === 'string' ? Number(movie_id) : movie_id;

	// find movie in store by id
	const movie: TMovie = listMovies.find((movie) => movie.id === id)!;

	return { movie };
}

export default useFindMovieHook;
