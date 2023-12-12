type TBadge = {
	text: string;
};

function Badge(props: TBadge) {
	return (
		<>
			<span className={`bg-orange-800 px-2.5 py-1 text-white text-xs font-medium me-2  rounded`}>
				{props.text}
			</span>
		</>
	);
}

export default Badge;
