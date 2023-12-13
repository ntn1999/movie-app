type TButton = {
	text: string;
	size?: 'sm' | 'md' | 'lg';
	fullWidth?: boolean;
	color?: 'blue' | 'orange' | 'amber';
	width?: number;
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

function Button(props: TButton) {
	return (
		<button
			className={`group relative inline-flex items-center justify-center rounded-md bg-blue-500 ${
				props.fullWidth ? 'w-full' : ''
			} px-6 py-3 text-white active:bg-indigo-500 z-0 transition hover:bg-blue-700`}
			onClick={props.onClick}
		>
			<span className={`text-${props.size ?? 'sm'} font-medium transition-all`}>{props.text}</span>
		</button>
	);
}

export default Button;
