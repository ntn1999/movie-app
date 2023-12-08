type Character = {
	name: string;
	character: string;
	profile_path: string;
};

function CharacterInfo(props: Character) {
	return (
		<>
			<img
				src={import.meta.env.VITE_PREFIX_IMAGE + props.profile_path}
				className="object-cover mb-4 w-20 h-20 rounded-full"
				alt={props.name}
			/>
			<div className="mb-2 text-xl font-medium leading-tight">{props.name}</div>
			<div className="text-neutral-500 dark:text-neutral-400">{props.character}</div>
		</>
	);
}

export default CharacterInfo;
