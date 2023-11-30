import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { RootState } from '@/store';
import { Button } from '@/components/atoms';
import { StarRating } from '@/components/molecules';

function MovieCard({ movieId }: { movieId: number }) {
	const { movies } = useSelector((state: RootState) => state.app);
	const movie: IMovie = movies.find((item) => item.id === movieId)!;
	const navigate = useNavigate();

	return (
		<div className="max-w-xs bg-white border border-gray-200 rounded-lg shadow">
			<img
				className="pb-5 rounded-t-lg"
				src={'https://www.themoviedb.org/t/p/w600_and_h900_bestv2' + movie.poster_path}
				alt={movie.original_title}
			/>

			<div className="px-5 pb-5">
				<h5 className="text-xl font-medium tracking-tight text-gray-900">{movie.original_title}</h5>

				<div className="flex items-center mt-2.5 mb-5">
					<div className="flex items-center space-x-1">
						<StarRating vote={movie.vote_average} />
					</div>
				</div>
				<div className="flex items-center justify-between">
					<span className="text-2xl font-semibold text-gray-900">${movie.vote_count / 10}</span>
					<Button text="Add to cart" />
				</div>
			</div>
		</div>
	);
}

export default MovieCard;
