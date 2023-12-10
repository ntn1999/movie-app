import { memo } from 'react';

type TAvatar = {
	image: string;
	alt?: string;
};

function Avatar(props: TAvatar) {
	return (
		<>
			<img className="object-cover mb-4 w-20 h-20 rounded-full" src={props.image} alt={props.alt}></img>
		</>
	);
}

export default memo(Avatar);
