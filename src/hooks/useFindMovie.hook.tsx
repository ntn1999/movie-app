import { useSelector } from 'react-redux';

import { RootState } from '@/store';

/**
 * find 1 movie in list by Id
 */
function useFindMovieHook(movie_id: number | string | undefined): { movie: TMovie | TMovieGenres | undefined } {
	const { listMovies, listMovieByGenres } = useSelector((state: RootState) => state.movie);

	// convert to number
	const id: number | undefined = typeof movie_id === 'string' ? Number(movie_id) : movie_id;

	let movie = {} as TMovie | TMovieGenres | undefined;

	// find movie in store by id
	movie = listMovies.find((movie) => movie.id === id);

	if (!movie) {
		movie = listMovieByGenres.find((mov: TMovieGenres) => {
			mov.movies.find((item: TMovie) => item.id === movie_id);
		});
	}

	return { movie };
}

export default useFindMovieHook;
