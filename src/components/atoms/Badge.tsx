type TBadge = {
	name: string;
	color?: 'amber';
	width?: 4;
	height?: 2;
};

function Badge(props: TBadge) {
	return (
		<span
			className={`bg-${props.color ?? 'orange'}-800 px-${props.width ?? '2.5'} py-${props.height ?? '1'}
      text-white text-xs font-medium me-2  rounded`}
		>
			{props.name}
		</span>
	);
}

export default Badge;
