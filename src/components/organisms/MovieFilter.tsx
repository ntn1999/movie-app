import { Select } from '@/components/atoms';

function MovieFilter() {
	return (
		<>
			<section className="flex justify-center p-6 mb-6">
				<Select label="Type" options={[{ value: 'action', text: 'Action' }]} />
				<Select label="Country" options={[{ value: 'action', text: 'Action' }]} />
				<Select label="Year" options={[{ value: 'action', text: 'Action' }]} />
				<Select label="Order by" options={[{ value: 'action', text: 'Action' }]} />
			</section>
		</>
	);
}

export default MovieFilter;
