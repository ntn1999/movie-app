import { Rating, Star } from '@/components/atoms';
import { memo } from 'react';

function StarRating({ vote }: { vote: number }) {
	return (
		<>
			<Star star={vote} />
			<Rating rating={vote} />
		</>
	);
}

export default memo(StarRating);
