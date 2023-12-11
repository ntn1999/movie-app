import { MovieCard } from '@/components/molecules';
import { Link } from 'react-router-dom';

type TMovieGenres = {
	genre: string;
	movies: TListMovies;
	maxDisplay: number;
};

function MovieGenres(props: TMovieGenres) {
	return (
		<>
			<section className="flex justify-center items-center mb-5">
				<div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-x-10 gap-y-5 mt-10 place-items-center">
					<div className="col-span-full w-full">
						<div className="flex justify-between items-end">
							<span className="text-2xl text-orange-300">{props.genre}</span>
							<Link to={'/'}>Xem tất cả</Link>
						</div>
						<hr className="mb-5 mt-2 h-0.5 border-t-0 bg-neutral-100 opacity-100" />
					</div>
					{props.movies
						.map((movie: TMovie, index: number) => <MovieCard key={index} movie={movie} />)
						.slice(0, 4)}
				</div>
			</section>
		</>
	);
}

export default MovieGenres;
