import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { Button } from '@/components/atoms';
import { StarRating } from '@/components/molecules';
import { SagaActions } from '@/enums/saga.enum';

type TMovieCard = {
	movie: TMovie;
};

function MovieCard(props: TMovieCard) {
	const dispatch = useDispatch();

	const handleAddToCart = async () => {
		dispatch({ type: SagaActions.ADD_MOVIE_BY_ID, payload: props.movie.id });
	};

	return (
		<div className="max-w-xs bg-slate-600 rounded-lg shadow">
			<img
				className="pb-5 rounded-t-lg min-h-[32rem] min-w-[20rem]"
				src={import.meta.env.VITE_PREFIX_IMAGE + props.movie.poster_path}
				alt={props.movie.original_title}
			/>

			<div className="px-5 pb-5">
				<Link
					to={`/movie/${props.movie.id}`}
					className="text-lg font-medium tracking-tight text-white min-h-[1rem] hover:underline"
				>
					{props.movie.original_title}
				</Link>

				<div className="flex items-center mt-2.5 mb-5">
					<div className="flex items-center space-x-1">
						<StarRating vote={props.movie.vote_average} />
					</div>
				</div>
				<div className="flex items-center justify-between">
					<span className="text-2xl font-semibold text-white">${Math.floor(props.movie.popularity)}</span>
					<Button text={props.movie.isInCart ? 'In cart' : 'Add to cart'} onClick={handleAddToCart} />
				</div>
			</div>
		</div>
	);
}

export default memo(MovieCard);
