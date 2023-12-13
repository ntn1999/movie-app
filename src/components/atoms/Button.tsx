type TButton = {
	text: string;
	size?: 'sm' | 'md' | 'lg';
	color?: 'blue' | 'orange' | 'amber';
	width?: number;
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

function Button(props: TButton) {
	return (
		<button
			className={`group relative inline-flex items-center overflow-hidden rounded-md bg-blue-500 px-[${
				props.width ?? '2.5'
			}rem] py-3 text-white active:bg-indigo-500 z-0 transition hover:bg-blue-700`}
			onClick={props.onClick}
		>
			<span className={`text-${props.size ?? 'sm'} font-medium transition-all`}>{props.text}</span>
		</button>
	);
}

export default Button;
