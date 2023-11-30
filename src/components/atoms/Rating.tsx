import { memo } from 'react';

function Rating({ rating }: { rating: number }) {
	return (
		<>
			<p className="ms-1 text-sm font-medium text-gray-500">{(rating / 2).toFixed(2)} out of 5</p>
		</>
	);
}

export default memo(Rating);
