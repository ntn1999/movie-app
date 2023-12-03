type TInput = {
	value: string;
	width?: '10' | '20' | '30';
	placeHolder?: string;
	type?: 'text' | 'number' | 'email';
	changeHandler: (e: string) => any;
};

function Input(props: TInput) {
	return (
		<input
			id="default-search"
			type={props.type ?? 'text'}
			value={props.value}
			placeholder={props.placeHolder}
			autoComplete="off"
			className={`block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500`}
			onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.changeHandler(e.target.value)}
		/>
	);
}

export default Input;
