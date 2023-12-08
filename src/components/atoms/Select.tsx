import { memo } from 'react';

type TSelect = {
	label: string;
	width?: '28' | '32' | '40' | '52';
	defaultValue?: string;
	options: {
		value: string | number;
		text: string;
	}[];
	onChange?: (e: string) => void;
};

function Select(props: TSelect) {
	return (
		<div className="px-6">
			<label htmlFor={`action-${props.label}`} className="block mb-2 text-sm font-medium">
				<div className="text-white">{props.label}</div>
			</label>

			<select
				id={`action-${props.label}`}
				className={`h-10 w-${
					props.width ?? '52'
				} border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
				onChange={(e: React.ChangeEvent<HTMLSelectElement>) => props.onChange && props.onChange(e.target.value)}
			>
				{/* {(props.default ?? true) && <option defaultValue={'All'}>- All -</option>} */}
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
