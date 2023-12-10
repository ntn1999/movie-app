import { Avatar } from '@/components/atoms';

type TCharacter = {
	name: string;
	character: string;
	profile_path: string;
};

function CharacterInfo(props: TCharacter) {
	return (
		<>
			<Avatar image={import.meta.env.VITE_PREFIX_IMAGE + props.profile_path} alt={props.name} />
			<div className="mb-2 text-xl font-medium leading-tight">{props.name}</div>
			<div className="text-neutral-500 dark:text-neutral-400">{props.character}</div>
		</>
	);
}

export default CharacterInfo;
