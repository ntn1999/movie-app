import { Rating, Star } from '@/components/atoms';

function StarRating({ vote }: { vote: number }) {
	return (
		<>
			<Star star={vote} />
			<Rating rating={vote} />
		</>
	);
}

export default StarRating;
