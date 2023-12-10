type TButton = {
	text: string;
	size?: 'sm' | 'md' | 'lg';
	color?: 'blue' | 'orange' | 'amber';
	width?: 32 | 80;
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

function Button(props: TButton) {
	return (
		<button
			className="group relative inline-flex items-center overflow-hidden rounded-md bg-blue-500 hover:bg-blue-400 px-6 py-3 text-white focus:outline-none focus:ring active:bg-indigo-500 z-0"
			onClick={props.onClick}
		>
			<span className={`text-${props.size ?? 'sm'} font-medium transition-all`}>{props.text}</span>
		</button>
	);
}

export default Button;
