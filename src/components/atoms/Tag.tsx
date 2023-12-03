type TTag = {
	name: string;
};

function Tag(props: TTag) {
	return (
		<>
			<span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600">
				{props.name}
			</span>
		</>
	);
}

export default Tag;
