import { useNavigate } from 'react-router-dom';

import { Button } from '../atoms';
import { StarRating } from '../molecules';

function MovieCard({ movieId }: { movieId: string }) {
	const navigate = useNavigate();

	return (
		<div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
			<img className="p-8 rounded-t-lg" src="https://flowbite.com/docs/images/products/apple-watch.png" alt="product image" />

			<div className="px-5 pb-5">
				<h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
					Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport
				</h5>

				<div className="flex items-center mt-2.5 mb-5">
					<div className="flex items-center space-x-1 rtl:space-x-reverse">
						<StarRating vote={4} />
					</div>
				</div>
				<div className="flex items-center justify-between">
					<span className="text-3xl font-bold text-gray-900 dark:text-white">$599</span>
					<Button text="Add to cart" />
				</div>
			</div>
		</div>
	);
}

export default MovieCard;
