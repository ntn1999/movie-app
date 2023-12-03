import { memo } from 'react';

function Avatar({ image }: { image: string }) {
	return (
		<>
			<img className="w-30 h-30" src={image} alt="Rounded avatar"></img>
		</>
	);
}

export default memo(Avatar);
