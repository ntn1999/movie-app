import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { MovieCard } from '@/components/molecules';
import { RootState } from '@/store';
import { scrollToTop } from '@/utils';

type TGenres = {
	genres_name: string;
};

function Genres() {
	const { genres_name } = useParams<TGenres>();
	const { listMovieByGenres } = useSelector((state: RootState) => state.movie);
	const listMovies = listMovieByGenres.find((movie: TMovieGenres) => movie.genre === genres_name);

	useEffect(() => scrollToTop(), []);

	return (
		<div className="flex justify-center items-center mb-10">
			<div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-x-10 gap-y-10 mt-10 place-items-center">
				<h2 className="col-span-full text-3xl">{genres_name}</h2>
				{listMovies?.movies.map((movie: TMovie, index: number) => (
					<MovieCard key={index} movie={movie} />
				))}
			</div>
		</div>
	);
}

export default Genres;
