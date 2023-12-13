import { memo } from 'react';

type TAvatar = {
	image: string;
	alt?: string;
};

function Avatar(props: TAvatar) {
	return (
		<img
			className="object-cover mb-4 w-20 h-20 rounded-full"
			src={props.image}
			alt={props.alt}
			onError={({ currentTarget }) => {
				currentTarget.onerror = null; // prevents looping
				// default image
				currentTarget.src = 'https://cdn-icons-png.flaticon.com/512/149/149071.png';
			}}
		></img>
	);
}

export default memo(Avatar);
