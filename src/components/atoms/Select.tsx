import { memo } from 'react';

type TSelect = {
	label: string;
	width?: '28' | '32' | '40' | '52';
	options: {
		value: string;
		text: string;
	}[];
	changeHandler?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

function Select(props: TSelect) {
	return (
		<div className="px-6">
			<label htmlFor={`action-${props.label}`} className="block mb-2 text-sm font-medium">
				<div className="text-white">{props.label}:</div>
			</label>

			<select
				id={`action-${props.label}`}
				className={`h-10 w-${
					props.width ?? '52'
				} border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
			>
				<option defaultValue={'All'}>- All -</option>
				{props.options.map((option, index: number) => (
					<option key={index} value={option.value}>
						{option.text}
					</option>
				))}
			</select>
		</div>
	);
}

export default memo(Select);
