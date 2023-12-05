import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';

import { Button } from '@/components/atoms';
import { StarRating } from '@/components/molecules';
import useFindMovieHook from '@/hooks/useFindMovie.hook';
import CatchError from '@/errors/catch.error';
import { EResults } from '@/enums';
import { setCarts } from '@/store/cart.reducer';
import { setMovieIsInCartById } from '@/store/movie.reducer';

function MovieCard({ movie_id }: { movie_id: number }) {
	const dispatch = useDispatch();
	const { movie } = useFindMovieHook(movie_id);

	const handleAddToCart = async () => {
		try {
			const response: AxiosResponse<TResponseDB<TCart>> = await axios.post(
				`${import.meta.env.VITE_LOCAL_DB}/movies`,
				{
					movie_id: movie_id,
				},
			);
			const { results, dataPart, errorInfo } = response.data;

			if (results === EResults.OK) dispatch(setCarts({ movie_id: dataPart.movie_id }));
			// set this movie is in cart
			else if (results === EResults.NG) dispatch(setMovieIsInCartById(movie_id));
			else window.alert(errorInfo?.errorMessage);
		} catch (err: unknown) {
			const { message } = new CatchError(err);
			window.alert(`API FAIL: ${message}`);
		}
	};

	return (
		<div className="max-w-xs bg-slate-600 rounded-lg shadow">
			<img
				className="pb-5 rounded-t-lg min-h-[32rem] min-w-[20rem]"
				src={import.meta.env.VITE_PREFIX_IMAGE + movie.poster_path}
				alt={movie.original_title}
			/>

			<div className="px-5 pb-5">
				<Link to={`/movie/${movie_id}`}>
					<h5 className="text-xl font-medium tracking-tight text-white min-h-[1rem] hover:underline">
						{movie.original_title}
					</h5>
				</Link>

				<div className="flex items-center mt-2.5 mb-5">
					<div className="flex items-center space-x-1">
						<StarRating vote={movie.vote_average} />
					</div>
				</div>
				<div className="flex items-center justify-between">
					<span className="text-2xl font-semibold text-white">${Math.floor(movie.popularity)}</span>
					<Button
						text={movie.isInCart ? 'In cart' : 'Add to cart'}
						width="32"
						clickHandler={handleAddToCart}
					/>
				</div>
			</div>
		</div>
	);
}

export default memo(MovieCard);
