import { Avatar } from '@/components/atoms';

type TCharacter = {
	name: string;
	character: string;
	profile_path: string;
};

function CharacterInfo(props: TCharacter) {
	return (
		<>
			<div className="w-40 p-2">
				<Avatar image={import.meta.env.VITE_PREFIX_IMAGE + props.profile_path} alt={props.name} />
				<div className="mb-2 text-base leading-tight">{props.name}</div>
				<div className="text-neutral-500">{props.character}</div>
			</div>
		</>
	);
}

export default CharacterInfo;
