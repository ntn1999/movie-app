import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@/store';
import { Button } from '@/components/atoms';
import { ProductCart } from '@/components/molecules';
import { SagaActions } from '@/enums/saga.enum';

function Cart() {
	const dispatch = useDispatch();
	const { listMovieInCart, removeMovieById } = useSelector((state: RootState) => state.cart);

	// get movie detail
	useEffect(() => {
		dispatch({ type: SagaActions.FETCH_LIST_MOVIE_IN_CART });
	}, [removeMovieById]);

	/**
	 * REMOVE MOVIE IN WATCH LIST BY MOVIE ID
	 * @param movie_id - id of movie for remove
	 */
	const handleRemoveMovie = (movie_id: number): void => {
		dispatch({ type: SagaActions.REMOVE_MOVIE_BY_ID, payload: movie_id });
	};

	const handleCheckout = (): void => {
		if (!listMovieInCart.length) window.alert('Nothing in your cart');
		else {
			const allowCheckout = window.confirm('Are you sure want to checkout?');
			if (!allowCheckout) return;

			// remove all movies by each movie
			listMovieInCart.forEach((movieCart: TMovie) => {
				dispatch({ type: SagaActions.REMOVE_MOVIE_BY_ID, payload: movieCart.id });
			});
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
									{/* <button
										className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
									>
										Checkout
									</button> */}
									<Button text="Checkout" onClick={handleCheckout} />
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
