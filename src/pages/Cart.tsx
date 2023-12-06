import { useEffect, useState } from 'react';
import { ProductCart } from '@/components/organisms';
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

	return (
		<section className="bg-white">
			<div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
				<div className="mx-auto max-w-3xl">
					<header className="text-center">
						<h1 className="text-xl font-bold text-gray-900 sm:text-3xl">Your Cart</h1>
					</header>

					<div className="mt-8">
						<ul className="space-y-4">
							{listMovieInCart.map((movieCart: TMovie, index: number) => (
								<ProductCart
									key={index}
									name={movieCart.original_title}
									image={movieCart.backdrop_path}
									price={Math.floor(movieCart.popularity)}
									clickHandler={() => handleRemoveMovie(movieCart.id)}
								/>
							))}
						</ul>

						<div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
							<div className="w-screen max-w-lg space-y-4">
								<dl className="space-y-0.5 text-sm text-gray-700">
									<div className="flex justify-between">
										<dt>Subtotal</dt>
										<dd>£250</dd>
									</div>

									<div className="flex justify-between">
										<dt>VAT</dt>
										<dd>£25</dd>
									</div>

									<div className="flex justify-between">
										<dt>Discount</dt>
										<dd>-£20</dd>
									</div>

									<div className="flex justify-between !text-base font-medium">
										<dt>Total</dt>
										<dd>£200</dd>
									</div>
								</dl>

								<div className="flex justify-end">
									<span className="inline-flex items-center justify-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-indigo-700">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth="1.5"
											stroke="currentColor"
											className="-ms-1 me-1.5 h-4 w-4"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
											/>
										</svg>

										<p className="whitespace-nowrap text-xs">2 Discounts Applied</p>
									</span>
								</div>

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
