type TButton = {
	text: string;
	size?: 'small' | 'medium' | 'large';
	color?: 'blue' | 'orange' | 'amber';
	width?: 32 | 80;
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

function Button(props: TButton) {
	return (
		<button
			className={`w-${
				props.width ?? '32'
			} h-10 text-center bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm`}
			onClick={props.onClick}
		>
			{props.text}
		</button>
	);
}

export default Button;
