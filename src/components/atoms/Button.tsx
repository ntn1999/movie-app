type TButton = {
	text: string;
	size?: 'sm' | 'md' | 'lg';
	color?: 'blue' | 'orange' | 'amber';
	width?: '1' | '3' | '5' | '8' | '10' | '24' | '26' | '32' | '64' | '80';
	height?: '1.5' | '2.5' | '3.5';
	clickHandler?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

function Button(props: TButton) {
	return (
		<button
			className={`text-white bg-${props.color ?? 'blue'}-500 hover:bg-${props.color ?? 'blue'}-600 focus:ring-2 focus:outline-none focus:ring-${
				props.color ?? 'blue'
			}-300 font-medium rounded-lg text-${props.size ?? 'sm'} w-${props.width ?? '40'} py-${props.height ?? '2.5'} text-center`}
			onClick={props.clickHandler}
		>
			{props.text}
		</button>
	);
}

export default Button;
