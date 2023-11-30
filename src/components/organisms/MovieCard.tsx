import { memo } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '@/components/atoms';
import { StarRating } from '@/components/molecules';
import useMovieHook from '@/hooks/useMovieId.hook';

function MovieCard({ movie_id }: { movie_id: number }) {
	const { movie } = useMovieHook(movie_id);

	return (
		<div className="max-w-xs bg-white border border-gray-200 rounded-lg shadow">
			<img className="pb-5 rounded-t-lg" src={import.meta.env.VITE_PREFIX_IMAGE + movie.poster_path} alt={movie.original_title} />

			<div className="px-5 pb-5">
				<Link to={`/movie/${movie_id}`}>
					<h5 className="text-xl font-medium tracking-tight text-gray-900">{movie.original_title}</h5>
				</Link>

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

export default memo(MovieCard);
