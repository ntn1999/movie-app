import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { AxiosResponse } from 'axios';

import { Button } from '@/components/atoms';
import { StarRating } from '@/components/molecules';
import useFindMovieHook from '@/hooks/useFindMovie.hook';
import CatchError from '@/errors/catch.error';
import { EStatusWatchlist } from '@/enums';
import { setMovieIsInCartById } from '@/store/reducers/movie.reducer';
import axiosClient from '@/api/axios.client';

type TMovieCard = {
	movie: TMovie;
};

function MovieCard(props: TMovieCard) {
	const dispatch = useDispatch();
	// const { movie } = useFindMovieHook(movie_id);

	const handleAddToCart = async () => {
		try {
			const response: AxiosResponse<TResponseWatchlist> = await axiosClient.post(
				`${import.meta.env.VITE_TMDB_ACCOUNT}/watchlist`,
				{
					media_type: 'movie',
					media_id: props.movie.id,
					watchlist: true, // FOR ADD
				},
			);
			const { status_code, status_message } = response.data;

			if (status_code === EStatusWatchlist.ADDED || status_code === EStatusWatchlist.UPDATED) {
				dispatch(setMovieIsInCartById(props.movie.id));
			}
		} catch (err: unknown) {
			const { message } = new CatchError(err);
			window.alert(`API FAIL: ${message}`);
		}
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
					className="text-xl font-medium tracking-tight text-white min-h-[1rem] hover:underline"
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
