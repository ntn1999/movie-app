import { useEffect, useState } from 'react';
import { ProductCart } from '@/components/molecules';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setListMovieInCart } from '@/store/cart.reducer';
import CatchError from '@/errors/catch.error';
import { AxiosResponse } from 'axios';
import axiosClient from '@/api/axios.client';
import { EStatusWatchlist } from '@/enums';

function Cart() {
	const [removeMovieById, setRemoveMovieById] = useState<number>();
	const dispatch = useDispatch();
	const { listMovieInCart } = useSelector((state: RootState) => state.cart);

	// get movie detail
	useEffect(() => {
		(async () => {
			try {
				const response: AxiosResponse<TResponseListMovies> = await axiosClient.get(
					`${import.meta.env.VITE_TMDB_ACCOUNT}/watchlist/movies`,
				);
				const { results } = response.data;

				if (results) dispatch(setListMovieInCart(results));
				else throw Error('Get movie detail fail...');
			} catch (err) {
				const { message } = new CatchError(err);
				console.log(message);
			}
		})();
	}, [removeMovieById]);

	/**
	 * REMOVE MOVIE IN WATCH LIST BY MOVIE ID
	 * @param movie_id - id of movie for remove
	 */
	const handleRemoveMovie = async (movie_id: number) => {
		try {
			const response: AxiosResponse<TReponseWatchlist> = await axiosClient.post(
				`${import.meta.env.VITE_TMDB_ACCOUNT}/watchlist`,
				{
					media_type: 'movie',
					media_id: movie_id,
					watchlist: false, // FOR REMOVE
				},
			);

			// update local state to re-render list movie
			setRemoveMovieById(movie_id);

			const { status_code, status_message } = response.data;

			if (status_code === EStatusWatchlist.ADDED) return status_message;
			else if (status_code === EStatusWatchlist.REMOVED) return status_message;
			else throw Error('Watchlist fail...');
		} catch (err) {
			const { message } = new CatchError(err);
			window.alert(message);
		}
	};

	const subTotal = (): number => {
		const calculate = listMovieInCart.reduce((acc, movie) => {
			return acc + Math.floor(movie.popularity);
		}, 0);

		return calculate;
	};

	return (
		<section className="text-white">
			<div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
				<div className="mx-auto max-w-3xl">
					<header className="text-center">
						<h1 className="text-xl font-bold sm:text-3xl">Your Cart</h1>
					</header>

					<div className="mt-8">
						<ul className="space-y-4">
							{listMovieInCart.map((movieCart: TMovie, index: number) => (
								<ProductCart
									key={index}
									id={movieCart.id}
									name={movieCart.original_title}
									image={movieCart.backdrop_path}
									price={Math.floor(movieCart.popularity)}
									onClick={() => handleRemoveMovie(movieCart.id)}
								/>
							))}
						</ul>

						<div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
							<div className="w-screen max-w-lg space-y-4">
								<dl className="space-y-0.5 text-sm text-white">
									<div className="flex justify-between">
										<dt>Subtotal</dt>
										<dd>${subTotal()}</dd>
									</div>

									<div className="flex justify-between">
										<dt>VAT</dt>
										<dd>$0</dd>
									</div>

									<div className="flex justify-between">
										<dt>Discount</dt>
										<dd>$0</dd>
									</div>

									<div className="flex justify-between !text-base font-medium">
										<dt>Total</dt>
										<dd>${subTotal()}</dd>
									</div>
								</dl>

								<div className="flex justify-end">
									<a
										href="#"
										className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
									>
										Checkout
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Cart;
