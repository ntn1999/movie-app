import { useSelector } from 'react-redux';
import { RootState } from '../store';

function Movie() {
	const { movies } = useSelector((state: RootState) => state.app);

	return (
		<>
			<h1>Movie detail</h1>
		</>
	);
}

export default Movie;
