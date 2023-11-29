import { MovieCard } from '../components/organisms';

function Home() {
	return (
		<>
			<main className="flex justify-center items-center">
				<div className="grid grid-cols-3 gap-x-10 gap-y-20 place-items-center">
					{Array.from({ length: 9 }).map((_, index: number) => (
						<MovieCard key={index} movieId="" />
					))}
				</div>
			</main>
		</>
	);
}

export default Home;
